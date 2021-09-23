import React from 'react'
import AbstractShape from './abstract-shape';
import { registerCustomElement } from '../../utils/dom';

export class CanvasRectangle extends AbstractShape {
  static get observedAttributes() {
    return [
      ...AbstractShape.observedAttributes,
      'width',
      'height',
    ];
  }

  get width() {
    return this.getNumericAttribute('width');
  }

  set width(value) {
    this.setAttribute('width', value);
  }

  get height() {
    return this.getNumericAttribute('height');
  }

  set height(value) {
    this.setAttribute('height', value);
  }

  getBoundingBox(offset) {
    const left = this.x + offset.x - this.width * this.originX;
    const top = this.y + offset.y - this.height * this.originY;
    const right = left + this.width;
    const bottom = top + this.height;

    return { left, right, top, bottom }
  }

  trace(ctx, offset) {
    const { left, top } = this.getBoundingBox(offset);
    ctx.beginPath();
    ctx.rect(
      left + this.borderWidth / 2,
      top + this.borderWidth / 2,
      this.width - this.borderWidth,
      this.height - this.borderWidth
    );
    return true
  }

  draw(ctx, offset) {
    this.pipeline.push(this.rotateAndScale)
    this.pipeline.push(this.trace)
    this.pipeline.push(this.fillAndStroke)
    this.drawPipeline(ctx, offset)
  }
}

registerCustomElement('canvas-rectangle', CanvasRectangle);

export default function Rectangle({ children, ...props }) {
  return (
    <canvas-rectangle {...props}>{children}</canvas-rectangle>
  );
}