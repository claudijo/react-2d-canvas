export const fillAndStrokeText = text => (ctx, offset) => {
  ctx.font = `${text.fontStyle} ${text.fontWeight} ${text.fontSize}px ${text.fontFamily}`;
  ctx.textBaseline = text.baseline;
  ctx.textAlign = text.align;

  const { textContent } = text.cropAndMeasure();
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

export const fillAndStrokeMultilineText = text => (ctx, offset) => {
  ctx.font = `${text.fontStyle} ${text.fontWeight} ${text.fontSize}px ${text.fontFamily}`;
  ctx.textBaseline = text.baseline;
  ctx.textAlign = text.align;

  const { lines } = text.breakAndMeasure(text.textContent)
  let x = text.x + offset.x;
  let y = text.y + offset.y;

  let {color, borderColor, borderWidth } = text;

  if (color) {
    ctx.fillStyle = color;
  }

  if (borderColor && borderWidth) {
    ctx.strokeStyle = borderColor;
    ctx.lineWidth = borderWidth;
  }

  for (const line of lines) {
    if (color) {
      ctx.fillText(line, x - borderWidth / 2, y - borderWidth / 2);
    }

    if (borderColor && borderWidth) {
      ctx.strokeText(line, x - borderWidth / 2, y - borderWidth / 2);
    }

    y += text.fontSize * text.lineHeight;
  }
}

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

