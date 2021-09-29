export const fillAndStrokeText = text => (ctx, offset) => {
  ctx.font = `${text.style} ${text.weight} ${text.size}px ${text.family}`;
  ctx.textBaseline = text.baseline;
  ctx.textAlign = text.align;

  const { textContent, height, width } = text.cropAndMeasure()
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

export const traceTextBox = text => (ctx, offset) => {
  const { left, top } = text.getBoundingBox(offset);
  const { height, width } = text.cropAndMeasure()

  ctx.beginPath();
  ctx.rect(
    left - text.borderWidth,
    top - text.borderWidth,
    width + text.borderWidth,
    height + text.borderWidth,
  );
  return true;
}