export const tracePolygon = polygon => (ctx, offset) => {
  const { left, top } = polygon.getBoundingBox(offset);
  const x = left + polygon.radius;
  const y = top + polygon.radius;

  ctx.beginPath();
  ctx.moveTo(x + polygon.radius - polygon.borderWidth / 2, y);
  for (let side = 0; side < polygon.sides; side++) {
    ctx.lineTo(
      x + (polygon.radius - polygon.borderWidth / 2) * Math.cos(side * 2 * Math.PI / polygon.sides),
      y + (polygon.radius - polygon.borderWidth / 2) * Math.sin(side * 2 * Math.PI / polygon.sides)
    );
  }
  ctx.closePath();

  return true;
}