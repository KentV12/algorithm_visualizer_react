const Cell = ({
  isStart,
  isEnd,
  isWall,
  id,
  handleMouseDown,
  handleMouseClick,
}) => {
  let className = "cell empty";

  if (isStart) className = "cell start";
  if (isEnd) className = "cell end";
  if (isWall) className = "cell wall";

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
