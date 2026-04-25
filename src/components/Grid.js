import { useState } from "react";
import Cell from "./Cell";
import { timeoutIDs } from "../algorithms/algoFunc";

const rows = 25;
const cols = 80;

const createInitialGrid = () => {
  const newGrid = [];

  for (let row = 0; row < rows; row++) {
    const currentRow = [];

    for (let col = 0; col < cols; col++) {
      currentRow.push({
        row,
        col,
        isWall: false,
      });
    }

    newGrid.push(currentRow);
  }

  return newGrid;
};

const Grid = (curAlgo, performAlgorithm) => {
  const [grid, setGrid] = useState(createInitialGrid());
  const [start, setStart] = useState([12, 15]);
  const [end, setEnd] = useState([12, 65]);
  const [mousePressed, setMousePressed] = useState(false);
  const [drag, setDrag] = useState(null);

  const handleMouseClick = (id) => {
    setMousePressed(true);

    const [rowStr, colStr] = id.split("-");
    const row = parseInt(rowStr, 10);
    const col = parseInt(colStr, 10);

    const isStart = row === start[0] && col === start[1];
    const isEnd = row === end[0] && col === end[1];

    if (isStart) {
      setDrag("start");
      return;
    } else if (isEnd) {
      setDrag("end");
      return;
    }

    setDrag("wall");
  };

  const handleMouseHover = (id) => {

    if (!mousePressed) return;

    const [rowStr, colStr] = id.split("-");
    const row = parseInt(rowStr, 10);
    const col = parseInt(colStr, 10);
    
    if (drag === "start") {
      if (end[0] === row && end[1] === col) return;
      setStart([row, col]);
      return;
    } else if (drag === "end") {
      if (start[0] === row && start[1] === col) return;
      setEnd([row, col]);
      return;
    }

    if (drag === "wall") {
      if (end[0] === row && end[1] === col) return;
      if (start[0] === row && start[1] === col) return;
      setWallAt(row, col, true);
    }

  };

  const handleMouseUp = () => {
    setMousePressed(false);
    setDrag(null);
  }

  const clearGrid = () => {
    setGrid((prevGrid) =>
      prevGrid.map((row) =>
        row.map((cell) => ({
          ...cell,
          isWall: false,
        }))
      )
    );

    while (timeoutIDs.length > 0) {
      clearTimeout(timeoutIDs.pop());
    }
  };

  const setWallAt = (row, col, value) => {
    setGrid(prev =>
      prev.map((r, i) =>
        r.map((cell, j) =>
          i === row && j === col
            ? { ...cell, isWall: value }
            : cell
        )
      )
    );
  };

  return (
    <div>
      {grid.map((row) =>
        row.map((cell) => (
          <Cell
            key={`${cell.row}-${cell.col}`}
            id={`${cell.row}-${cell.col}`}
            isStart={start[0] === cell.row && start[1] === cell.col}
            isEnd={end[0] === cell.row && end[1] === cell.col}
            isWall={cell.isWall}
            handleMouseHover={handleMouseHover}
            handleMouseClick={handleMouseClick}
            handleMouseUp={handleMouseUp}
          />
        ))
      )}
    </div>
  );
};

export default Grid;
