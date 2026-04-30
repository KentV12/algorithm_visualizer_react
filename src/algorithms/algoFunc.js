// returns available cells as neighbors that are unvisited or the destination cell
export function adjacentNeighbor(row, col, rows, cols) {
  let neighbors = [];

  const right = col + 1;
  const left = col - 1;
  const above = row - 1;
  const below = row + 1;

  // if within grid size
  if (row >= 0 && row < rows && col >= 0 && col < cols) {
    if (right < cols) {
      const rightCell = document.getElementById(row + "-" + right).className;
      if (
        document.getElementById(row + "-" + right) !== null &&
        validNeighbor(rightCell)
      )
        neighbors.push([row, right]);
    }

    if (above >= 0) {
      const aboveCell = document.getElementById(above + "-" + col).className;
      if (
        document.getElementById(above + "-" + col) !== null &&
        validNeighbor(aboveCell)
      )
        neighbors.push([above, col]);
    }

    if (left >= 0) {
      const leftCell = document.getElementById(row + "-" + left).className;
      if (
        document.getElementById(row + "-" + left) !== null &&
        validNeighbor(leftCell)
      )
        neighbors.push([row, left]);
    }

    if (below < rows) {
      const belowCell = document.getElementById(below + "-" + col).className;
      if (
        document.getElementById(below + "-" + col) !== null &&
        validNeighbor(belowCell)
      )
        neighbors.push([below, col]);
    }
  }

  return neighbors;
}

export function validNeighbor(name) {
  const validNames = [
    "cell empty",
    "cell weight1",
    "cell weight2",
    "cell weight3",
    "cell end",
  ];

  if (validNames.includes(name)) return true;
  else return false;
}

// return if cell is the end cell
export function isEnd(cell, endCell) {
  let isEnd = false;

  if (cell[0] === endCell[0] && cell[1] === endCell[1]) {
    isEnd = true;
  }

  return isEnd;
}
