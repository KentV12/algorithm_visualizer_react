// import Grid from "./components/Grid";
import { useState } from "react";
import Cell from "./components/Cell";
import { BFS } from "./algorithms/BFS";
import { DFS } from "./algorithms/DFS";
import { Dijkstras } from "./algorithms/Dijkstras";
import { animateBothPath, randomWeight } from "./algorithms/algoFunc";
import Navbar from "./components/Navbar";
import { AStar } from "./algorithms/AStar";
import { timeoutIDs } from "./algorithms/algoFunc";

function App() {
  const [wall, setWall] = useState(false);
  const [curAlgo, setAlgo] = useState("BFS");
  const [curAnim, setAnim] = useState("Visited Path");

  const grid = [];
  const rows = 25;
  const cols = 80;
  const start = [12, 15]; // starting node
  const end = [12, 65]; // destination node

  // enable wall
  const onMouseClick = (id) => {
    setWall(!wall);

    const name = document.getElementById(id).className;
    if (name !== "cell start" && name !== "cell end")
      document.getElementById(id).className = "cell wall";
  };

  const clearGrid = () => {
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        let name = document.getElementById(row + "-" + col).className;
        if (name !== "cell start" && name !== "cell end") {
          document.getElementById(row + "-" + col).className = "cell empty";
        }
      }
    }

    while (timeoutIDs.length > 0) {
      clearTimeout(timeoutIDs.pop());
    }

    setWall(false);
  };

  // when hovering and wall is enabled
  const handleMouseDown = (id) => {
    const name = document.getElementById(id).className;

    if (wall)
      if (name !== "cell start" && name !== "cell end")
        document.getElementById(id).className = "cell wall";
  };

  // create grid
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const isStart = row === start[0] && col === start[1];
      const isEnd = row === end[0] && col === end[1];
      grid.push(
        <Cell
          id={`${row}-${col}`}
          key={[row, col]}
          isStart={isStart}
          isEnd={isEnd}
          isWall={false}
          handleMouseDown={handleMouseDown}
          handleMouseClick={onMouseClick}
        />
      );
    }
  }

  // choose animation
  const selectAnimation = (selectedAnim) => {
    setAnim(selectedAnim);
  };

  // choose algorithm
  const selectAlgorithm = (selectedAlgo) => {
    setAlgo(selectedAlgo);
  };

  const performAlgorithm = () => {
    let dict = null;

    if (curAlgo === "BFS") dict = BFS(start, end, rows, cols);
    else if (curAlgo === "DFS") dict = DFS(start, end, rows, cols);
    else if (curAlgo === "Dijkstras") dict = Dijkstras(start, end, rows, cols);
    else if (curAlgo === "A*") dict = AStar(start, end, rows, cols);

    if (curAlgo !== "" && curAnim !== "")
      animateBothPath(
        end,
        dict["found"],
        dict["visitedOrder"],
        dict["shortestPath"],
        curAnim
      );
  };

  return (
    <div>
      <div className="text-center">
        <Navbar
          selectAlgorithm={selectAlgorithm}
          selectAnimation={selectAnimation}
        />
        <div className="mt-4">
          <h3 className="fw-bold">Tutorial</h3>
        </div>

        <div className="col-md-4 mx-auto text-start mb-4">
          <h5>1. Select algorithm and animation type in the top right menu</h5>
          <h5>2. Add/Randomize weight (if supported by algorithm)</h5>
          <h5>
            Adding <span style={{ color: "brown" }}>Wall</span>: click any node
            to enable wall and hover to add. Click again to Stop.
          </h5>
        </div>

        <button
          onClick={() => performAlgorithm()}
          className="btn btn-success m-1"
        >
          Visualize
        </button>
        <button
          className="btn btn-success m-1"
          onClick={() => randomWeight(rows, cols)}
        >
          Randomize Weight
        </button>
        <button className="btn btn-primary m-1" onClick={() => clearGrid()}>
          Clear
        </button>
      </div>

      <div className="container-fluid mt-5" style={{ fontSize: 0 }}>
        {grid}
      </div>
    </div>
  );
}

export default App;
