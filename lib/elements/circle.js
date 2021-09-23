import AbstractShape from './abstract-shape';

class Circle extends AbstractShape {
  static get observedAttributes() {
    return [
      ...AbstractShape.observedAttributes,
      'radius',
    ];
  }

  get radius() {
    return this.getNumericAttribute('radius')
  }

  set radius(value) {
    this.setAttribute('radius', value);
  }
}