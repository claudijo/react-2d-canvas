import AbstractShape from './abstract-shape';
import { fillAndStroke, rotateAndScale, shade } from '../tasks/common';
import { fillAndStrokeText, traceTextBox } from '../tasks/text';
import { registerCustomElement } from '../../utils/dom';
import React from 'react';
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
      'textcontent',
    ];
  }

  get textContent() {
    return this.getTextualAttribute('textContent', '');
  }

  set textContent(value) {
    this.setAttribute('textContent', value);
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
    return this.getTextualAttribute('fontStyle', 'normal');
  }

  set fontStyle(value) {
    this.setAttribute('fontStyle', value);
  }

  get fontWeight() {
    return this.getTextualAttribute('fontWeight', 'normal');
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
    return this.getNumericAttribute('maxWidth', Infinity);
  }

  set maxWidth(value) {
    this.setAttribute('maxWidth', value);
  }

  get width() {
    const { width } = this.cropAndMeasure();
    return width;
  }

  get height() {
    const { height } = this.cropAndMeasure();
    return height;
  }

  getTextMetrics(text) {
    return measureText(
      text,
      this.fontStyle,
      this.fontWeight,
      this.fontSize,
      this.fontFamily,
      this.baseline,
      this.align,
    );
  }

  cropAndMeasure() {
    let { textContent } = this;
    let {
      actualBoundingBoxLeft,
      actualBoundingBoxRight,
      actualBoundingBoxAscent,
      actualBoundingBoxDescent,
    } = this.getTextMetrics(textContent);

    let width = actualBoundingBoxLeft + actualBoundingBoxRight;
    const height = actualBoundingBoxAscent + actualBoundingBoxDescent;

    while (textContent !== '' && width > this.maxWidth) {
      textContent = cropEnd(textContent);
      ({ actualBoundingBoxLeft, actualBoundingBoxRight } = this.getTextMetrics(textContent));
      width = actualBoundingBoxLeft + actualBoundingBoxRight;
    }

    return {
      textContent,
      height,
      width,
      actualBoundingBoxLeft,
      actualBoundingBoxRight,
      actualBoundingBoxAscent,
      actualBoundingBoxDescent,
    };
  }

  getBoundingBox(offset) {
    const {
      width,
      height,
      actualBoundingBoxLeft,
      actualBoundingBoxAscent
    } = this.cropAndMeasure();

    const left = this.x + offset.x - actualBoundingBoxLeft;
    const right = left + width;
    const top = this.y + offset.y - actualBoundingBoxAscent;
    const bottom = top + height;

    return { left, right, top, bottom };
  }

  getTranslationCenter(offset) {
    const x = this.x + offset.x;
    const y = this.y + offset.y;

    return { x, y };
  }

  drawHitArea(ctx, offset, color) {
    const { backgroundColor, borderColor, borderWidth } = this;
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

export default React.forwardRef(({ children, ...props }, ref) => {
  return (
    <canvas-label
      {...props}
      ref={ref}
    >
      {children}
    </canvas-label>
  );
});