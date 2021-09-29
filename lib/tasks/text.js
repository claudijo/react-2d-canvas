export const fillAndStrokeText = text => (ctx, offset) => {
  ctx.font = `${text.fontStyle} ${text.fontWeight} ${text.fontSize}px ${text.fontFamily}`;
  ctx.textBaseline = text.baseline;
  ctx.textAlign = text.align;

  const { textContent } = text.cropAndMeasure()
  const x = text.x + offset.x;
  const y = text.y + offset.y;

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

export const traceTextBox = text => (ctx, offset) => {
  const { left, top, right, bottom } = text.getBoundingBox(offset);
  ctx.beginPath();
  ctx.rect(
    left - text.borderWidth / 2,
    top - text.borderWidth / 2,
    right - left,
    bottom - top,
  );
  return true;
}

