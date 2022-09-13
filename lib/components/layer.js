import React, { useCallback, useContext, useEffect, useRef } from 'react';
import { StageContext } from '../contexts/stage';
import { throttle } from '../../utils/rate-limit';
import {
  createElement,
  keyboardEventInit,
  localCoordinatesFromEvent,
  mouseEventInit,
  touchEventInit,
  touchInit,
  wheelEventInit,
} from '../../utils/dom';
import ColorIncrementer from '../../utils/color-incrementer';

const colorIncrementer = new ColorIncrementer();
const hitElementMap = new Map();

const notNullFilter = item => item !== null;

const clear = (ctx) => {
  const transform = ctx.getTransform();
  if (!transform.isIdentity) {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
  }

  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
};

const scaleAndTranslate = (ctx, scaleX = 1, scaleY = 1, dx = 0, dy = 0) => {
  ctx.setTransform(scaleX, 0, 0, scaleY, dx, dy);
};

// To detect if `event.stopPropagation()` has been called
// https://stackoverflow.com/a/52250493
let isPropagationStopped = false;
const stopPropagationFuncTemp =  Event.prototype.stopPropagation;
Event.prototype.stopPropagation = function() {
  isPropagationStopped = true;
  stopPropagationFuncTemp.apply(this, arguments);
};

