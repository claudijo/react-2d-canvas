import { CanvasRectangle } from './rectangle';
import AbstractShape from './abstract-shape';
import { fillAndStroke, rotateAndScale, shade } from '../tasks/common';
import { traceRoundedRectangle } from '../tasks/rectangle';
import { registerCustomElement } from '../../utils/dom';
import React from 'react';

export class CanvasRoundedRectangle extends CanvasRectangle {
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

  drawHitArea(ctx, offset, color) {
    const { backgroundColor, borderColor, borderWidth} = this;
    this.pipeline.push(rotateAndScale(this));
    this.pipeline.push(traceRoundedRectangle(this));
    this.pipeline.push(fillAndStroke({
      backgroundColor: backgroundColor ? color : undefined,
      borderColor: borderColor ? color : undefined,
      borderWidth,
    }));
    this.drawPipeline(ctx, offset);
  }

  draw(ctx, offset) {
    this.pipeline.push(rotateAndScale(this));
    this.pipeline.push(traceRoundedRectangle(this));
    this.pipeline.push(shade(this))
    this.pipeline.push(fillAndStroke(this));
    this.drawPipeline(ctx, offset);
  }
}

registerCustomElement('canvas-rounded-rectangle', CanvasRoundedRectangle);

export default function RoundedRectangle({ children, ...props }) {
  return (
    <canvas-rounded-rectangle {...props}>{children}</canvas-rounded-rectangle>
  );
}