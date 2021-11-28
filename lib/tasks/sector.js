export const traceSector = sector => (ctx, offset) => {
  const { left, top } = sector.getBoundingBox(offset);
  ctx.beginPath();
  ctx.moveTo(left + sector.radius, top + sector.radius);
  ctx.arc(
    left + sector.radius,
    top + sector.radius,
    sector.radius - sector.borderWidth / 2,
    (sector.startAngle ?? 0) - Math.PI / 2,
    (sector.endAngle ?? Math.PI * 2) - Math.PI / 2,
    sector.counterclockwise ?? false
  );
  ctx.closePath();
  return true;
}
