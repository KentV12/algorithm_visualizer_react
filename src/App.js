// import Grid from "./components/Grid";
import { useState } from "react";
import Cell from "./components/Cell";
import { BFS } from "./algorithms/BFS";

function App() {
  const [grid, setGrid] = useState([]);

  const rows = 12;
  const cols = 12;
  let start = [5, 0];
  let end = [7, 8];

  const createGrid = () => {
    let placeholderGrid = [];
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const isStart = row === start[0] && col === start[1];
        const isEnd = row === end[0] && col === end[1];
        // need a placeholder or else every time we use setGrid to push to the original grid; the component will re-render
        placeholderGrid.push(
          <Cell
            id={`${row}-${col}`}
            key={[row, col]}
            isStart={isStart}
            isEnd={isEnd}
          />
        );
      }
    }

    setGrid(placeholderGrid);
  };

  return (
    <div className="container">
      <h1>Pathfinding Algorithm Visualizer</h1>
      <h3>Create a grid to visualize</h3>
      <h3>Clear it to try again</h3>
      <button className="btn" onClick={() => createGrid()}>
        Create Grid
      </button>
      <button onClick={() => BFS(grid, start, end, rows, cols)} className="btn">
        Visualize
      </button>
      <button className="btn" onClick={() => setGrid([])}>
        Clear Grid
      </button>

      <div
        className="gridContainer"
        style={{
          maxWidth: `${50 * cols}px`, // template literal
          maxHeight: `${50 * rows}px`,
          outline: "1px solid black",
        }}
      >
        {grid}
      </div>
    </div>
  );
}

export default App;
