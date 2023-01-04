const Cell = ({ row, col, isStart, isEnd, id }) => {
  let className = "cell";

  if (isStart) className += " start";
  if (isEnd) className += " end";
  // if (isWall) className += " wall";

  return <div id={id} className={className}></div>;
};

export default Cell;
