export default class ColorIncrementer {
  constructor(step = 4) {
    this.step = step;
    this.rgb = [0,0,0]
  }

  reset() {
    this.rgb = [0,0,0]
  }

  next() {
    for (let index = 0; index < 3; index++) {
      if (this.rgb[index] + this.step < 256) {
        this.rgb[index] += this.step;
        return `rgb(${this.rgb.join(',')})`
      } else if (index < 2) {
        this.rgb[index] = 0;
      }
    }

    throw new Error('Color incrementer overflow')
  }
}