import AbstractShape from './abstract-shape';
import { rotateAndScale, shade } from '../tasks/common';
import { fillAndStrokeText } from '../tasks/text';
import { registerCustomElement } from '../../utils/dom';
import React from 'react';

export class CanvasLabel extends AbstractShape {
  static get observedAttributes() {
    return [
      ...AbstractShape.observedAttributes,
      'color',
      'size',
      'family',
      'style',
      'weight',
      'baseline',
      'align',
      'maxwidth'
    ];
  }

  get size() {
    return this.getNumericAttribute('size', 10);
  }

  set size(value) {
    this.setAttribute('size', value);
  }

  get family() {
    return this.getTextualAttribute('family', 'sans-serif');
  }

  set family(value) {
    this.setAttribute('family', value);
  }

  get style() {
    return this.getTextualAttribute('style', '');
  }

  set style(value) {
    this.setAttribute('style', value);
  }

  get weight() {
    return this.getTextualAttribute('weight', '');
  }

  set weight(value) {
    this.setAttribute('weight', value);
  }

  get color() {
    return this.getAttribute('color');
  }

  set color(value) {
    this.setAttribute('color', value);
  }

  get baseline() {
    return this.getTextualAttribute('baseline', 'alphabetic');
  }

  set baseline(value) {
    this.setAttribute('baseline', value);
  }

  get align() {
    return this.getTextualAttribute('align', 'start');
  }

  set align(value) {
    this.setAttribute('align', value);
  }

  get maxWidth() {
    return this.getNumericAttribute('maxWidth', Infinity)
  }

  set maxWidth(value) {
    this.setAttribute('maxWidth', value)
  }

  // getBoundingBox(offset) {
  //   const textMetrics = measureText(this.fontVariant, this.fontSize, this.fontFamily, this.baseline, this.align, this.textContent);
  //
  //   const left = this.x + offset.x - textMetrics.actualBoundingBoxLeft;
  //   const right = this.x + offset.x + textMetrics.actualBoundingBoxRight;
  //   const top = this.y + offset.y - textMetrics.actualBoundingBoxAscent;
  //   const bottom = this.y + offset.y + textMetrics.actualBoundingBoxDescent;
  //
  //   return { left, right, top, bottom };
  // }

  getTranslationCenter(offset) {
    const x = this.x + offset.x;
    const y = this.y + offset.y;

    return { x, y };
  }

  draw(ctx, offset) {
    this.pipeline.push(rotateAndScale(this));
    this.pipeline.push(shade(this));
    this.pipeline.push(fillAndStrokeText(this));
    this.drawPipeline(ctx, offset);
  }
}

registerCustomElement('canvas-label', CanvasLabel);

export default function Label({ children, ...props }) {
  return (
    <canvas-label {...props}>{children}</canvas-label>
  );
}