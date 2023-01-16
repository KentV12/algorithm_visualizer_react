// import Grid from "./components/Grid";
import { useState } from "react";
import Cell from "./components/Cell";
import { BFS } from "./algorithms/BFS";

function App() {
  const [wall, setWall] = useState(false);

  const grid = [];
  const rows = 12;
  const cols = 12;
  const start = [3, 3];
  const end = [8, 8];

  // reset grid
  const clearGrid = () => {
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        let name = document.getElementById(row + "-" + col).className;
        if (name !== "cell start" && name !== "cell end")
          document.getElementById(row + "-" + col).className = "cell";
      }
    }
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

  return (
    <div className="container">
      <h1>Pathfinding Algorithm Visualizer</h1>
      <h3>Create a grid to visualize</h3>
      <h3>Clear it to try again</h3>
      <h4>Current Algorithm Supported: Breadth-First Search</h4>

      <h4>
        Adding Wall: Click to enable wall and Hover to add. Click again to Stop.
      </h4>

      <button onClick={() => BFS(grid, start, end, rows, cols)} className="btn">
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
