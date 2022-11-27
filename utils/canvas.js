import { memoize } from './memoize';
import { Lru } from './cache';

const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');

export const measureText = memoize((text, style, weight, size, family, baseline = 'alphabetic', align = 'start') => {
  ctx.font = `${style} ${weight} ${size}px ${family}`;
  ctx.textBaseline = baseline
  ctx.textAlign = align;
  return ctx.measureText(text);
}, new Lru(50))