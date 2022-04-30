const matrix = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 16],
  ];
  
  const rotateWithoutDiagonals = (arr, deg = 90) => {
    if (arr.length !== arr[0].length)
      throw new RangeError("Invalid length of arrays!");
    if (deg % 90 !== 0) throw new RangeError("Invalid degree!");
    if (deg % 360 === 0 || deg === 0) return arr;
    if (deg < 0) deg = (deg % 360) + 360;
  
    const result = rotate90Degree(arr);
    return rotateWithoutDiagonals(result, deg - 90);
  };
  
  const rotate90Degree = arr => {
    const length = arr.length;
    const rotatedArray = Array.from({ length }, () => []);
  
    arr.forEach((row, rowIndex) => {
      row.forEach((el, elIndex) => {
        if (rowIndex === elIndex || row.length - 1 - elIndex === rowIndex) {
          rotatedArray[rowIndex][elIndex] = el;
        } else {
          rotatedArray[rowIndex][elIndex] =
            arr[rotatedArray.length - elIndex - 1][rowIndex];
        }
      });
    });
  
    return rotatedArray;
  };
  
  console.log(rotateWithoutDiagonals(matrix, 90));
  