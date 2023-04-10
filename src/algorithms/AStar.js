import { adjacentNeighbor } from "./algoFunc";

let visitedOrder = [];
let shortestPath = [];
let found = false;

export function AStar(start, end, rows, cols) {
  // reset values
  visitedOrder = [];
  shortestPath = [];
  found = false;

  solve(start, end, rows, cols);

  shortestPath[[start[0], start[1]]] = "start";

  return {
    visitedOrder: visitedOrder,
    shortestPath: shortestPath,
    found: found,
  };
}

function solve(start, end, rows, cols) {
  let open = []; // contains nodes to be visited. Sorted from lowest to highest f value
  let closed = []; // contains nodes that are visited
  let fList = []; // contains the parent distance and estimated cost from the end

  // fill the dist array with starting values
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      closed[[i, j]] = false;
      fList[[i, j]] = [Infinity, Infinity];
    }
  }

  // prepare the first node to start algorithm
  open.push(start);
  fList[start][0] = 0; // distance from start
  fList[start][1] = Math.abs(start[0] - end[0]) + Math.abs(start[1] - end[1]); // initialize heuristics for getLowest()

  while (open.length > 0 && !found) {
    let cur = getLowest(open, fList); // retrieve the node with the lowest f-value
    let row = cur[0];
    let col = cur[1];

    let neighbors = adjacentNeighbor(row, col, rows, cols);
    closed[cur] = true;

    if (row !== start[0] || col !== start[1]) visitedOrder.push(cur);

    // go through each neighbor
    while (neighbors.length > 0) {
      let neighbor = neighbors.shift();
      let nRow = neighbor[0];
      let nCol = neighbor[1];

      // if goal, stop
      if (nRow === end[0] && nCol === end[1]) {
        found = true;
        shortestPath[neighbor] = cur;
        break;
      }

      // if visited, skip
      if (closed[neighbor] === true) continue;

      // else, compute f value
      let parentDist = fList[cur][0]; // distance to parent
      let heuristics = Math.abs(nRow - end[0]) + Math.abs(nCol - end[1]); // estimated cost from end

      let fValue = parentDist + heuristics; // f-value of this neighbor

      // look through current open list to determine if neighbor is in open
      let inOpen = false;
      for (let i = 0; i < open.length; i++) {
        let node = open[i];
        if (node[0] === nRow && node[1] === nCol) {
          inOpen = true;
        }
      }

      // if neighbor is not in open or computed f-value is lower
      if (fValue < fList[neighbor][0] + fList[neighbor][1]) {
        if (!inOpen) open.push(neighbor);
        fList[neighbor][0] = parentDist + nodeWeight(nRow, nCol);
        fList[neighbor][1] = heuristics;
        shortestPath[neighbor] = cur;
      }
    }
  }
}

// returns the node with the lowest f-value
function getLowest(open, fList) {
  let prevValue = Infinity;
  let index = 0;

  // find the index of the node with lowest f-value
  for (let i = 0; i < open.length; i++) {
    let node = open[i];

    let parentDist = fList[node][0];
    let heuristics = fList[node][1];

    let newValue = parentDist + heuristics;

    if (newValue < prevValue) {
      prevValue = newValue;
      index = i;
    }
  }

  // remove node from open list
  let lowestNode = open.splice(index, 1)[0];

  return lowestNode;
}

// returns the weight of node
function nodeWeight(row, col) {
  let nodeName = document.getElementById(row + "-" + col).className;

  if (nodeName === "cell weight1") {
    return 1;
  } else if (nodeName === "cell weight2") {
    return 2;
  } else if (nodeName === "cell weight3") {
    return 3;
  } else {
    return 0;
  }
}
