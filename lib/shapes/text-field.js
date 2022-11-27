import AbstractShape from './abstract-shape';
import { measureText } from '../../utils/canvas';
import { registerCustomElement } from '../../utils/dom';
import React from 'react';
import { fillAndStroke, rotateAndScale, shade } from '../tasks/common';
import { fillAndStrokeMultilineText, fillAndStrokeText, traceTextBox } from '../tasks/text';
import { breakLines } from '../../utils/string';

export class CanvasTextField extends AbstractShape {
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
      'textcontent',
      'lineheight',
      'width',
      'height',
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

  get width() {
    return this.getNumericAttribute('width', 200);
  }

  set width(value) {
    this.setAttribute('width', value);
  }

  get height() {
    const { height } = this.breakAndMeasure();
    return height;
  }

  get lineHeight() {
    return this.getNumericAttribute('lineHeight', 1.2);
  }

  set lineHeight(value) {
    this.setAttribute('lineHeight', value);
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

  breakAndMeasure() {
    const { textContent } = this;
    const lines = breakLines(textContent, line => {
      let textMetrics = this.getTextMetrics(line);
      let width = textMetrics.actualBoundingBoxLeft +
        textMetrics.actualBoundingBoxRight;
      return width > this.width;
    });

    const measurements = lines.reduce((acc, line, index) => {
      let {
        actualBoundingBoxLeft,
        actualBoundingBoxRight,
        actualBoundingBoxAscent,
        actualBoundingBoxDescent,
      } = this.getTextMetrics(line);

      const width = actualBoundingBoxLeft + actualBoundingBoxRight;

      if (index === 0) {
        acc.actualBoundingBoxAscent = actualBoundingBoxAscent;
      }

      if (index === lines.length - 1) {
        acc.actualBoundingBoxDescent = actualBoundingBoxDescent;
      }

      acc.height += this.fontSize * this.lineHeight;
      acc.width = Math.max(acc.width, width);
      acc.actualBoundingBoxLeft = Math.max(acc.actualBoundingBoxLeft, actualBoundingBoxLeft);
      acc.actualBoundingBoxRight = Math.min(acc.actualBoundingBoxRight, actualBoundingBoxRight);
      return acc;
    }, {
      width: 0,
      height: 0,
      actualBoundingBoxAscent: -Infinity,
      actualBoundingBoxDescent: Infinity,
      actualBoundingBoxLeft: -Infinity,
      actualBoundingBoxRight: Infinity,
    });

    return { textContent, lines, ...measurements };
  }

  getBoundingBox(offset) {
    const {
      width,
      height,
      actualBoundingBoxLeft,
      actualBoundingBoxAscent
    } = this.breakAndMeasure(this.textContent);

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
    this.pipeline.push(fillAndStrokeMultilineText(this));
    this.drawPipeline(ctx, offset);
  }
}

registerCustomElement('canvas-text-field', CanvasTextField);

export default React.forwardRef(({ children, ...props }, ref) => {
  return (
    <canvas-text-field
      {...props}
      ref={ref}
    >
      {children}
    </canvas-text-field>
  );
});