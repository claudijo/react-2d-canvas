import AbstractShape from './abstract-shape';
import { registerCustomElement } from '../../utils/dom';
import React from 'react';
import { CanvasRectangle } from './rectangle';

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

  trace(ctx, offset) {
    console.log(this.getBoundingBox(offset));
    const { left, top } = this.getBoundingBox(offset);
    ctx.beginPath();
    ctx.arc(
      left + this.radius,
      top + this.radius,
      this.radius - this.borderWidth / 2,
      0,
      2 * Math.PI,
    );
    return true;
  }

  draw(ctx, offset) {
    this.pipeline.push(this.rotateAndScale);
    this.pipeline.push(this.trace);
    this.pipeline.push(this.fillAndStroke);
    this.drawPipeline(ctx, offset);
  }
}

registerCustomElement('canvas-circle', CanvasCircle);

export default function Circle({ children, ...props }) {
  return (
    <canvas-circle {...props}>{children}</canvas-circle>
  );
}