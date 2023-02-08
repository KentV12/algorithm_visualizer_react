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
  let dist = []; // array contains the shortest distance from starting cell to any cell
  let prev = []; // array contains the parent of the cell that went to the current cell
  let queue = []; // a queue containing a cell and its weight

  // fill the dist array with
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      dist[[i, j]] = -1;
    }
  }

  queue.push([start[0], start[1]]);

  let count = 0;
  while (count < 1) {
    // get the cell with shortest path
    let node = queue.shift();
    let weight = nodeWeight(node[0], node[1]);

    // check and update distance
    // get neighbors
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
