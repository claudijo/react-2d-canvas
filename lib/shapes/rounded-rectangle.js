import { CanvasRectangle } from './rectangle';
import AbstractShape from './abstract-shape';
import { fillAndStroke, rotateAndScale, shade } from '../tasks/common';
import { traceRoundedRectangle } from '../tasks/rectangle';
import { registerCustomElement } from '../../utils/dom';
import React from 'react';
import { clipBackgroundImage, drawBackgroundImage, loadBackgroundImage } from '../tasks/image';

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
    const { backgroundColor, backgroundImage, borderColor, borderWidth} = this;
    this.pipeline.push(rotateAndScale(this));
    this.pipeline.push(traceRoundedRectangle(this));
    this.pipeline.push(fillAndStroke({
      backgroundColor: backgroundColor || backgroundImage ? color : undefined,
      borderColor: borderColor ? color : undefined,
      borderWidth,
    }));
    this.drawPipeline(ctx, offset);
  }

  draw(ctx, offset) {
    this.pipeline.push(loadBackgroundImage(this));
    this.pipeline.push(rotateAndScale(this));
    this.pipeline.push(traceRoundedRectangle(this));
    this.pipeline.push(shade(this))
    this.pipeline.push(fillAndStroke(this));
    this.pipeline.push(clipBackgroundImage(this));
    this.pipeline.push(drawBackgroundImage(this));

    this.drawPipeline(ctx, offset);
  }
}

registerCustomElement('canvas-rounded-rectangle', CanvasRoundedRectangle);

export default React.forwardRef(({ children, ...props }, ref) => {
  return (
    <canvas-rounded-rectangle
      {...props}
      ref={ref}
    >
      {children}
    </canvas-rounded-rectangle>
  );
});