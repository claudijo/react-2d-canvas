export const cropEnd = (text, ellipses = '…') => {
  const main = text.replace(new RegExp(`${ellipses}$`), '');

  if (main === '') {
    return main;
  }

  const cropped = main.slice(0, -1);
  return cropped + ellipses;
};

export const breakLines = (text, shouldBreak) => {
  const paragraphs = text.split('\n');
  let lines = [];

  for (const paragraph of paragraphs) {
    const words = paragraph.split(' ');
    let start = 0;

    for (let n = 0; n < words.length; n++) {
      const line = words.slice(start, n + 1);
      const isLastWord = (n === words.length - 1);

      if (shouldBreak(line.join(' '))) {
        if (line.length > 1) {
          lines.push(words.slice(start, n).join(' '));
        }

        if (isLastWord) {
          lines.push(words[words.length - 1]);
        }

        start = n;
      } else if (isLastWord) {
        lines.push(words.slice(start, n + 1).join(' '));
      }
    }
  }

  return lines;
};