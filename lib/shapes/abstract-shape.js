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
      'borderdash',
      'zindex'
    ];
  }

  constructor() {
    super();
    this.offset = { x: 0, y: 0, rotation: 0, opacity: 1 };
    this.pipeline = [];
    this.canvasElement = null;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (this.canvasElement) {
      const customEvent = new CustomEvent('attributeChange', {
        bubbles: true,
        detail: { name, oldValue, newValue },
      });
      this.canvasElement.dispatchEvent(customEvent);
    }
  }

  connectedCallback() {
    this.canvasElement = this.closest('canvas');

    if (this.canvasElement) {
      const customEvent = new CustomEvent('connect', {
        bubbles: true,
      });
      this.canvasElement.dispatchEvent(customEvent);
    }
  }

  disconnectedCallback() {
    if (this.canvasElement) {
      const customEvent = new CustomEvent('disconnect', {
        bubbles: true,
      });

      this.canvasElement.dispatchEvent(customEvent);
      this.canvasElement = null;
    }
  }

  getTextualAttribute(attributeName, defaultValue = '') {
    return this.getAttribute(attributeName) ?? defaultValue;
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

  get borderDash() {
    return this.getAttribute('borderDash')?.split(',').map(item => Number(item)) ?? []
  }

  set borderDash(value) {
    this.setAttribute('borderDash', value);
  }

  get zIndex() {
    return this.getNumericAttribute('zIndex');
  }

  set zIndex(value) {
    this.setAttribute('zIndex', value);
  }

  getBoundingBox() {
    throw new Error('Method must be implemented in sub class')
  }

  getTranslationCenter(offset) {
    throw new Error('Method must be implemented in sub class')
  }

  drawHitArea(ctx, offset, color) {
    throw new Error('Method must be implemented in sub class')
  }

  draw(ctx, offset) {
    throw new Error('Method must be implemented in sub class')
  }

  drawPipeline(ctx, offset) {
    ctx.save();
    while (this.pipeline.shift()?.call(this, ctx, offset)) {
    }
    this.pipeline = [];
    ctx.restore();
  }
}