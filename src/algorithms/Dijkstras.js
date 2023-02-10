import { adjacentNeighbor } from "./algoFunc";
import { animateBothPath } from "./algoFunc";

let visitedOrder = [];
let shortestPath = [];
let found = false;
let queue = [];

export function Dijkstras(start, end, rows, cols) {
  console.log("in Dijkstras");
  solve(start, end, rows, cols);
  animateBothPath(end, found, visitedOrder, shortestPath);
  console.log(visitedOrder);
}

function solve(start, end, rows, cols) {
  let dist = []; // array contains the shortest distance from starting node to any node
  let prev = []; // array contains the parent of the node that went to the current node
  let visited = []; // array contains whether a node has been visited at a certain index
  let queue = []; // a queue containing a node and its distance from the start node

  // fill the dist array with starting values
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      dist[[i, j]] = Infinity;
      visited[[i, j]] = false;
    }
  }

  queue.push([start[0], start[1], 0]);

  let count = 0;
  while (count < 100) {
    // get the cell with shortest path
    let node = queue.shift();
    let row = node[0];
    let col = node[1];
    let curDist = node[2];
    let weight = nodeWeight(row, col);

    // skip if visited
    if (visited[[row, col]] === true) {
      continue;
    }

    if (row !== start[0] || col !== start[1]) visitedOrder.push([row, col]);

    // mark node as visited
    visited[[row, col]] = true;

    if (dist[[row, col]] > curDist) dist[[row, col]] = curDist;

    // get neighbors
    let neighbors = adjacentNeighbor(row, col, rows, cols);

    while (neighbors.length > 0) {
      let neighbor = neighbors.shift();
      let nRow = neighbor[0];
      let nCol = neighbor[1];
      let nWeight = nodeWeight(nRow, nCol);

      // skip if visited
      if (visited[[nRow, nCol]] === true) continue;

      // check and update distance
      let newDist = curDist + nWeight;
      if (dist[[nRow, nCol]] > newDist) {
        dist[[nRow, nCol]] = newDist;
        orderedInsert(queue, neighbor, newDist); // add to queue
      }
    }

    count += 1;
  }

  // console.log(queue);
}

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

// insert based on the distance from lowest to highest
function orderedInsert(queue, neighbor, distance) {
  let index = 0;
  let row = neighbor[0];
  let col = neighbor[1];

  while (index < queue.length && distance >= queue[index][2]) {
    index += 1;
  }

  queue.splice(index, 0, [row, col, distance]);
}
