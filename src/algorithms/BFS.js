// let visitedOrder = [];
let shortestPath = [];

export function BFS(grid, start, end) {
  console.log(
    "we need to go from " +
      start[0] +
      "-" +
      start[1] +
      " to " +
      end[0] +
      "-" +
      end[1]
  );

  // implement algorithm and get visited order
  // we know grid size, where to start and end
  // keep track of visited order and parents of the current node

  // let tt = [];
  // tt.push(1);
  // tt.push(5);
  // tt.push(8);
  // let loou = tt.shift();
  // console.log(loou);
  // console.log(tt);

  // let cur = "";

  let queue = [];
  let neighbors = [];
  let cur = null;

  queue.push([start[0], start[1]]);

  let count = 0;
  let loopCount = 3;

  do {
    cur = queue.shift();
    neighbors = getNeighbors(cur);
    console.log("neighbors: " + neighbors);

    while (neighbors.length > 0) {
      let neighbor = neighbors.shift(); // get first neighbor from neighbors

      // pause to show algorithm path
      // setTimeout(() => {
      //   document.getElementById(neighbor[0] + "-" + neighbor[1]).className =
      //     "cell visited";
      // }, 100 * count); // seems like setTimeout only timeout once

      document.getElementById(neighbor[0] + "-" + neighbor[1]).className =
        "cell visited";

      count++;
      // shortestPath[(neighbor[0], neighbor[1])] = [cur[0], cur[1]];

      // console.log(
      //   "parent of " +
      //     neighbor[0] +
      //     "-" +
      //     neighbor[1] +
      //     " is " +
      //     cur[0] +
      //     "-" +
      //     cur[1]
      // );

      // add current neighbor to queue

      queue.push([neighbor[0], neighbor[1]]);

      // document.getElementById(neighbor[0] + "-" + neighbor[1]).className =
      //   "cell visited";
    }
    // loopCount--;
  } while (queue.length > 0 && loopCount !== 0);

  // shortestPath[(3, 3)] = [3, 2];
  // console.log(shortestPath[(3, 3)]);

  // console.log(queue);

  // const x = 0;
  // const y = 1;
  // let cur = "";
  // cur = x + "-" + y;
  // console.log(cur);

  // console.log(grid);
  // console.log(grid[0]);
  // const test = document.getElementById("0-0");
  // console.log(test.className);
  // test.className = "cell start";
}

function getNeighbors(cell) {
  // if (cell === null) return [];

  let neighbors = [];
  console.log("getting neighbors of " + cell[0] + "-" + cell[1]);

  const right = cell[1] + 1;
  const top = cell[0] - 1;
  const left = cell[1] - 1;
  const bottom = cell[0] + 1;

  // check right
  if (right <= 9) {
    if (document.getElementById(cell[0] + "-" + right).className === "cell")
      neighbors.push([cell[0], cell[1] + 1]);
  }
  // check top
  if (top >= 0) {
    if (document.getElementById(top + "-" + cell[1]).className === "cell")
      neighbors.push([top, cell[1]]);
  }
  // check left
  if (left >= 0) {
    if (document.getElementById(cell[0] + "-" + left).className === "cell")
      neighbors.push([cell[0], left]);
  }
  // check bottom
  if (bottom <= 9) {
    if (document.getElementById(bottom + "-" + cell[1]).className === "cell")
      neighbors.push([bottom, cell[1]]);
  }

  // // check right
  // if (cell[1] + 1 <= 9) {
  //   if (
  //     document.getElementById(cell[0] + "-" + (cell[1] + 1)).className ===
  //     "cell"
  //   )
  //     neighbors.push([cell[0], cell[1] + 1]);
  // }
  // // check top
  // if (cell[0] - 1 >= 0) {
  //   if (
  //     document.getElementById(cell[0] - 1 + "-" + cell[1]).className === "cell"
  //   )
  //     neighbors.push([cell[0] - 1, cell[1]]);
  // }
  // // check left
  // if (cell[1] - 1 >= 0) {
  //   if (
  //     document.getElementById(cell[0] + "-" + (cell[1] - 1)).className ===
  //     "cell"
  //   )
  //     neighbors.push([cell[0], cell[1] - 1]);
  // }
  // // check bottom
  // if (cell[0] + 1 <= 9) {
  //   if (
  //     document.getElementById(cell[0] + 1 + "-" + cell[1]).className === "cell"
  //   )
  //     neighbors.push([cell[0] + 1, cell[1]]);
  // }

  return neighbors;
}

// return shortest path by tracing from last cell
// export function shortestPath() {
//   console.log("shortin");
// }
