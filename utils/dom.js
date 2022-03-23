export const registerCustomElement = (name, constructor) => {
  customElements.get(name) || customElements.define(name, constructor);
};

export const localCoordinatesFromEvent = (rect, event, scale) => {
  const { clientX, clientY } = event;
  const x = (clientX - rect.x) / scale;
  const y = (clientY - rect.y) / scale;
  return { x, y };
};

export const createElement = (type, props = {}) => {
  const element = document.createElement(type);
  for (const key of Object.keys(props)) {
    element[key] = props[key];
  }
  return element;
};

export const eventInit = sourceEvent => {
  const { bubbles, cancelable, composed } = sourceEvent;
  return {
    bubbles,
    cancelable,
    composed,
  };
};

export const uIEventInit = sourceEvent => {
  const { detail, view, sourceCapabilities } = sourceEvent;
  return {
    ...eventInit(sourceEvent),
    detail,
    view,
    sourceCapabilities,
  };
};

export const mouseEventInit = (sourceEvent) => {
  const {
    screenX,
    screenY,
    clientX,
    clientY,
    ctrlKey,
    shiftKey,
    altKey,
    metaKey,
    button,
    buttons,
    relatedTarget,
    region,
  } = sourceEvent;
  return {
    ...uIEventInit(sourceEvent),
    screenX,
    screenY,
    clientX,
    clientY,
    ctrlKey,
    shiftKey,
    altKey,
    metaKey,
    button,
    buttons,
    relatedTarget,
    region,
  };
};

export const touchEventInit = (sourceEvent) => {
  const {
    touches,
    targetTouches,
    changedTouches,
    ctrlKey,
    shiftKey,
    altKey,
    metaKey,
  } = sourceEvent;

  return {
    ...uIEventInit(sourceEvent),
    touches,
    targetTouches,
    changedTouches,
    ctrlKey,
    shiftKey,
    altKey,
    metaKey,
  }
};

export const touchInit = sourceTouch => {
  const {
    identifier,
    target,
    clientX,
    clientY,
    screenX,
    screenY,
    pageX,
    pageY,
    radiusX,
    radiusY,
    rotationAngle,
    force,
  } = sourceTouch;
  return {
    identifier,
    target,
    clientX,
    clientY,
    screenX,
    screenY,
    pageX,
    pageY,
    radiusX,
    radiusY,
    rotationAngle,
    force,
  }
}
