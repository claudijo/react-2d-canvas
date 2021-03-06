import AbstractShape from './abstract-shape';
import { registerCustomElement } from '../../utils/dom';
import React from 'react';
import { traceArc } from '../tasks/arc';
import { fillAndStroke, rotateAndScale, shade } from '../tasks/common';
import { clipBackgroundImage, drawBackgroundImage, loadBackgroundImage } from '../tasks/image';

export class CanvasCircle extends AbstractShape {
  static get observedAttributes() {
    return [
      ...AbstractShape.observedAttributes,
      'radius',
    ];
  }

  get radius() {
    return this.getNumericAttribute('radius');
  }

  set radius(value) {
    this.setAttribute('radius', value);
  }

  getBoundingBox(offset) {
    const left = this.x + offset.x - this.radius * 2 * this.originX;
    const top = this.y + offset.y - this.radius * 2 * this.originY;
    const right = left + this.radius * 2;
    const bottom = top + this.radius * 2;

    return { left, right, top, bottom };
  }

  getTranslationCenter(offset) {
    const { top, left } = this.getBoundingBox(offset);
    const x = left + this.radius * this.originX * 2;
    const y = top + this.radius * this.originY * 2;

    return { x, y };
  }

  drawHitArea(ctx, offset, color) {
    const { backgroundColor, backgroundImage, borderColor, borderWidth} = this;
    this.pipeline.push(rotateAndScale(this));
    this.pipeline.push(traceArc(this));
    this.pipeline.push(fillAndStroke({
      backgroundColor: backgroundColor || backgroundImage ? color : undefined,
      borderColor: borderColor ? color : undefined,
      borderWidth,
    }));
    this.drawPipeline(ctx, offset);
  }

  draw(ctx, offset) {
    this.pipeline.push(loadBackgroundImage(this));
    this.pipeline.push(rotateAndScale(this));
    this.pipeline.push(traceArc(this));
    this.pipeline.push(shade(this))
    this.pipeline.push(fillAndStroke(this));
    this.pipeline.push(clipBackgroundImage(this));
    this.pipeline.push(drawBackgroundImage(this));

    this.drawPipeline(ctx, offset);
  }
}

registerCustomElement('canvas-circle', CanvasCircle);

export default React.forwardRef(({ children, ...props }, ref) => {
  return (
    <canvas-circle
      {...props}
      ref={ref}
    >
      {children}
    </canvas-circle>
  );
});