export default function Layer(
  {
    children,
    scaleX,
    scaleY,
    offsetX,
    offsetY,
    tabIndex,
    ...rest
  }) {
  const { scale, width, height } = useContext(StageContext);
  const hoveredElement = useRef(null);

  const touchEntities = useRef({});
  const canvasElement = useRef(null);
  const hitCanvasElement = useRef(createElement('canvas', { width, height }));
  const lastSibling = useRef(null);

  useEffect(() => {
    lastSibling.current = canvasElement.current.parentNode.querySelector('canvas:last-of-type');
  }, [canvasElement]);

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

      // Assume all children in top most layer might have mouse / touch event handlers
      if (lastSibling.current && lastSibling.current === canvasElement.current) {
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
  }, [lastSibling]);

  useEffect(() => {
    const canvas = canvasElement.current;
    const ctx = canvas.getContext('2d');

    const hitCanvas = hitCanvasElement.current;
    const hitCtx = hitCanvas.getContext('2d');

    const onUpdate = throttle(event => {
      clear(ctx);
      clear(hitCtx);
      colorIncrementer.reset();

      const willTransform =
        typeof scaleX !== 'undefined'
        || typeof scaleY !== 'undefined'
        || typeof offsetX !== 'undefined'
        || typeof offsetY !== 'undefined';

      if (willTransform) {
        scaleAndTranslate(ctx, scaleX, scaleY, offsetX, offsetY);
        scaleAndTranslate(hitCtx, scaleX, scaleY, offsetX, offsetY);
      }

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
  }, [drawChildren, scaleX, scaleY, offsetX, offsetY]);

  const getEventTargetAt = (point) => {
    const ctx = hitCanvasElement.current.getContext('2d');
    const pixel = ctx.getImageData(point.x, point.y, 1, 1).data;
    const color = `rgb(${pixel[0]},${pixel[1]},${pixel[2]})`;
    return hitElementMap.get(color);
  };

  const onTouchStart = event => {
    if (event.target !== canvasElement.current) {
      return;
    }

    const rect = event.target.getBoundingClientRect();

    const changedTouches = Array.from(event.changedTouches)
      .map(changedTouch => {
        const point = localCoordinatesFromEvent(rect, changedTouch, scale);
        const target = getEventTargetAt(point);
        if (!target) {
          return null;
        }

        const touch = new Touch({
          ...touchInit(changedTouch),
          target,
          clientX: point.x,
          clientY: point.y,
        });

        touchEntities.current[touch.identifier] = touch;
        return touch;
      })
      .filter(notNullFilter);

    changedTouches.forEach(changedTouch => {
      changedTouch.target.dispatchEvent(new TouchEvent('touchstart', {
        ...touchEventInit(event),
        touches: Object.values(touchEntities.current),
        targetTouches: Object.values(touchEntities.current).filter(targetTouch => targetTouch.target === changedTouch.target),
        changedTouches,
      }));
    });
  };

  const onTouchEvent = event => {
    if (event.target !== canvasElement.current) {
      return;
    }

    const rect = event.target.getBoundingClientRect();
    const touchMapper = touch => {
      if (!touchEntities.current[touch.identifier]) {
        return null;
      }

      const point = localCoordinatesFromEvent(rect, touch, scale);
      return new Touch({
        ...touchInit(touch),
        target: touchEntities.current[touch.identifier].target,
        clientX: point.x,
        clientY: point.y,
      });
    };

    const touches = Array.from(event.touches).map(touchMapper).filter(notNullFilter);
    const targetTouches = touches.filter(touch => touch.target === event.target);
    const changedTouches = Array.from(event.changedTouches).map(touchMapper).filter(notNullFilter);

    // This will fire duplicate touch `moveevents` if there are multiple touches,
    // but hard to avoid...
    const touchTargets = event.type === 'touchmove' ? touches : changedTouches;
    touchTargets.forEach(touch => {
      touch.target.dispatchEvent(new TouchEvent(event.type, {
        ...touchEventInit(event),
        touches,
        targetTouches,
        changedTouches,
      }));
    });

    if (event.type === 'touchend' || event.type === 'touchcancel') {
      for (const touch of event.changedTouches) {
        delete touchEntities.current[touch.identifier];
      }
    }
  };

  const onWheelEvent = event => {
    if (event.target !== canvasElement.current) {
      return;
    }

    const rect = event.target.getBoundingClientRect();
    const point = localCoordinatesFromEvent(rect, event, scale);
    const childTarget = getEventTargetAt(point);

    const eventInit = {
      ...wheelEventInit(event),
      clientX: point.x,
      clientY: point.y,
    };

    isPropagationStopped = false;

    // Handle mouse events for child components
    if (childTarget) {
      childTarget.dispatchEvent(new WheelEvent(event.type, eventInit));
    }

    // Handle mouse event for Layer component by calling corresponding passed
    // event handler, if event bubbles, ie. `stopPropagation` has not been been
    // called
    if (!isPropagationStopped) {
      Object.keys(rest).forEach(key => {
        if (key.toLowerCase() === `on${event.type}`) {
          rest[key](new WheelEvent(event.type, eventInit));
        }
      });
    }
  };

  const onKeyboardEvent = event => {
    if (event.target !== canvasElement.current) {
      return;
    }

    const eventInit = keyboardEventInit(event);

    // Handle keyboard event for Layer component by calling corresponding passed
    // event handler
    Object.keys(rest).forEach(key => {
      if (key.toLowerCase() === `on${event.type}`) {
        rest[key](new KeyboardEvent(event.type, eventInit));
      }
    });
  };

  const onMouseEvent = event => {
    if (event.target !== canvasElement.current) {
      return;
    }

    const rect = event.target.getBoundingClientRect();
    const point = localCoordinatesFromEvent(rect, event, scale);
    const childTarget = getEventTargetAt(point);

    const eventInit = {
      ...mouseEventInit(event),
      clientX: point.x,
      clientY: point.y,
    };

    isPropagationStopped = false;

    // Handle mouse events for child components
    if (childTarget) {
      childTarget.dispatchEvent(new MouseEvent(event.type, {
        ...mouseEventInit(event),
        clientX: point.x,
        clientY: point.y,
      }));

      if (event.type === 'mousemove') {
        if (hoveredElement.current && childTarget !== hoveredElement.current) {
          hoveredElement.current.dispatchEvent(new MouseEvent('mouseout', eventInit));
        }

        if (hoveredElement.current !== childTarget) {
          hoveredElement.current = childTarget;
          hoveredElement.current.dispatchEvent(new MouseEvent('mouseover', eventInit));
        }
      }
    } else if (event.type === 'mouseout' && hoveredElement.current) {
      hoveredElement.current.dispatchEvent(new MouseEvent('mouseout', eventInit));
      hoveredElement.current = null;
    }

    // Handle mouse event for Layer component by calling corresponding passed
    // event handler, if event bubbles, ie. `stopPropagation` has not been been
    // called
    if (!isPropagationStopped) {
      Object.keys(rest).forEach(key => {
        if (key.toLowerCase() === `on${event.type}`) {
          rest[key](new MouseEvent(event.type, eventInit));
        }
      });
    }
  };

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
      onTouchStart={onTouchStart}
      onTouchMove={onTouchEvent}
      onTouchEnd={onTouchEvent}
      onTouchCancel={onTouchEvent}
      onWheel={onWheelEvent}
      onKeyDown={onKeyboardEvent}
      onKeyUp={onKeyboardEvent}
      onKeyPress={onKeyboardEvent}
      tabIndex={tabIndex}
    >
      {children}
    </canvas>
  );
}