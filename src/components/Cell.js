const Cell = ({
  isStart,
  isEnd,
  isWall,
  id,
  handleMouseHover,
  handleMouseClick,
  handleMouseUp,
}) => {
  let className = "cell empty";

  if (isWall) className = "cell wall";
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
