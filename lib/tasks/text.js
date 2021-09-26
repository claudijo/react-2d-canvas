import { measureText } from '../../utils/canvas';
import { cropEnd } from '../../utils/string';

export const fillAndStrokeText = text => (ctx, offset) => {
  let textMetrics = measureText(text.style, text.weight, text.size, text.family, text.baseline, text.align, text.textContent);
  let width = Math.abs(textMetrics.actualBoundingBoxLeft) +
    Math.abs(textMetrics.actualBoundingBoxRight);
  const height = textMetrics.actualBoundingBoxAscent
    + textMetrics.actualBoundingBoxDescent;

  let textContent = text.textContent;
  while (textContent !== '' && width > text.maxWidth) {
    textContent = cropEnd(textContent);
    textMetrics = measureText(text.style, text.weight, text.size, text.family, text.baseline, text.align, textContent);
    width = Math.abs(textMetrics.actualBoundingBoxLeft) +
      Math.abs(textMetrics.actualBoundingBoxRight);
  }

  ctx.font = `${text.style} ${text.weight} ${text.size}px ${text.family}`;
  ctx.textBaseline = text.baseline;
  ctx.textAlign = text.align;

  const x = text.x + offset.x - width * text.originX;
  const y = text.y + offset.y - height * text.originY;

  if (text.color) {
    ctx.fillStyle = text.color;
    ctx.fillText(textContent, x - text.borderWidth / 2, y - text.borderWidth / 2);
  }

  if (text.borderColor && text.borderWidth) {
    ctx.strokeStyle = text.borderColor;
    ctx.lineWidth = text.borderWidth;
    ctx.strokeText(textContent, x - text.borderWidth / 2, y - text.borderWidth / 2);
  }
};