import React from 'react';
import AbstractShape from './abstract-shape';
import { registerCustomElement } from '../../utils/dom';
import { traceRectangle } from '../tasks/rectangle';
import { fillAndStroke, rotateAndScale, shade } from '../tasks/common';

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

    return { left, right, top, bottom };
  }

  getTranslationCenter(offset) {
    const { top, left } = this.getBoundingBox(offset);
    const x = left + this.width * this.originX;
    const y = top + this.height * this.originY;

    return { x, y };
  }

  draw(ctx, offset) {
    this.pipeline.push(rotateAndScale(this));
    this.pipeline.push(traceRectangle(this));
    this.pipeline.push(shade(this))
    this.pipeline.push(fillAndStroke(this));
    this.drawPipeline(ctx, offset);
  }
}

registerCustomElement('canvas-rectangle', CanvasRectangle);

export default function Rectangle({ children, ...props }) {
  return (
    <canvas-rectangle {...props}>{children}</canvas-rectangle>
  );
}