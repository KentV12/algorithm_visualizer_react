import { adjacentNeighbor } from "./algoFunc";
import { animateBothPath } from "./algoFunc";

let visitedOrder = [];
let shortestPath = [];
let found = false;

export function Dijkstras(start, end, rows, cols) {
  console.log("in Dijkstras");
  solve(start, end, rows, cols);
}

function solve(start, end, rows, cols) {
  let dist = []; // array contains the shortest distance from starting node to any node
  let prev = []; // array contains the parent of the node that went to the current node
  let visited = []; // array contains whether a node has been visited at a certain index
  let queue = []; // a queue containing a node and its weight

  // fill the dist array with starting values
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      dist[[i, j]] = Infinity;
      visited[[i, j]] = false;
    }
  }

  queue.push([start[0], start[1]]);

  let count = 0;
  while (count < 1) {
    // get the cell with shortest path
    let node = queue.shift();
    let row = node[0];
    let col = node[1];

    let weight = nodeWeight(row, col);

    // skip if visited
    if (visited[[row, col]] === true) {
      continue;
    }

    // mark node as visited
    visited[[row, col]] = true;

    // get neighbors
    let neighbors = adjacentNeighbor(row, col, rows, cols);

    // check and update distance

    // add to queue
    count += 1;
  }
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

function orderedInsert(queue, distance) {
  // use splice to perform ordered insert
}
