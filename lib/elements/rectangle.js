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

  getBoundingBox() {
    const left = this.x - this.width * this.originX;
    const top = this.y - this.height * this.originY;

    return {
      left,
      right: left + this.width,
      top,
      bottom: top + this.height,
    }
  }

  trace(ctx, offset) {
    ctx.beginPath();
    const { left, top } = this.getBoundingBox();
    ctx.rect(left + offset.x, top + offset.y, this.width, this.height);
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