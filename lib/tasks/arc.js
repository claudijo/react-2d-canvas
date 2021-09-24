export const traceArc = arc => (ctx, offset) => {
  const { left, top } = arc.getBoundingBox(offset);
  ctx.beginPath();
  ctx.arc(
    left + arc.radius,
    top + arc.radius,
    arc.radius - arc.borderWidth / 2,
    (arc.startAngle ?? 0) - Math.PI / 2,
    (arc.endAngle ?? Math.PI * 2) - Math.PI / 2,
    arc.anticlockwise ?? false
  );
  return true;
}