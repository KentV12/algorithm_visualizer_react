import { adjacentNeighbor } from "./algoFunc";

// these values will persist through application
let visitedOrder = [];
let shortestPath = [];
let found = false;

export function BFS(start, end, rows, cols) {
  // reset all values
  visitedOrder = []; // a list contains the order of visited cells
  shortestPath = []; // contains the parent cell of current cell
  found = false;

  solve(start, end, rows, cols);

  return {
    visitedOrder: visitedOrder,
    shortestPath: shortestPath,
    found: found,
  };
}

function solve(start, end, rows, cols) {
  let queue = [];
  let neighbors = [];
  let visited = [];
  let cur = null;

  queue.push([start[0], start[1]]);

  do {
    cur = queue.shift();
    neighbors = adjacentNeighbor(cur[0], cur[1], rows, cols);

    shortestPath[[start[0], start[1]]] = "start";

    while (neighbors.length > 0 && found === false) {
      let neighbor = neighbors.shift(); // get first neighbor from neighbors

      // check if this neighbor has been visited
      if (visited[[neighbor[0], neighbor[1]]] !== true) {
        // add to visited order to animate
        visitedOrder.push([neighbor[0], neighbor[1]]);
        // remember the parent cell of this neighbor cell
        shortestPath[[neighbor[0], neighbor[1]]] = [cur[0], cur[1]];

        if (neighbor[0] === end[0] && neighbor[1] === end[1]) {
          found = true;
        }

        // add current neighbor to queue
        queue.push([neighbor[0], neighbor[1]]);

        visited[[neighbor[0], neighbor[1]]] = true;
      }
    }
  } while (queue.length > 0 && found === false);
}
