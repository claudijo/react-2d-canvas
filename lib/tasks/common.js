
export const rotateAndScale = shape => (ctx, offset) => {
  const scaleX = shape.scaleX * offset.scaleX;
  const scaleY = shape.scaleY * offset.scaleY;
  const rotation = shape.rotation + offset.rotation;

  if (scaleX !== 1 || scaleY !== 1 || rotation !== 0) {
    const translate = shape.getTranslationCenter(offset);

    ctx.translate(translate.x, translate.y);
    ctx.rotate(rotation);
    ctx.scale(scaleX, scaleY);
    ctx.translate(-translate.x, -translate.y);
  }

  return true;
}

export const shade = shape => (ctx, offset) => {
  const globalAlpha = shape.opacity * offset.opacity;
  if (globalAlpha !== 1) {
    ctx.globalAlpha = globalAlpha;
  }

  if (shape.shadowColor) {
    ctx.shadowColor = shape.shadowColor
  }

  if (shape.shadowBlur !== 0) {
    ctx.shadowBlur = shape.shadowBlur
  }

  if (shape.shadowOffsetX !== 0) {
    ctx.shadowOffsetX = shape.shadowOffsetX
  }

  if (shape.shadowOffsetY !== 0) {
    ctx.shadowOffsetY = shape.shadowOffsetY;
  }

  return true;
}

export const fillAndStroke = shape => (ctx, offset) => {
  if (shape.backgroundColor) {
    ctx.fillStyle = shape.backgroundColor;
    ctx.fill();
  }

  if (shape.borderDash?.length) {
    ctx.setLineDash(shape.borderDash)
  }

  if (shape.borderColor && shape.borderWidth) {
    ctx.strokeStyle = shape.borderColor;
    ctx.lineWidth = shape.borderWidth;
    ctx.stroke();
  }

  return true;
}