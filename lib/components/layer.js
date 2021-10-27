import React, { useCallback, useContext, useEffect, useRef } from 'react';
import { StageContext } from '../contexts/stage';
import { throttle } from '../../utils/rate-limit';
import { createElement, hasMouseEventListeners, localCoordinatesFromMouseEvent } from '../../utils/dom';
import ColorIncrementer from '../../utils/color-incrementer';

const colorIncrementer = new ColorIncrementer();
const hitElementMap = new Map();

export default function Layer(
  {
    children,
    onClick,
    onMouseMove,
    onMouseDown,
    onMouseUp,
    onDoubleClick,
    onContextMenu,
    onMouseOut,
    onMouseOver,
  },
) {
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

  const dispatchEvent = (target, type, extra = {}) => {
    target.dispatchEvent(
      new MouseEvent(type, {
        ...extra,
        view: window,
        bubbles: true,
        cancelable: true,
      }),
    );
  };

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
    const target = getEventTargetAt(point);
    const extra = extraForEvent(event, point);

    if (target) {
      dispatchEvent(target, event.type, extra);

      if (event.type === 'mousemove') {
        if (hoveredElement.current && target !== hoveredElement.current) {
          dispatchEvent(hoveredElement.current, 'mouseout', extra);
        }

        if (hoveredElement.current !== target) {
          hoveredElement.current = target;
          dispatchEvent(target, 'mouseover', extra);
        }
      }
    } else if (
      hoveredElement.current
      || (event.type === 'mouseout' && hoveredElement.current) // Check mouse out for whole canvas
    ) {
      dispatchEvent(hoveredElement.current, 'mouseout', extra);
      hoveredElement.current = null;
    }
  };

  const onClickProxy = event => {
    onClick && onClick(event);
    onMouseEvent(event);
  };

  const onMouseMoveProxy = event => {
    onMouseMove && onMouseMove(event);
    onMouseEvent(event);
  };

  const onMouseDownProxy = event => {
    onMouseDown && onMouseDown(event);
    onMouseEvent(event);
  };

  const onMouseUpProxy = event => {
    onMouseUp && onMouseUp(event);
    onMouseEvent(event);
  };

  const onDoubleClickProxy = event => {
    onDoubleClick && onDoubleClick(event);
    onMouseEvent(event)
  }

  const onContextMenuProxy = event => {
    onContextMenu && onContextMenu(event);
    onMouseEvent(event)
  }

  const onMouseOutProxy = event => {
    onMouseOut && onMouseOut(event)
    onMouseEvent(event);
  }

  return (
    <canvas
      style={{ position: 'absolute' }}
      width={width}
      height={height}
      ref={canvasElement}
      onClick={onClickProxy}
      onMouseMove={onMouseMoveProxy}
      onMouseDown={onMouseDownProxy}
      onMouseUp={onMouseUpProxy}
      onDoubleClick={onDoubleClickProxy}
      onContextMenu={onContextMenuProxy}
      onMouseOut={onMouseOutProxy}
      onMouseOver={onMouseOver}
    >
      {children}
    </canvas>
  );
}