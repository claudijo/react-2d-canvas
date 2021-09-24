import { measureText } from '../../utils/canvas';
import { cropEnd } from '../../utils/string';

export const fillAndStrokeText = text => (ctx, offset) => {
  const textMetrics = measureText(text.fontVariant, text.fontSize, text.fontFamily, text.baseline, text.align, text.textContent);
  let width = Math.abs(textMetrics.actualBoundingBoxLeft) +
    Math.abs(textMetrics.actualBoundingBoxRight);

  let textContent = text.textContent;
  while (textContent !== '' && width > text.maxWidth) {
    textContent = cropEnd(textContent)
    const textMetrics = measureText(text.fontVariant, text.fontSize, text.fontFamily, text.baseline, text.align, textContent);
    width = Math.abs(textMetrics.actualBoundingBoxLeft) +
      Math.abs(textMetrics.actualBoundingBoxRight);
  }

  ctx.font = `${text.fontVariant} ${text.fontSize}px ${text.fontFamily}`;
  ctx.textBaseline = text.baseline;
  ctx.textAlign = text.align;

  const x = text.x + offset.x;
  const y = text.y + offset.y;

  if (text.color) {
    ctx.fillStyle = text.color;
    ctx.fillText(textContent, x, y)
  }

  if (text.borderColor && text.borderWidth) {
    ctx.strokeStyle = text.borderColor;
    ctx.lineWidth = text.borderWidth;
    ctx.strokeText(textContent, x, y);
  }
}