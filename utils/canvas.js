import { memoize } from './memoize';
import { Lru } from './cache';

export const measureText = memoize((style, weight, size, family, baseline, align, text) => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  ctx.font = `${style} ${weight} ${size}px ${family}`;
  ctx.textBaseline = baseline
  ctx.textAlign = align;
  return ctx.measureText(text);
}, new Lru(50))