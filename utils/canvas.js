import { memoize } from './memoize';
import { Lru } from './cahce';

export const measureText = memoize((fontVariant, fontSize, fontFamily, baseline, align, text) => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  ctx.font = `${fontVariant} ${fontSize}px ${fontFamily}`;
  ctx.textBaseline = baseline
  ctx.textAlign = align;
  return ctx.measureText(text);
}, new Lru(50))