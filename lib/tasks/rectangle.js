export const traceRectangle = rectangle => (ctx, offset) => {
  const { left, top, right, bottom } = rectangle.getBoundingBox(offset);
  ctx.beginPath();
  ctx.rect(
    left + rectangle.borderWidth / 2,
    top + rectangle.borderWidth / 2,
    right - left - rectangle.borderWidth,
    bottom - top - rectangle.borderWidth,
  );
  return true;
}

export const traceRoundedRectangle = roundedRectangle => (ctx, offset) => {
  const { left, top, right, bottom } = roundedRectangle.getBoundingBox(offset);

  const { radius } = roundedRectangle;
  const x = left + roundedRectangle.borderWidth / 2;
  const y = top + roundedRectangle.borderWidth / 2;
  const width = right - left - roundedRectangle.borderWidth;
  const height = bottom - top - roundedRectangle.borderWidth;

  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + width, y, x + width, y + height, radius);
  ctx.arcTo(x + width, y + height, x, y + height, radius);
  ctx.arcTo(x, y + height, x, y, radius);
  ctx.arcTo(x, y, x + width, y, radius);
  ctx.closePath();

  return true;
}