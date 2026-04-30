import { useState, useEffect, useRef } from "react";
import Cell from "./Cell";
import { DFS } from "../algorithms/DFS";
import { BFS } from "../algorithms/BFS";
import { Dijkstras } from "../algorithms/Dijkstras";
import { AStar } from "../algorithms/AStar";
import { isEnd } from "../algorithms/algoFunc";

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
        isVisited: false,
        isPath: false,
        weight: 0,
      });
    }

    newGrid.push(currentRow);
  }

  return newGrid;
};

const Grid = ({
  curAlgo, 
  curAnim,
  animationSignal,
  clearSignal,
  randomWeightSignal,
}) => {
  const [grid, setGrid] = useState(createInitialGrid());
  const [start, setStart] = useState([12, 15]);
  const [end, setEnd] = useState([12, 65]);
  const [mousePressed, setMousePressed] = useState(false);
  const [drag, setDrag] = useState(null);
  const timeoutIDs = useRef([]);

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
    clearAnimationTimeouts();

    setGrid((prevGrid) =>
      prevGrid.map((row) =>
        row.map((cell) => ({
          ...cell,
          isWall: false,
          isVisited: false,
          isPath: false,
          isOuterScan: false,
          weight: 0,
        }))
      )
    );

    setMousePressed(false);
    setDrag(null);
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

  const animateBothPath = (
    end,
    found,
    visitedOrder,
    shortestPath,
    animationType
  ) => {
    clearAnimationTimeouts();
    
    const timePerCell = 25;
    let delay = 0;

    visitedOrder.forEach(([row, col]) => {
      if (row === end[0] && col === end[1]) return;

      const timeoutId = setTimeout(() => {
        if (animationType === "Visited Path") {
          updateCell(row, col, { isVisited: true, isOuterScan: false });
        } else if (animationType === "Outer Scan") {
          updateCell(row, col, { isVisited: false, isOuterScan: true });
        }
      }, delay);

      timeoutIDs.current.push(timeoutId);
      delay += timePerCell;
    });
  
    let cur = shortestPath[[end[0], end[1]]];
    let pathArray = [];
  
    // if end cell is found
    if (found) {
      // while the parent cell of current cell is not the start
      while (shortestPath[[cur[0], cur[1]]] !== "start") {
        pathArray.push([cur[0], cur[1]]);
        cur = shortestPath[[cur[0], cur[1]]];
      }

      pathArray.reverse();

      const pathStartDelay = delay + 1000;

      pathArray.forEach(([row, col], index) => {
        const timeoutId = setTimeout(() => {
          updateCell(row, col, {
            isPath: true,
            isVisited: false,
          });
          console.log(document.getElementById(row + "-" + col).className);
        }, pathStartDelay + index * timePerCell);

        timeoutIDs.current.push(timeoutId);
      });
    }
  }

  const updateCell = (row, col, updates) => {
    setGrid((prevGrid) =>
      prevGrid.map((gridRow, r) =>
        gridRow.map((cell, c) =>
          r === row && c === col
            ? { ...cell, ...updates }
            : cell
        )
      )
    );
  };

  const clearAnimationTimeouts = () => {
    timeoutIDs.current.forEach(clearTimeout);
    timeoutIDs.current = [];
  };

  const randomWeight = () => {
    setGrid((prevGrid) =>
      prevGrid.map((row, rowIndex) =>
        row.map((cell, colIndex) => {
          const isStartCell = start[0] === rowIndex && start[1] === colIndex;
          const isEndCell = end[0] === rowIndex && end[1] === colIndex;

          if (isStartCell || isEndCell || cell.isWall) {
            return cell;
          }

          return {
            ...cell,
            weight: Math.floor(Math.random() * 3) + 1,
          };
        })
      )
    );
  };

  useEffect(() => {
    if (animationSignal === 0) return;
    console.log("animationSignal: " + animationSignal);
    performAlgorithm();
  }, [animationSignal]);

  useEffect(() => {
    if (clearSignal === 0) return;
    console.log("clearSignal: " + clearSignal);
    clearGrid();
  }, [clearSignal]);

  useEffect(() => {
    if (randomWeightSignal === 0) return;
    console.log("randomWeightSignal: " + randomWeightSignal);
    randomWeight();
  }, [randomWeightSignal]);

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
            isPath={cell.isPath}
            isVisited={cell.isVisited}
            isOuterScan={cell.isOuterScan}
            weight={cell.weight}
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
