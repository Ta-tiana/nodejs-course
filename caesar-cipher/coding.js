let codeMap = '';
const strLower = 'abcdefghijklmnopqrstuvwxyz';

function coding(input, { shift, codingType }) {
  if (codingType === 'decode') {
    shift = -shift;
  }

  const arr = strLower.split('');
  const arrStr = input.split('');
  const f = shift % 26;

  codeMap = arr
    .splice(f)
    .concat(arr)
    .map((el, i) => [strLower.split('')[i], el]);
  codeMap = Object.fromEntries(codeMap);

  for (let i = 0; i < arrStr.length; i++) {
    const letter = arrStr[i];

    if (letter === letter.toUpperCase()) {
      if (codeMap[letter.toLowerCase()]) {
        arrStr[i] = codeMap[letter.toLowerCase()].toUpperCase();
      } else {
        arrStr[i] = letter;
      }
    } else {
      arrStr[i] = codeMap[letter];
    }
  }

  return arrStr.join('');
}

module.exports = {
  coding
};
