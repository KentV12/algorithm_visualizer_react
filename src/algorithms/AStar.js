let visitedOrder = [];
let shortestPath = [];
let found = false;

export function AStar(start, end, rows, cols) {
  solve(start, end, rows, cols);
}

function solve(start, end, rows, cols) {
  // open list - current neighbor nodes
  // closed list - contains nodes that are visited
  // for every node in open with lowest f cost:
  // calculate neighbor's g - distance from starting node
  // calculate neighbor's h (heuristics) - an estimated distance, not absolute
}
