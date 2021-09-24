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

export const drawImage = image => (ctx, offset) => {
  const { left, top } = image.getBoundingBox(offset);
  ctx.drawImage(
    image.image,
    left + image.borderWidth,
    top + image.borderWidth,
    image.width - image.borderWidth * 2,
    image.height - image.borderWidth * 2
  );
  return true
}

export const loadImage = image => (ctx, offset) => {
  image.image = image.imageCache.read(image.src)
  if (!image.image) {
    image.image = new window.Image();
    image.image.onload = () => {
      const customEvent = new CustomEvent('load', {
        bubbles: true,
      });
      image.dispatchEvent(customEvent);
    }

    image.image.src = image.src
    image.imageCache.write(image.src, image.image)
  }

  return image.image.complete
}

export const rotateAndScale = shape => (ctx, offset) => {
  const scaleX = shape.scaleX * offset.scaleX;
  const scaleY = shape.scaleY * offset.scaleY;
  const rotation = shape.rotation + offset.rotation;

  if (scaleX !== 1 || scaleY !== 1 || rotation !== 0) {
    const translate = shape.getTranslationCenter(offset);

    ctx.translate(translate.x, translate.y);
    ctx.scale(scaleX, scaleY);
    ctx.rotate(rotation);
    ctx.translate(-translate.x, -translate.y);
  }

  return true;
}

export const fillAndStroke = shape => (ctx, offset) => {
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

  if (shape.backgroundColor) {
    ctx.fillStyle = shape.backgroundColor;
    ctx.fill();
  }

  if (shape.borderDash.length) {
    ctx.setLineDash(shape.borderDash)
  }

  if (shape.borderColor && shape.borderWidth) {
    ctx.strokeStyle = shape.borderColor;
    ctx.lineWidth = shape.borderWidth;
    ctx.stroke();
  }

  return true;
}