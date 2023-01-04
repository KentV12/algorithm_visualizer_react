import React from "react";
import Cell from "./Cell";

const Grid = ({ rows, columns, start, end }) => {
  // const data = new Array[row, column];

  // <div className="gridContainer">
  //   <div className="grid" />
  //   <div className="grid" />
  //   <div className="grid" />
  //   <div className="grid" />
  //   <div className="grid" />
  //   {Array(25)
  //     .fill()
  //     .map((_, i) => (
  //       <div key={i} className="grid"></div>
  //     ))}
  // </div>;

  const cells = [];

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < columns; col++) {
      const isStart = row === start[0] && col === start[1];
      const isEnd = row === end[0] && col === end[1];

      cells.push(<Cell key={[row, col]} isStart={isStart} isEnd={isEnd} />);
    }
  }

  return <div className="gridContainer">{cells}</div>;
};

export default Grid;
