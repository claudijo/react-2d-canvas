export const throttle = fn => {
  let tick = false;
  return (...args) => {
    if (!tick) {
      requestAnimationFrame(() => {
        fn(...args);
        tick = false;
      });
    }
    tick = true;
  };
};