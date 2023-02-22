// import Grid from "./components/Grid";
import { useState } from "react";
import Cell from "./components/Cell";
import { BFS } from "./algorithms/BFS";
import { DFS } from "./algorithms/DFS";
import { Dijkstras } from "./algorithms/Dijkstras";
import { randomWeight } from "./algorithms/algoFunc";
import Navbar from "./components/Navbar";

function App() {
  const [wall, setWall] = useState(false);
  const [curAlgo, setAlgo] = useState("");

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
          document.getElementById(row + "-" + col).className = "cell";
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
          document.getElementById(row + "-" + col).className = "cell";
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

  // choose algorithm
  const selectAlgorithm = (selectedAlgo) => {
    console.log("selected algorithm: " + selectedAlgo);
    setAlgo(selectedAlgo);
  };

  const performAlgorithm = () => {
    if (curAlgo === "BFS") BFS(start, end, rows, cols);
    else if (curAlgo === "DFS") DFS(start, end, rows, cols);
    else if (curAlgo === "Dijkstras") Dijkstras(start, end, rows, cols);
  };

  return (
    <div>
      <div className="navbar navbar-expand-sm bg-dark" data-bs-theme="dark">
        <div className="container">
          <a href="#" className="navbar-brand">
            Pathfinding Visualizer
          </a>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item mx-2">
                <a href="#" className="nav-link">
                  Select Animation
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                >
                  Select Algorithm
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a
                      className="dropdown-item"
                      href={"#"}
                      onClick={() => selectAlgorithm("BFS")}
                    >
                      Breadth First Search
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      href="#"
                      onClick={() => selectAlgorithm("DFS")}
                    >
                      Depth First Search
                    </a>
                    <a
                      className="dropdown-item"
                      href="#"
                      onClick={() => selectAlgorithm("Dijkstras")}
                    >
                      Dijkstra's (weighted)
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="text-center">
        <Navbar />
        {/* <h1>Pathfinding Algorithm Visualizer</h1> */}
        <div className="my-4">
          <h4>
            Current Algorithm Supported:{" "}
            <span style={{ color: "orange" }}>Breadth-First Search, </span>
            <span style={{ color: "green" }}>Depth-First Search</span>
          </h4>
          <h4>
            Adding <span style={{ color: "brown" }}>Wall</span>: Click to enable
            wall and Hover to add. Click again to Stop.
          </h4>
        </div>

        {/* <label className="form-control">
          <input
            type={"radio"}
            name="algo"
            value={"BFS"}
            onChange={(e) => selectAlgorithm(e.target.value)}
          />
          Breadth First Search
        </label>

        <label className="form-control">
          <input
            type={"radio"}
            name="algo"
            value={"DFS"}
            onChange={(e) => selectAlgorithm(e.target.value)}
          />
          Depth First Search
        </label>

        <label className="form-control">
          <input
            type={"radio"}
            name="algo"
            value={"Dijkstras"}
            onChange={(e) => selectAlgorithm(e.target.value)}
          />
          Dijkstra's (weighted)
        </label> */}

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
        <button className="btn btn-success m-1" onClick={() => clearWall()}>
          Clear Wall
        </button>
        <button className="btn btn-success m-1" onClick={() => clearGrid()}>
          Clear Grid
        </button>
      </div>

      <div className="gridContainer" id="grid-container">
        {grid}
      </div>
    </div>
  );
}

export default App;
