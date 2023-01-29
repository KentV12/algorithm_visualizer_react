import { adjacentNeighbor } from "./algoFunc";
import { animateBothPath } from "./algoFunc";

let visitedOrder = [];
let shortestPath = [];
let found = false;
let endCell = null;

export function DFS(start, end, rows, cols) {
  shortestPath = [];
  visitedOrder = [];
  found = false;
  endCell = [end[0], end[1]];

  solve(start[0], start[1], rows, cols);
  animateBothPath(end, found, visitedOrder, shortestPath);
}

function solve(row, col, rows, cols) {
  let stack = [];
  let parent = [row, col];
  let saveParent = []; // contains the parents of unvisited neighbor nodes in case of re-tracing during path dead end

  stack.push([row, col]); // add starting cell
  shortestPath[[row, col]] = "start";

  let wasDeadEnd = false;

  do {
    // take a neighbor
    let cur = stack.pop();

    // finds the neighbor of this cell
    let neighbors = adjacentNeighbor(cur[0], cur[1], rows, cols);
    let neighborLength = neighbors.length;

    // save the parent of neighbors in case there is a dead end, thus displaying unconnected paths
    for (let i = 0; i < neighbors.length; i++) {
      saveParent[[neighbors[i][0], neighbors[i][1]]] = [cur[0], cur[1]];
    }

    // add neighbors onto the stack
    // note neighbor() returns in order: right, top, left, bottom
    // when added to stack via pop(), stack will be in reverse, so using pop() on stack will retrieve right, top, left, bottom
    while (neighbors.length > 0) {
      stack.push(neighbors.pop());
    }

    // if current cell is the end cell
    if (cur[0] === endCell[0] && cur[1] === endCell[1]) {
      found = true;
      if (wasDeadEnd) parent = saveParent[[cur[0], cur[1]]];
      shortestPath[[cur[0], cur[1]]] = parent;
    } else if (
      document.getElementById(cur[0] + "-" + cur[1]).className === "cell"
    ) {
      // use saved parent if previous cell path was a dead end to prevent path
      if (wasDeadEnd) {
        parent = saveParent[[cur[0], cur[1]]];
        wasDeadEnd = false;
      }

      shortestPath[[cur[0], cur[1]]] = parent;
      visitedOrder.push([cur[0], cur[1]]);

      // determines if current node is a dead end
      if (neighborLength !== 0) parent = [cur[0], cur[1]];
      else wasDeadEnd = true;

      document.getElementById(cur[0] + "-" + cur[1]).className = "cell visited";
    }
  } while (stack.length > 0 && !found);
}