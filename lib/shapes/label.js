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
      'fontsize',
      'fontFamily',
      'fontVariant',
      'baseline',
      'align',
      'maxwidth'
    ];
  }

  get fontSize() {
    return this.getNumericAttribute('fontSize', 10);
  }

  set fontSize(value) {
    this.setAttribute('fontSize', value);
  }

  get fontFamily() {
    return this.getTextualAttribute('fontFamily', 'sans-serif');
  }

  set fontFamily(value) {
    this.setAttribute('fontFamily', value);
  }

  get fontVariant() {
    return this.getTextualAttribute('fontVariant', 'normal');
  }

  set fontVariant(value) {
    this.setAttribute('fontVariant', value);
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