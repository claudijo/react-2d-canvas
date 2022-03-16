import React from 'react';
import { registerCustomElement } from '../../utils/dom';
import { fillAndStroke, rotateAndScale, shade } from '../tasks/common';
import { CanvasCircle } from './circle';
import { tracePolygon } from '../tasks/polygon';

export class CanvasPolygon extends CanvasCircle {
  static get observedAttributes() {
    return [
      ...CanvasCircle.observedAttributes,
      'sides',
    ];
  }

  get sides() {
    return this.getNumericAttribute('sides');
  }

  set sides(value) {
    this.setAttribute('sides', value);
  }

  drawHitArea(ctx, offset, color) {
    const { backgroundColor, borderColor, borderWidth} = this;
    this.pipeline.push(rotateAndScale(this));
    this.pipeline.push(tracePolygon(this));
    this.pipeline.push(fillAndStroke({
      backgroundColor: backgroundColor ? color : undefined,
      borderColor: borderColor ? color : undefined,
      borderWidth,
    }));
    this.drawPipeline(ctx, offset);
  }

  draw(ctx, offset) {
    this.pipeline.push(rotateAndScale(this));
    this.pipeline.push(tracePolygon(this));
    this.pipeline.push(shade(this))
    this.pipeline.push(fillAndStroke(this));
    this.drawPipeline(ctx, offset);
  }
}

registerCustomElement('canvas-polygon', CanvasPolygon);

export default React.forwardRef(({ children, ...props }, ref) => {
  return (
    <canvas-polygon
      {...props}
      ref={ref}
    >
      {children}
    </canvas-polygon>
  );
});
