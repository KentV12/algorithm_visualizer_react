import { adjacentNeighbor } from "./algoFunc";
import { animateBothPath } from "./algoFunc";

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
  animateBothPath(end, found, visitedOrder, shortestPath);
}

function solve(start, end, rows, cols) {
  let queue = [];
  let neighbors = [];
  let cur = null;

  queue.push([start[0], start[1]]);

  do {
    cur = queue.shift();
    neighbors = adjacentNeighbor(cur[0], cur[1], rows, cols);

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
}
