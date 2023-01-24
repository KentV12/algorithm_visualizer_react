let visitedOrder = [];
let shortestPath = [];
let found = false;
let endCell = null;

export function DFS(grid, start, end, rows, cols) {
  // console.log("inside DFS");
  // console.log("starting from " + start[0] + " " + start[1]);

  shortestPath = [];
  visitedOrder = [];
  found = false;
  endCell = [end[0], end[1]];

  solve(start[0], start[1]);
}

function solve(row, col) {
  // visit through all nodes
  // save shortest path

  let stack = [];
  stack.push([row, col]); // add starting cell
  let parent = [row, col];

  shortestPath[[row, col]] = "start";

  do {
    // take a neighbor
    let cur = stack.pop();

    // finds the neighbor of this cell
    let neighbors = DFSneighbor(cur[0], cur[1]);

    // add neighbors onto the stack
    // note neighbor() returns in order: right, top, left, bottom
    // when added to stack via pop(), stack will be in reverse, so using pop() on stack will retrieve right, top, left, bottom
    while (neighbors.length > 0) {
      stack.push(neighbors.pop());
    }

    // if current cell is the end cell
    if (cur[0] === endCell[0] && cur[1] === endCell[1]) {
      found = true;
      shortestPath[[cur[0], cur[1]]] = parent;
    } else if (
      document.getElementById(cur[0] + "-" + cur[1]).className === "cell"
    ) {
      shortestPath[[cur[0], cur[1]]] = parent;
      visitedOrder.push([cur[0], cur[1]]);
      parent = [cur[0], cur[1]];
      document.getElementById(cur[0] + "-" + cur[1]).className = "cell visited";
    }
  } while (stack.length > 0 && !found);

  console.log(shortestPath);

  animateBothPath();
}

// returns available cells as neighbors that are unvisited or the destination cell
function DFSneighbor(row, col) {
  let neighbors = [];

  // if within grid size
  if (row >= 0 && row < 11 && col >= 0 && col < 25) {
    if (
      // right
      document.getElementById(row + "-" + (col + 1)) !== null &&
      (document.getElementById(row + "-" + (col + 1)).className === "cell" ||
        document.getElementById(row + "-" + (col + 1)).className === "cell end")
    ) {
      neighbors.push([row, col + 1]);
    }
    if (
      // up
      document.getElementById(row - 1 + "-" + col) !== null &&
      (document.getElementById(row - 1 + "-" + col).className === "cell" ||
        document.getElementById(row - 1 + "-" + col).className === "cell end")
    ) {
      neighbors.push([row - 1, col]);
    }
    if (
      // left
      document.getElementById(row + "-" + (col - 1)) !== null &&
      (document.getElementById(row + "-" + (col - 1)).className === "cell" ||
        document.getElementById(row + "-" + (col - 1)).className === "cell end")
    ) {
      neighbors.push([row, col - 1]);
    }
    if (
      // down
      document.getElementById(row + 1 + "-" + col) !== null &&
      (document.getElementById(row + 1 + "-" + col).className === "cell" ||
        document.getElementById(row + 1 + "-" + col).className === "cell end")
    ) {
      neighbors.push([row + 1, col]);
    }
  }

  return neighbors;
}

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
