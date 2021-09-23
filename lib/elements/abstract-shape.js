export default class AbstractShape extends HTMLElement {
  static get observedAttributes() {
    return [
      'x',
      'y',
      'backgroundcolor',
      'bordercolor',
      'borderwidth',
      'opacity',
      'originx',
      'originy',
      'rotation',
      'scalex',
      'scaley',
      'shadowcolor',
      'shadowblur',
      'shadowoffsetx',
      'shadowoffsety',
      'linedash',
    ];
  }

  constructor() {
    super();
    this.offset = { x: 0, y: 0, rotation: 0, opacity: 1 };
    this.pipeline = [];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    const customEvent = new CustomEvent('attributeChange', {
      bubbles: true,
      detail: { name, oldValue, newValue },
    });
    this.dispatchEvent(customEvent);
  }

  connectedCallback() {
    const customEvent = new CustomEvent('connect', {
      bubbles: true,
    });
    this.dispatchEvent(customEvent);
  }

  getNumericAttribute(attributeName, defaultValue = 0) {
    return Number(this.getAttribute(attributeName) ?? defaultValue);
  }

  getBooleanAttribute(attributeName) {
    return this.hasAttribute(attributeName);
  }

  setBooleanAttribute(attributeName, value) {
    if (value) {
      this.setAttribute(attributeName, '');
    } else {
      this.removeAttribute(attributeName);
    }
  }

  get x() {
    return this.getNumericAttribute('x');
  }

  set x(value) {
    this.setAttribute('x', value);
  }

  get y() {
    return this.getNumericAttribute('y');
  }

  set y(value) {
    this.setAttribute('y', value);
  }

  get backgroundColor() {
    return this.getAttribute('backgroundColor');
  }

  set backgroundColor(value) {
    this.setAttribute('backgroundColor', value);
  }

  get borderColor() {
    return this.getAttribute('borderColor');
  }

  set borderColor(value) {
    this.setAttribute('borderColor', value);
  }

  get borderWidth() {
    return this.getNumericAttribute('borderWidth', 1);
  }

  set borderWidth(value) {
    this.setAttribute('borderWidth', value);
  }

  get opacity() {
    return this.getNumericAttribute('opacity', 1);
  }

  set opacity(value) {
    this.setAttribute('opacity', value);
  }

  get originX() {
    return this.getNumericAttribute('originX', 0.5);
  }

  set originX(value) {
    this.setAttribute('originX', value);
  }

  get originY() {
    return this.getNumericAttribute('originY', 0.5);
  }

  set originY(value) {
    this.setAttribute('originY', value);
  }

  get rotation() {
    return this.getNumericAttribute('rotation');
  }

  set rotation(value) {
    this.setAttribute('rotation', value);
  }

  get scaleX() {
    return this.getNumericAttribute('scaleX', 1);
  }

  set scaleX(value) {
    this.setAttribute('scaleX', value);
  }

  get scaleY() {
    return this.getNumericAttribute('scaleY', 1);
  }

  set scaleY(value) {
    this.setAttribute('scaleY', value);
  }

  get shadowColor() {
    return this.getAttribute('shadowColor');
  }

  set shadowColor(value) {
    this.setAttribute('shadowColor', value);
  }

  get shadowBlur() {
    return this.getNumericAttribute('shadowBlur');
  }

  set shadowBlur(value) {
    this.setAttribute('shadowBlur', value);
  }

  get shadowOffsetX() {
    return this.getNumericAttribute('shadowOffsetX');
  }

  set shadowOffsetX(value) {
    this.setAttribute('shadowOffsetX', value);
  }

  get shadowOffsetY() {
    return this.getNumericAttribute('shadowOffsetY');
  }

  set shadowOffsetY(value) {
    this.setAttribute('shadowOffsetY', value);
  }

  get lineDash() {
    return this.getAttribute('lineDash')?.split(',').map(item => Number(item)) ?? []
  }

  set lineDash(value) {
    this.setAttribute('lineDash', value);
  }

  rotateAndScale(ctx, offset) {
    const scaleX = this.scaleX * offset.scaleX;
    const scaleY = this.scaleY * offset.scaleY;
    const rotation = this.rotation + offset.rotation;

    if (scaleX !== 1 || scaleY !== 1 || rotation !== 0) {
      const { top, left } = this.getBoundingBox();

      const translateX = left + this.width * this.originX + offset.x;
      const translateY = top + this.height * this.originY + offset.y;

      ctx.translate(translateX, translateY);
      ctx.scale(scaleX, scaleY);
      ctx.rotate(rotation);
      ctx.translate(-translateX, -translateY);
    }

    return true;
  }

  fillAndStroke(ctx, offset) {
    const globalAlpha = this.opacity * offset.opacity;
    if (globalAlpha !== 1) {
      ctx.globalAlpha = globalAlpha;
    }

    if (this.shadowColor) {
      ctx.shadowColor = this.shadowColor
    }

    if (this.shadowBlur !== 0) {
      ctx.shadowBlur = this.shadowBlur
    }

    if (this.shadowOffsetX !== 0) {
      ctx.shadowOffsetX = this.shadowOffsetX
    }

    if (this.shadowOffsetY !== 0) {
      ctx.shadowOffsetY = this.shadowOffsetY;
    }

    if (this.backgroundColor) {
      ctx.fillStyle = this.backgroundColor;
      ctx.fill();
    }

    if (this.lineDash.length) {
      ctx.setLineDash(this.lineDash)
    }

    if (this.borderColor && this.borderWidth) {
      ctx.strokeStyle = this.borderColor;
      ctx.lineWidth = this.borderWidth;
      ctx.stroke();
    }

    return true;
  }


  drawPipeline(ctx, offset) {
    ctx.save();
    while (this.pipeline.shift()?.call(this, ctx, offset)) {
    }
    this.pipeline = [];
    ctx.restore();
  }
}