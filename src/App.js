// import Grid from "./components/Grid";
import { useState } from "react";
import Cell from "./components/Cell";
import { BFS } from "./algorithms/BFS";
import { DFS } from "./algorithms/DFS";

function App() {
  const [wall, setWall] = useState(false);
  const [curAlgo, setAlgo] = useState("");

  const grid = [];
  const rows = 11;
  const cols = 25;
  const start = [5, 3];
  const end = [5, 21];

  // reset grid
  const clearGrid = () => {
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        let name = document.getElementById(row + "-" + col).className;
        if (
          name === "cell path" ||
          name === "cell visitedColor" ||
          name === "cell wall"
        )
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
  };

  return (
    <div className="container">
      <h1>Pathfinding Algorithm Visualizer</h1>
      <h4>
        Current Algorithm Supported:{" "}
        <span style={{ color: "orange" }}>Breadth-First Search, </span>
        <span style={{ color: "green" }}>Depth-First Search</span>
      </h4>

      <label className="form-control">
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

      <h4>
        Adding <span style={{ color: "brown" }}>Wall</span>: Click to enable
        wall and Hover to add. Click again to Stop.
      </h4>

      <button onClick={() => performAlgorithm()} className="btn">
        Visualize
      </button>
      <button className="btn" onClick={() => clearGrid()}>
        Clear Grid
      </button>
      <div
        className="gridContainer"
        id="grid-container"
        style={{
          maxWidth: `${50 * cols}px`, // template literal
          maxHeight: `${50 * rows}px`,
        }}
      >
        {grid}
      </div>
    </div>
  );
}

export default App;
