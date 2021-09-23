import { CanvasRectangle } from './rectangle';
import { registerCustomElement } from '../../utils/dom';
import React from 'react';
import { Lru } from '../../utils/cahce';

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

  loadImage() {
    this.image = this.imageCache.read(this.src)
    if (!this.image) {
      this.image = new window.Image();
      this.image.onload = () => {
        const customEvent = new CustomEvent('load', {
          bubbles: true,
        });
        this.dispatchEvent(customEvent);
      }

      this.image.src = this.src
      this.imageCache.write(this.src, this.image)
    }

    return this.image.complete
  }

  drawImage(ctx, offset) {
    const { left, top } = this.getBoundingBox(offset);
    ctx.drawImage(
      this.image,
      left + this.borderWidth,
      top + this.borderWidth,
      this.width - this.borderWidth * 2,
      this.height - this.borderWidth * 2
    );
    return true
  }

  draw(ctx, offset) {
    this.pipeline.push(this.loadImage)
    this.pipeline.push(this.rotateAndScale)
    this.pipeline.push(this.trace)
    this.pipeline.push(this.fillAndStroke)
    this.pipeline.push(this.drawImage)

    this.drawPipeline(ctx, offset)
  }
}

registerCustomElement('canvas-image', CanvasImage);

export default function Image({ children, ...props }) {
  return (
    <canvas-image {...props}>{children}</canvas-image>
  );
}