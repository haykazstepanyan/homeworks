function solution (grid) {  
    if (grid.length !== 9) return false;
    let subGrid;

    for (let i = 0; i < grid.length; i++) {
        if (grid[i].length !== 9) return false;
        const horizontalSet = new Set();
        const verticalSet = new Set();   

        if (i % 3 === 0) {
            subGrid = Array.from({length: 3}, () => new Set());
        }

        for (let j = 0; j < grid[i].length; j++) {
            const rowNumber = +grid[i][j];
            const columnNumber = +grid[j][i];

            if (rowNumber) {
                if (horizontalSet.has(rowNumber)) return false;
                horizontalSet.add(rowNumber);
                if (!checkSubGrid(j, rowNumber, subGrid)) return false;
            }
          
            if (columnNumber) {
                if (verticalSet.has(columnNumber)) return false;
                verticalSet.add(columnNumber)
            }
        }
    }
    return true;
}

function checkSubGrid(colIndex, rowNumber, subGrid) {
    if (colIndex < 3) {
        if (subGrid[0].has(rowNumber)) return false;
        subGrid[0].add(rowNumber);
      } else if (colIndex < 6) {
        if (subGrid[1].has(rowNumber)) return false;
        subGrid[1].add(rowNumber);
      } else {
        if (subGrid[2].has(rowNumber)) return false;
        subGrid[2].add(rowNumber);  
      }
      return true;
}