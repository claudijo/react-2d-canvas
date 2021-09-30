import { CanvasCircle } from './circle';
import AbstractShape from './abstract-shape';
import { registerCustomElement } from '../../utils/dom';
import React from 'react';

export class CanvasArc extends CanvasCircle {
  static get observedAttributes() {
    return [
      ...AbstractShape.observedAttributes,
      'radius',
      'startangle',
      'endangle',
      'counterclockwise'
    ];
  }

  get startAngle() {
    return this.getNumericAttribute('startAngle');
  }

  set startAngle(value) {
    this.setAttribute('startAngle', value);
  }

  get endAngle() {
    return this.getNumericAttribute('endAngle');
  }

  set endAngle(value) {
    this.setAttribute('endAngle', value);
  }

  get counterclockwise() {
    return this.getBooleanAttribute('counterclockwise')
  }

  set counterclockwise(value) {
    this.setBooleanAttribute('counterclockwise', value)
  }
}

registerCustomElement('canvas-arc', CanvasArc);

export default function Arc({ children, ...props }) {
  return (
    <canvas-arc {...props}>{children}</canvas-arc>
  );
}