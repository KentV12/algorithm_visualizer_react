// returns available cells as neighbors that are unvisited or the destination cell
export function adjacentNeighbor(row, col, rows, cols) {
  let neighbors = [];

  const right = col + 1;
  const above = row - 1;
  const left = col - 1;
  const below = row + 1;

  // if within grid size
  if (row >= 0 && row < rows && col >= 0 && col < cols) {
    if (right < cols) {
      const rightCell = document.getElementById(row + "-" + right).className;
      if (
        document.getElementById(row + "-" + right) !== null &&
        (rightCell === "cell" || rightCell === "cell end")
      ) {
        neighbors.push([row, right]);
      }
    }

    if (above >= 0) {
      const aboveCell = document.getElementById(above + "-" + col).className;
      if (
        document.getElementById(above + "-" + col) !== null &&
        (aboveCell === "cell" || aboveCell === "cell end")
      ) {
        neighbors.push([above, col]);
      }
    }

    if (left >= 0) {
      const leftCell = document.getElementById(row + "-" + left).className;
      if (
        document.getElementById(row + "-" + left) !== null &&
        (leftCell === "cell" || leftCell === "cell end")
      ) {
        neighbors.push([row, left]);
      }
    }

    if (below < rows) {
      const belowCell = document.getElementById(below + "-" + col).className;
      if (
        document.getElementById(below + "-" + col) !== null &&
        (belowCell === "cell" || belowCell === "cell end")
      ) {
        neighbors.push([below, col]);
      }
    }
  }

  return neighbors;
}

export function animateBothPath(end, found, visitedOrder, shortestPath) {
  const timePerGrid = 25;
  let count = 0;

  while (visitedOrder.length > 0) {
    let cell = visitedOrder.shift();

    if (!isEnd(cell, end)) {
      // if not the last cell
      setTimeout(() => {
        document.getElementById(cell[0] + "-" + cell[1]).className =
          "cell visitedColor"; // change to visited
      }, timePerGrid * count); // Multiplied by count means every 10ms this will be called
      count++;
    }
  }

  let cur = shortestPath[[end[0], end[1]]];
  let pathArray = [];

  // while the parent cell of current cell is not the start
  while (shortestPath[[cur[0], cur[1]]] !== "start") {
    pathArray.push([cur[0], cur[1]]);
    cur = shortestPath[[cur[0], cur[1]]];
  }

  // if end cell is found
  if (found) {
    pathArray.reverse();
    setTimeout(() => {
      let count = 0;
      while (pathArray.length > 0) {
        let cur = pathArray.shift();
        setTimeout(() => {
          document.getElementById(cur[0] + "-" + cur[1]).className =
            "cell path";
        }, timePerGrid * count); // display shortest path in half the time of visiting cells
        count++;
      }
    }, timePerGrid * count + 1000);
  }
}

export function randomWeight(rows, cols) {
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      let name = document.getElementById(row + "-" + col).className;
      if (
        name === "cell" ||
        name === "cell weight1" ||
        name === "cell weight2" ||
        name === "cell weight3"
      ) {
        let weight = Math.floor(Math.random() * 3) + 1;
        document.getElementById(row + "-" + col).className =
          "cell weight" + weight;
      }
    }
  }
}

// return if cell is the end cell
function isEnd(cell, endCell) {
  let isEnd = false;

  if (cell[0] === endCell[0] && cell[1] === endCell[1]) {
    isEnd = true;
  }

  return isEnd;
}
