const sorting = (arr) => {
  if (!Array.isArray(arr)) throw new TypeError("Unexpected argument type");

  const length = arr.length;
  if (length < 2) return arr;

  const result = [];
  const absMin = Math.abs(Math.min(...arr));
  const numbersObj = {};

  arr.forEach((el, i) => {
    const currentKey = el + absMin;
    numbersObj[currentKey] = !numbersObj[currentKey]
      ? [arr[i]]
      : [arr[i], ...numbersObj[currentKey]];
  });

  for (let key in numbersObj) {
    result.push(...numbersObj[key]);
  }
  return result;
};

const arr = [2, 1, -11, -11, 5, -999555555, 9991234, 0, 0, 0];

sorting(arr);
