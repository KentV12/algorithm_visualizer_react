let visitedOrder = [];
let shortestPath = [];
let found = false;

let endCell = null;

export function BFS(grid, start, end) {
  endCell = end;

  console.log(
    "we need to go from " +
      start[0] +
      "-" +
      start[1] +
      " to " +
      end[0] +
      "-" +
      end[1]
  );

  // implement algorithm and get visited order
  // we know grid size, where to start and end
  // keep track of visited order and parents of the current node

  let queue = [];
  let neighbors = [];
  let cur = null;

  queue.push([start[0], start[1]]);

  console.log(end[0]);
  console.log(end[1]);

  do {
    cur = queue.shift();
    neighbors = getNeighbors(cur);
    console.log("neighbors: " + neighbors);

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

  animateVisitedOrder();
  if (found) animateShortestPath();
}

function getNeighbors(cell) {
  // cell contains row, col at index 0, 1 respectively
  let neighbors = [];
  console.log("getting neighbors of " + cell[0] + "-" + cell[1]);

  const right = cell[1] + 1;
  const top = cell[0] - 1;
  const left = cell[1] - 1;
  const bottom = cell[0] + 1;

  // check right
  if (right <= 9) {
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
  if (bottom <= 9) {
    if (
      document.getElementById(bottom + "-" + cell[1]).className === "cell" ||
      document.getElementById(bottom + "-" + cell[1]).className === "cell end"
    )
      neighbors.push([bottom, cell[1]]);
  }

  return neighbors;
}

function animateVisitedOrder() {
  let count = 0;

  while (visitedOrder.length > 0) {
    let cell = visitedOrder.shift();

    if (!isEnd(cell)) {
      setTimeout(() => {
        document.getElementById(cell[0] + "-" + cell[1]).className =
          "cell visitedColor";
      }, 20 * count); // setTimeout does not pause the application.
      // It will run through the code as normal but those with setTimeout will stay. Multiplied by count means every 10ms this will be called
      count++;
    }
  }
}

// return shortest path by tracing from last cell
function animateShortestPath() {
  let cur = shortestPath[[endCell[0], endCell[1]]];

  let pathArray = [];

  // while the parent cell of current cell is not the start
  while (shortestPath[[cur[0], cur[1]]] !== "start") {
    pathArray.push([cur[0], cur[1]]);
    cur = shortestPath[[cur[0], cur[1]]];
  }

  let count = 0;
  while (pathArray.length > 0) {
    let cur = pathArray.shift();
    setTimeout(() => {
      document.getElementById(cur[0] + "-" + cur[1]).className = "cell path";
    }, 4000 + 50 * count);
    count++;
  }
}

function isEnd(cell) {
  let isEnd = false;

  if (cell[0] === endCell[0] && cell[1] === endCell[1]) {
    isEnd = true;
  }

  return isEnd;
}
