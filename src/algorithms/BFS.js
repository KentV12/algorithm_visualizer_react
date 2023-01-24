// these values will persist through application
let visitedOrder = [];
let shortestPath = [];
let found = false;

let endCell = null;

export function BFS(grid, start, end, rows, cols) {
  endCell = end;

  // reset all values
  visitedOrder = []; // a list
  shortestPath = []; // contains the parent cell of current cell
  found = false;

  let queue = [];
  let neighbors = [];
  let cur = null;

  queue.push([start[0], start[1]]);

  do {
    cur = queue.shift();
    neighbors = getNeighbors(cur, rows, cols);

    shortestPath[[start[0], start[1]]] = "start";

    while (neighbors.length > 0 && found === false) {
      let neighbor = neighbors.shift(); // get first neighbor from neighbors

      // add to visited order to animate
      visitedOrder.push([neighbor[0], neighbor[1]]);
      // remember the parent cell of this neighbor cell
      shortestPath[[neighbor[0], neighbor[1]]] = [cur[0], cur[1]];

      if (neighbor[0] === end[0] && neighbor[1] === end[1]) {
        found = true;
      } else {
        document.getElementById(neighbor[0] + "-" + neighbor[1]).className =
          "cell visited";
      }

      // add current neighbor to queue
      queue.push([neighbor[0], neighbor[1]]);
    }
  } while (queue.length > 0 && found === false);

  animateBothPath();
}

function getNeighbors(cell, rows, cols) {
  // cell contains row, col at index 0, 1 respectively
  let neighbors = [];

  const right = cell[1] + 1;
  const top = cell[0] - 1;
  const left = cell[1] - 1;
  const bottom = cell[0] + 1;

  // check if adjacent cell is a traversable cell
  // check right
  if (right < cols) {
    if (
      document.getElementById(cell[0] + "-" + right).className === "cell" ||
      document.getElementById(cell[0] + "-" + right).className === "cell end"
    )
      neighbors.push([cell[0], cell[1] + 1]);
  }
  // check top
  if (top >= 0) {
    if (
      document.getElementById(top + "-" + cell[1]).className === "cell" ||
      document.getElementById(top + "-" + cell[1]).className === "cell end"
    )
      neighbors.push([top, cell[1]]);
  }
  // check left
  if (left >= 0) {
    if (
      document.getElementById(cell[0] + "-" + left).className === "cell" ||
      document.getElementById(cell[0] + "-" + left).className === "cell end"
    )
      neighbors.push([cell[0], left]);
  }
  // check bottom
  if (bottom < rows) {
    if (
      document.getElementById(bottom + "-" + cell[1]).className === "cell" ||
      document.getElementById(bottom + "-" + cell[1]).className === "cell end"
    )
      neighbors.push([bottom, cell[1]]);
  }

  return neighbors;
}

// setTimeout does not pause the application. It will run through the code as normal but those with setTimeout will execute after specified time.
// easier to animate both path due to how setTimeout works. We can keep track of when to start via count
function animateBothPath() {
  const timePerGrid = 25;
  let count = 0;

  while (visitedOrder.length > 0) {
    let cell = visitedOrder.shift();

    if (!isEnd(cell)) {
      // if not the last cell
      setTimeout(() => {
        document.getElementById(cell[0] + "-" + cell[1]).className =
          "cell visitedColor"; // change to visited
      }, timePerGrid * count); // Multiplied by count means every 10ms this will be called
      count++;
    }
  }

  let cur = shortestPath[[endCell[0], endCell[1]]];
  let pathArray = [];

  // while the parent cell of current cell is not the start
  while (shortestPath[[cur[0], cur[1]]] !== "start") {
    pathArray.push([cur[0], cur[1]]);
    cur = shortestPath[[cur[0], cur[1]]];
  }

  // if end cell is found
  if (found) {
    setTimeout(() => {
      let count = 0;
      while (pathArray.length > 0) {
        let cur = pathArray.shift();
        setTimeout(() => {
          document.getElementById(cur[0] + "-" + cur[1]).className =
            "cell path";
        }, timePerGrid * 2 * count); // display shortest path in half the time of visiting cells
        count++;
      }
    }, timePerGrid * count + 1000);
  }
}

// return if cell is the end cell
function isEnd(cell) {
  let isEnd = false;

  if (cell[0] === endCell[0] && cell[1] === endCell[1]) {
    isEnd = true;
  }

  return isEnd;
}
