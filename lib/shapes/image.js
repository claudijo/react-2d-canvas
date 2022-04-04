import { CanvasRectangle } from './rectangle';
import { registerCustomElement } from '../../utils/dom';
import React from 'react';
import { traceRectangle } from '../tasks/rectangle';
import { drawImage, loadSrc } from '../tasks/image';
import { fillAndStroke, rotateAndScale, shade } from '../tasks/common';

export class CanvasImage extends CanvasRectangle {
  static get observedAttributes() {
    return [
      ...CanvasRectangle.observedAttributes,
      'src',
    ];
  }

  constructor() {
    super();
  }

  get src() {
    return this.getAttribute('src')
  }

  set src(value) {
    this.setAttribute('src', value)
  }

  draw(ctx, offset) {
    this.pipeline.push(loadSrc(this))
    this.pipeline.push(rotateAndScale(this))
    this.pipeline.push(traceRectangle(this))
    this.pipeline.push(shade(this))
    this.pipeline.push(fillAndStroke(this))
    this.pipeline.push(drawImage(this))

    this.drawPipeline(ctx, offset)
  }
}

registerCustomElement('canvas-image', CanvasImage);

export default React.forwardRef(({ children, ...props }, ref) => {
  return (
    <canvas-image
      {...props}
      ref={ref}
    >
      {children}
    </canvas-image>
  );
});