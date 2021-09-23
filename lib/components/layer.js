import React, { useCallback, useContext, useEffect, useRef } from 'react';
import { StageContext } from '../contexts/stage';
import { throttle } from '../../utils/rate-limit';

export default function Layer({ children }) {
  const canvasElement = useRef(null);

  const { scale, width, height } = useContext(StageContext);

  const drawChildren = useCallback((ctx, children, offset = { x: 0, y: 0, opacity: 1, rotation: 0, scaleX: 1, scaleY: 1 }) => {
    Array.from(children).forEach(child => {
      child.draw(ctx, offset);

      if (child.children.length > 0) {
        drawChildren(ctx, child.children, {
          x: child.x + offset.x,
          y: child.y + offset.y,
          opacity: child.opacity * offset.opacity,
          rotation: child.rotation + offset.rotation,
          scaleX: child.scaleX * offset.scaleX,
          scaleY: child.scaleY * offset.scaleY,
        });
      }
    });
  }, [])

  useEffect(() => {
    const canvas = canvasElement.current;
    const ctx = canvas.getContext('2d');

    const onUpdate = throttle(event => {
      ctx.clearRect(0, 0, canvasElement.current.width, canvasElement.current.height);
      drawChildren(ctx, canvasElement.current.children);

      ctx.beginPath();       // Start a new path
      ctx.moveTo(0, 100);    // Move the pen to (30, 50)
      ctx.lineTo(200, 100);  // Draw a line to (150, 100)
      ctx.stroke();

      ctx.beginPath();       // Start a new path
      ctx.moveTo(100, 0);    // Move the pen to (30, 50)
      ctx.lineTo(100, 200);  // Draw a line to (150, 100)
      ctx.stroke();
    });

    requestAnimationFrame(onUpdate);

    canvas.addEventListener('attributeChange', onUpdate);
    canvas.addEventListener('connect', onUpdate);
    canvas.addEventListener('load', onUpdate);

    return () => {
      canvas.removeEventListener('attributeChange', onUpdate);
      canvas.removeEventListener('connect', onUpdate);
      canvas.removeEventListener('load', onUpdate);
    };
  }, [drawChildren]);

  return (
    <canvas
      style={{ position: 'absolute' }}
      width={width}
      height={height}
      ref={canvasElement}
    >
      {children}
    </canvas>
  )
}