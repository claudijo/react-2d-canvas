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