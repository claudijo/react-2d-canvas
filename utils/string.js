export const cropEnd = (text, ellipses = '…') => {
  const main = text.replace(new RegExp(`${ellipses}$`), '');

  if (main === '') {
    return main;
  }

  const cropped = main.slice(0, -1);
  return cropped + ellipses;
}