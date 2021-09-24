import { CanvasRectangle } from './rectangle';
import { registerCustomElement } from '../../utils/dom';
import React from 'react';
import { Lru } from '../../utils/cahce';
import { traceRectangle } from '../tasks/rectangle'
import { drawImage, loadImage } from '../tasks/image';
import {  fillAndStroke, rotateAndScale } from '../tasks/common'

export class CanvasImage extends CanvasRectangle {
  static get observedAttributes() {
    return [
      ...CanvasRectangle.observedAttributes,
      'src',
    ];
  }

  constructor() {
    super();

    this.imageCache = new Lru()
  }

  get src() {
    return this.getAttribute('src')
  }

  set src(value) {
    this.setAttribute('src', value)
  }

  draw(ctx, offset) {
    this.pipeline.push(loadImage(this))
    this.pipeline.push(rotateAndScale(this))
    this.pipeline.push(traceRectangle(this))
    this.pipeline.push(fillAndStroke(this))
    this.pipeline.push(drawImage(this))

    this.drawPipeline(ctx, offset)
  }
}

registerCustomElement('canvas-image', CanvasImage);

export default function Image({ children, ...props }) {
  return (
    <canvas-image {...props}>{children}</canvas-image>
  );
}