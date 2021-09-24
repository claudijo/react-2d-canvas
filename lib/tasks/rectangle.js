export const traceRectangle = rectangle => (ctx, offset) => {
  const { left, top } = rectangle.getBoundingBox(offset);
  ctx.beginPath();
  ctx.rect(
    left + rectangle.borderWidth / 2,
    top + rectangle.borderWidth / 2,
    rectangle.width - rectangle.borderWidth,
    rectangle.height - rectangle.borderWidth,
  );
  return true;
}