export const registerCustomElement = (name, constructor) => {
  customElements.get(name) || customElements.define(name, constructor);
}