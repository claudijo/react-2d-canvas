export const registerCustomElement = (name, constructor) => {
  customElements.get(name) || customElements.define(name, constructor);
}

export const localCoordinatesFromMouseEvent = (event, scale = 1) => {
  const rect = event.target.getBoundingClientRect();
  const { clientX, clientY } = event;
  const x = (clientX - rect.x) / scale;
  const y = (clientY - rect.y) / scale;
  return { x, y };
};

export const createElement = (type, props = {}) => {
  const element = document.createElement(type);
  for (const key of Object.keys(props)) {
    element[key] = props[key]
  }
  return element;
}