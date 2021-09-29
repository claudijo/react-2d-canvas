import AbstractShape from './abstract-shape';
import { fillAndStroke, rotateAndScale, shade } from '../tasks/common';
import { fillAndStrokeText, traceTextBox } from '../tasks/text';
import { registerCustomElement } from '../../utils/dom';
import React from 'react';
import { traceRectangle } from '../tasks/rectangle';
import { measureText } from '../../utils/canvas';
import { cropEnd } from '../../utils/string';

export class CanvasLabel extends AbstractShape {
  static get observedAttributes() {
    return [
      ...AbstractShape.observedAttributes,
      'color',
      'fontsize',
      'fontfamily',
      'fontstyle',
      'fontweight',
      'baseline',
      'align',
      'maxwidth',
      'backgroundcolor',
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

  get fontStyle() {
    return this.getTextualAttribute('fontStyle', '');
  }

  set fontStyle(value) {
    this.setAttribute('fontStyle', value);
  }

  get fontWeight() {
    return this.getTextualAttribute('fontWeight', '');
  }

  set fontWeight(value) {
    this.setAttribute('fontWeight', value);
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

  get backgroundColor() {
    return this.getAttribute('backgroundColor');
  }

  set backgroundColor(value) {
    this.setAttribute('backgroundColor', value)
  }

  getTextMetrics(text) {
    return measureText(
      this.fontStyle,
      this.fontWeight,
      this.fontSize,
      this.fontFamily,
      this.baseline,
      this.align,
      text
    );
  }

  cropAndMeasure() {
    let textContent = this.textContent;
    let textMetrics = this.getTextMetrics(textContent)
    let width = textMetrics.actualBoundingBoxLeft +
      textMetrics.actualBoundingBoxRight;

    while (textContent !== '' && width > this.maxWidth) {
      textContent = cropEnd(textContent);
      textMetrics = this.getTextMetrics(textContent)
      width = textMetrics.actualBoundingBoxLeft +
        textMetrics.actualBoundingBoxRight;
    }

    const height = textMetrics.actualBoundingBoxAscent
      + textMetrics.actualBoundingBoxDescent;

    return { textContent, height, width, textMetrics }
  }

  getBoundingBox(offset) {
    const { textMetrics, width, height } = this.cropAndMeasure();

    const left = this.x + offset.x - textMetrics.actualBoundingBoxLeft;
    const right = left + width;
    const top = this.y + offset.y - textMetrics.actualBoundingBoxAscent;
    const bottom = top + height;

    return { left, right, top, bottom };
  }

  getTranslationCenter(offset) {
    const x = this.x + offset.x;
    const y = this.y + offset.y;

    return { x, y };
  }

  drawHitArea(ctx, offset, color) {
    const { backgroundColor, borderColor, borderWidth} = this;
    this.pipeline.push(rotateAndScale(this));
    this.pipeline.push(traceTextBox(this));
    this.pipeline.push(fillAndStroke({
      backgroundColor: backgroundColor ? color : undefined,
      borderColor: borderColor ? color : undefined,
      borderWidth,
    }));
    this.drawPipeline(ctx, offset);
  }

  draw(ctx, offset) {
    this.pipeline.push(rotateAndScale(this));
    this.pipeline.push(shade(this));

    this.pipeline.push(traceTextBox(this));
    this.pipeline.push(fillAndStroke({
      backgroundColor: this.backgroundColor,
      borderColor: this.backgroundColor,
      borderWidth: this.borderWidth,
    }));

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