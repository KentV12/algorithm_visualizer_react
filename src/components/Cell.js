const Cell = ({
  isStart,
  isEnd,
  isWall,
  id,
  handleMouseDown,
  handleMouseClick,
}) => {
  let className = "cell";

  if (isStart) className += " start";
  if (isEnd) className += " end";
  if (isWall) className += " wall";

  return (
    <div
      id={id}
      className={className}
      onMouseOver={() => handleMouseDown(id)}
      onMouseDown={() => handleMouseClick(id)}
    />
  );
};

export default Cell;
