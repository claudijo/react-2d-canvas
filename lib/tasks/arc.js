export const traceArc = arc => (ctx, offset) => {
  const { left, top } = arc.getBoundingBox(offset);
  ctx.beginPath();
  ctx.arc(
    left + arc.radius,
    top + arc.radius,
    arc.radius - arc.borderWidth / 2,
    arc.startAngle ?? 0,
    arc.endAngle ?? 2 * Math.PI,
    arc.anticlockwise ?? false
  );
  return true;
}