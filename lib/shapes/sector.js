import React from 'react';
import { CanvasArc } from './arc';
import { registerCustomElement } from '../../utils/dom';
import { fillAndStroke, rotateAndScale, shade } from '../tasks/common';
import { traceSector } from '../tasks/sector';

export class CanvasSector extends CanvasArc {
  drawHitArea(ctx, offset, color) {
    const { backgroundColor, borderColor, borderWidth} = this;
    this.pipeline.push(rotateAndScale(this));
    this.pipeline.push(traceSector(this));
    this.pipeline.push(fillAndStroke({
      backgroundColor: backgroundColor ? color : undefined,
      borderColor: borderColor ? color : undefined,
      borderWidth,
    }));
    this.drawPipeline(ctx, offset);
  }

  draw(ctx, offset) {
    this.pipeline.push(rotateAndScale(this));
    this.pipeline.push(traceSector(this));
    this.pipeline.push(shade(this))
    this.pipeline.push(fillAndStroke(this));
    this.drawPipeline(ctx, offset);
  }
}

registerCustomElement('canvas-sector', CanvasSector);

export default React.forwardRef(({ children, ...props }, ref) => {
  return (
    <canvas-sector
      {...props}
      ref={ref}
    >
      {children}
    </canvas-sector>
  );
});