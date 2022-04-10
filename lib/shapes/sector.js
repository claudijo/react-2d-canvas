import React from 'react';
import { CanvasArc } from './arc';
import { registerCustomElement } from '../../utils/dom';
import { fillAndStroke, rotateAndScale, shade } from '../tasks/common';
import { traceSector } from '../tasks/sector';
import { clipBackgroundImage, drawBackgroundImage, loadBackgroundImage } from '../tasks/image';

export class CanvasSector extends CanvasArc {
  drawHitArea(ctx, offset, color) {
    const { backgroundColor, backgroundImage, borderColor, borderWidth} = this;
    this.pipeline.push(rotateAndScale(this));
    this.pipeline.push(traceSector(this));
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
    this.pipeline.push(traceSector(this));
    this.pipeline.push(shade(this))
    this.pipeline.push(fillAndStroke(this));
    this.pipeline.push(clipBackgroundImage(this));
    this.pipeline.push(drawBackgroundImage(this));
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