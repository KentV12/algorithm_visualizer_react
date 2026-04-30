const Cell = ({
  isStart,
  isEnd,
  isWall,
  isVisited,
  isOuterScan,
  isPath,
  weight,
  id,
  handleMouseHover,
  handleMouseClick,
  handleMouseUp,
}) => {
  let className = "cell empty";

  if (weight > 0) className = `cell weight${weight}`;
  if (isWall) className = "cell wall";
  if (isVisited) className = "cell visitedPath"
  if (isOuterScan && weight === 0) {
    className = "cell empty outerScan"
  } else if (isOuterScan && weight > 0) {
    className = `cell weight${weight} outerScan`
  }
  if (isPath) className = "cell path"
  if (isStart) className = "cell start";
  if (isEnd) className = "cell end";
  

  return (
    <div
      id={id}
      className={className}
      onMouseOver={() => handleMouseHover(id)}
      onMouseDown={() => handleMouseClick(id)}
      onMouseUp={() => handleMouseUp()}
      onDragStart={(e) => e.preventDefault()} // fix issue with browser dragging
    />
  );
};

export default Cell;
