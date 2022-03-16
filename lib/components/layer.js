import React, { useCallback, useContext, useEffect, useRef } from 'react';
import { StageContext } from '../contexts/stage';
import { throttle } from '../../utils/rate-limit';
import { createElement, hasMouseEventListeners, localCoordinatesFromMouseEvent } from '../../utils/dom';
import ColorIncrementer from '../../utils/color-incrementer';

const colorIncrementer = new ColorIncrementer();
const hitElementMap = new Map();

export default function Layer({ children, ...rest }) {
  const { scale, width, height } = useContext(StageContext);
  const hoveredElement = useRef(null);

  const canvasElement = useRef(null);
  const hitCanvasElement = useRef(createElement('canvas', { width, height }));

  const drawChildren = useCallback((ctx, children, offset = {
    x: 0,
    y: 0,
    opacity: 1,
    rotation: 0,
    scaleX: 1,
    scaleY: 1,
  }) => {
    Array.from(children).sort((a, b) => a.zIndex - b.zIndex).forEach(child => {
      child.draw(ctx, offset);

      if (hasMouseEventListeners(child)) {
        const ctx = hitCanvasElement.current.getContext('2d');
        const color = colorIncrementer.next();
        hitElementMap.set(color, child);
        child.drawHitArea(ctx, offset, color);
      }

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
  }, []);

  useEffect(() => {
    const canvas = canvasElement.current;
    const ctx = canvas.getContext('2d');

    const hitCanvas = hitCanvasElement.current;
    const hitCtx = hitCanvas.getContext('2d');

    const onUpdate = throttle(event => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      hitCtx.clearRect(0, 0, hitCanvas.width, hitCanvas.height);
      colorIncrementer.reset();
      drawChildren(ctx, canvasElement.current.children);
    });

    requestAnimationFrame(onUpdate);

    canvas.addEventListener('attributeChange', onUpdate);
    canvas.addEventListener('connect', onUpdate);
    canvas.addEventListener('disconnect', onUpdate);
    canvas.addEventListener('load', onUpdate);

    return () => {
      canvas.removeEventListener('attributeChange', onUpdate);
      canvas.removeEventListener('connect', onUpdate);
      canvas.removeEventListener('disconnect', onUpdate);
      canvas.removeEventListener('load', onUpdate);
    };
  }, [drawChildren]);

  const getEventTargetAt = (point) => {
    const ctx = hitCanvasElement.current.getContext('2d');
    const pixel = ctx.getImageData(point.x, point.y, 1, 1).data;
    const color = `rgb(${pixel[0]},${pixel[1]},${pixel[2]})`;
    return hitElementMap.get(color);
  };

  const dispatchEvent = (target, type, extra) => {
    target.dispatchEvent(createMouseEvent(target, type, extra));
  };

  const createMouseEvent = (target, type, extra = {}) => {
    return new MouseEvent(type, {
      ...extra,
      view: window,
      bubbles: true,
      cancelable: true,
    });
  }

  const extraForEvent = (event, point) => {
    const { altKey, button, buttons, ctrlKey, metaKey, shiftKey } = event;
    return {
      clientX: point.x,
      clientY: point.y,
      altKey,
      button,
      buttons,
      ctrlKey,
      metaKey,
      shiftKey,
      region: null,
      // Missing extra properties to implement...
      // movementX: 0,
      // movementY: 0,
      // offsetX: 0,
      // offsetY: 0,
      // pageX: 0,
      // pageY: 0,
      // relatedTarget: null,
      // screenX: 0,
      // screenY: 0,
    };
  };

  const onMouseEvent = event => {
    if (event.target !== canvasElement.current) {
      return;
    }

    const point = localCoordinatesFromMouseEvent(event, scale);
    const extra = extraForEvent(event, point);
    const childTarget = getEventTargetAt(point);

    // Handle mouse event for Layer component by calling corresponding passed
    // event handler
    const handlers = Object.keys(rest).reduce((acc, key) => {
      acc[key.toLowerCase()] = rest[key];
      return acc;
    }, {});

    const handler = handlers['on' + event.type];
    if (handler) {
      handler(createMouseEvent(event.target, event.type, extra));
    }

    // Handle mouse events for child components
    if (childTarget) {
      dispatchEvent(childTarget, event.type, extra);

      if (event.type === 'mousemove') {
        if (hoveredElement.current && childTarget !== hoveredElement.current) {
          dispatchEvent(hoveredElement.current, 'mouseout', extra);
        }

        if (hoveredElement.current !== childTarget) {
          hoveredElement.current = childTarget;
          dispatchEvent(childTarget, 'mouseover', extra);
        }
      }
    } else if (event.type === 'mouseout' && hoveredElement.current) {
      dispatchEvent(hoveredElement.current, 'mouseout', extra);
      hoveredElement.current = null;
    }
  }

  return (
    <canvas
      style={{ position: 'absolute' }}
      width={width}
      height={height}
      ref={canvasElement}
      onClick={onMouseEvent}
      onMouseMove={onMouseEvent}
      onMouseDown={onMouseEvent}
      onMouseUp={onMouseEvent}
      onDoubleClick={onMouseEvent}
      onContextMenu={onMouseEvent}
      onMouseOut={onMouseEvent}
      onMouseOver={onMouseEvent}
    >
      {children}
    </canvas>
  );
}