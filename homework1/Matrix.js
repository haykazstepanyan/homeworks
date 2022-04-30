const matrix = [
    [1, 2],
    [3, 4],
    [5, 6],
    [7, 8],
  ];
  
  const rotate = (arr, deg = 90) => {
    if (!arr.length) return;
    if (deg % 90 !== 0) throw new RangeError("Invalid degree!");
    if (deg % 360 === 0 || deg === 0) return arr;
    if (deg < 0) deg = (deg % 360) + 360;
  
    const result = rotate90Degree(arr);
    return rotate(result, deg - 90);
  };
  
  const rotate90Degree = arr => {
    const rotatedArray = Array.from({ length: arr[0].length }, () => []);
    rotatedArray.forEach((_, elIndex) => {
      arr.forEach((_, rowIndex) => {
        rotatedArray[elIndex].push(arr[arr.length - rowIndex - 1][elIndex]);
      });
    });
    return rotatedArray;
  };
  
  console.log(rotate(matrix, 90));
  