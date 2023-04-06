import { adjacentNeighbor } from "./algoFunc";

let visitedOrder = [];
let shortestPath = [];
let found = false;

export function AStar(start, end, rows, cols) {
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

  // let test = open.splice(0, 1)[0];
  // let test = open.pop();
  // let test = getLowest(open, fList);
  // console.log("row " + test[0]);
  // console.log("col " + test[1]);

  // fill the dist array with starting values
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      closed[[i, j]] = false;
      fList[[i, j]] = [Infinity, Infinity];
    }
  }

  open.push([start[0], start[1]]);
  fList[[start[0], start[1]]][0] = 0;
  fList[[start[0], start[1]]][1] =
    Math.abs(start[0] - end[0]) + Math.abs(start[1] - end[1]); // initialize heuristics for getLowest()

  // getLowest() test case - should return the node with lowest f-value
  // open.push([11, 13]);
  // open.push([12, 13]);
  // fList[[11, 13]] = 19;
  // fList[[12, 13]] = 20;

  // let count = 5;
  while (open.length > 0 && !found) {
    // while (count > 0) {
    // count--;
    let cur = getLowest(open, fList); // retrieve the node with the lowest f-value
    let row = cur[0];
    let col = cur[1];

    let neighbors = adjacentNeighbor(row, col, rows, cols);
    closed[[row, col]] = true;

    if (row !== start[0] || col !== start[1]) visitedOrder.push([row, col]);

    // console.log("cur node: " + cur);
    // console.log("cur row: " + cur[0]);
    // console.log("cur col: " + cur[1]);
    // console.log("neighbors length: " + neighbors.length);

    // console.log("neighbors: " + neighbors);

    // for each neighbor
    while (neighbors.length > 0) {
      let neighbor = neighbors.shift();
      let nRow = neighbor[0];
      let nCol = neighbor[1];

      // console.log("neighbor: " + neighbor);

      // if goal, stop
      if (nRow === end[0] && nCol === end[1]) {
        console.log("found");
        found = true;
        shortestPath[[nRow, nCol]] = cur;
        break;
      }

      // if visited, skip
      if (closed[[nRow, nCol]] === true) continue;

      // else, compute f value
      let parentDist = fList[[row, col]][0]; // distance to parent
      let heuristics = Math.abs(nRow - end[0]) + Math.abs(nCol - end[1]); // estimated cost from end

      let fValue = parentDist + heuristics; // f-value of this neighbor
      // console.log(fValue);

      // look through current open list to determine if neighbor is in open
      let inOpen = false;
      for (let i = 0; i < open.length; i++) {
        let node = open[i];
        if (node[0] === nRow && node[1] === nCol) {
          inOpen = true;
          // console.log("found node in open list");
        }
      }

      if (!inOpen) {
        // add to open list and f-value list
        open.push(neighbor);
        fList[[nRow, nCol]][0] = parentDist;
        fList[[nRow, nCol]][1] = heuristics;
        shortestPath[[nRow, nCol]] = cur;
      } else {
        // check f-value and adjust f-value and parent if new f-value is lower
        if (fValue < fList[[nRow, nCol]][0] + fList[[nRow, nCol]][1]) {
          fList[[nRow, nCol]][0] = parentDist;
          fList[[nRow, nCol]][1] = heuristics;
          shortestPath[[nRow, nCol]] = cur;
        }
      }
    }
  }

  // console.log("open list: " + open);
  // console.log("closed list: " + closed);
  // console.log(shortestPath);

  // for every node in open with lowest f cost:
  // calculate neighbor's g - distance from starting node
  // calculate neighbor's h (heuristics) - an estimated distance, not absolute

  // console.log(fVal);
}

// returns the node with the lowest f-value
function getLowest(open, fList) {
  let prevValue = Infinity;
  let index = 0;

  // find the index of the node with lowest f-value
  for (let i = 0; i < open.length; i++) {
    let node = open[i];

    let parentDist = fList[[node[0], node[1]]][0];
    let heuristics = fList[[node[0], node[1]]][1];

    let newValue = parentDist + heuristics;

    if (newValue < prevValue) {
      prevValue = newValue;
      index = i;
    }
  }

  // remove node from open list
  let lowestNode = open.splice(index, 1)[0];

  // console.log("lowest node: " + lowestNode);

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
