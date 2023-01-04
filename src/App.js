// import Grid from "./components/Grid";
import Cell from "./components/Cell";
import { BFS } from "./algorithms/BFS";

function App() {
  // button to visualize depending on selected algorithm?
  // create a grid
  // should have functions here?

  let grid = [];
  const start = [3, 2];
  const end = [5, 7];

  // animate function - go through shortest path and change grid accordingly
  // const BFS = () => {
  //   // need shortest path and visited nodes taken
  //   console.log("bfs");
  //   alert("bfs");
  // };

  for (let row = 0; row < 10; row++) {
    for (let col = 0; col < 10; col++) {
      const isStart = row === start[0] && col === start[1];
      const isEnd = row === end[0] && col === end[1];

      grid.push(
        <Cell
          id={`${row}-${col}`}
          key={[row, col]}
          isStart={isStart}
          isEnd={isEnd}
        />
      );
    }
  }

  // function to send to change into wall via documentGetId?

  return (
    <div className="container">
      <h1>Hello, World!</h1>
      <p>this some text from paragraph</p>
      <button onClick={() => BFS(grid, start, end)} className="btn">
        Visualize
      </button>
      {/* <Grid rows={10} columns={10} start={[3, 2]} end={[5, 7]} /> */}

      <div className="gridContainer">{grid}</div>
    </div>
  );
}

export default App;
