import { adjacentNeighbor, validNeighbor } from "./algoFunc";

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

  return {
    visitedOrder: visitedOrder,
    shortestPath: shortestPath,
    found: found,
  };
}

function solve(row, col, rows, cols) {
  let stack = [];
  let parent = [row, col];
  let saveParent = []; // contains the parents of unvisited neighbor nodes in case of re-tracing during path dead end
  let visited = [];

  stack.push([row, col]); // add starting cell
  shortestPath[[row, col]] = "start";

  let wasDeadEnd = false;

  do {
    // take a neighbor
    let cur = stack.pop();

    if (visited[[cur[0], cur[1]]] !== true) {
      // finds the neighbor of this cell
      let neighbors = adjacentNeighbor(cur[0], cur[1], rows, cols);
      let neighborLength = unvisitedNeighbor(neighbors, visited);

      // let neightbor

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
        validNeighbor(document.getElementById(cur[0] + "-" + cur[1]).className)
        // === "cell empty"
      ) {
        // use saved parent if previous cell path was a dead end to prevent path
        if (wasDeadEnd) {
          parent = saveParent[[cur[0], cur[1]]];
          wasDeadEnd = false;
        }

        shortestPath[[cur[0], cur[1]]] = parent;
        visitedOrder.push([cur[0], cur[1]]);

        // determines if current node is a dead end
        if (neighborLength !== 0) {
          parent = [cur[0], cur[1]];
        } else {
          wasDeadEnd = true;
        }
      }
      visited[[cur[0], cur[1]]] = true;
    }
  } while (stack.length > 0 && !found);
}

function unvisitedNeighbor(neighbors, visited) {
  let count = 0;

  for (let i = 0; i < neighbors.length; i++) {
    let nRow = neighbors[i][0];
    let nCol = neighbors[i][1];

    if (visited[[nRow, nCol]] === false) {
      count++;
    }
  }

  return count;
}
