// import Grid from "./components/Grid";
import { useState } from "react";
import Cell from "./components/Cell";
import { BFS } from "./algorithms/BFS";
import { DFS } from "./algorithms/DFS";
import { Dijkstras } from "./algorithms/Dijkstras";
import { animateBothPath, randomWeight } from "./algorithms/algoFunc";
import Navbar from "./components/Navbar";

function App() {
  const [wall, setWall] = useState(false);
  const [curAlgo, setAlgo] = useState("");
  const [curAnim, setAnim] = useState("");

  const grid = [];
  const rows = 13;
  const cols = 40;
  const start = [6, 3];
  const end = [6, 36];

  // reset grid
  const clearGrid = () => {
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        let name = document.getElementById(row + "-" + col).className;
        if (name !== "cell wall")
          document.getElementById(row + "-" + col).className = "cell empty";
      }
    }

    document.getElementById(start[0] + "-" + start[1]).className = "cell start";
    document.getElementById(end[0] + "-" + end[1]).className = "cell end";
  };

  // enable wall
  const onMouseClick = (id) => {
    setWall(!wall);

    const name = document.getElementById(id).className;
    if (name !== "cell start" && name !== "cell end")
      document.getElementById(id).className = "cell wall";
  };

  const clearWall = () => {
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        let name = document.getElementById(row + "-" + col).className;
        if (name === "cell wall")
          document.getElementById(row + "-" + col).className = "cell empty";
      }
    }
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
        <div className="py-4">
          <h4>
            Adding <span style={{ color: "brown" }}>Wall</span>: Click to enable
            wall and Hover to add. Click again to Stop.
          </h4>
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
        <button className="btn btn-primary m-1" onClick={() => clearWall()}>
          Clear Wall
        </button>
        <button className="btn btn-primary m-1" onClick={() => clearGrid()}>
          Clear Grid
        </button>
      </div>

      <div className="container mt-5" style={{ fontSize: 0 }}>
        {grid}
      </div>

      {/* <div className="gridContainer" id="grid-container">
        {grid}
      </div> */}
    </div>
  );
}

export default App;
