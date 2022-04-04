const imageCache = {};

export const drawBackgroundImage = shape => (ctx, offset) => {
  if (!shape.image) {
    return true;
  }

  const { left, right, top, bottom } = shape.getBoundingBox(offset);
  const width = right - left;
  const height = bottom - top;

  ctx.drawImage(
    shape.image,
    left,
    top,
    width,
    height,
  );
  return true;
};

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
};

export const clipBackgroundImage = shape => (ctx, offset) => {
  if (!shape.image) {
    return true;
  }

  ctx.clip();
  return true;
}

const loadImage = (shape, ctx, src) => {
  if (!src) {
    return true;
  }

  shape.image = imageCache[src];

  if (!shape.image) {
    shape.image = new Image();
    shape.image.onload = () => {
      const customEvent = new CustomEvent('load', {
        bubbles: true,
      });
      shape.dispatchEvent(customEvent);
    };

    shape.image.src = src;
    imageCache[src] = shape.image;
  }

  return shape.image.complete;
}

export const loadSrc = shape => (ctx, offset) => {
  const { src } = shape;
  return loadImage(shape, ctx, src);
};

export const loadBackgroundImage = shape => (ctx, offset) => {
  const { backgroundImage } = shape;
  return loadImage(shape, ctx, backgroundImage);
}
