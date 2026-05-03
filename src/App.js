// import Grid from "./components/Grid";
import { useState } from "react";
import Grid from "./components/Grid";
import Navbar from "./components/Navbar";

function App() {
  const [curAlgo, setAlgo] = useState("BFS");
  const [curAnim, setAnim] = useState("Visited Path");

  const [animationSignal, setAnimationSignal] = useState(0);
  const [clearSignal, setClearSignal] = useState(0);
  const [randomWeightSignal, setRandomWeightSignal] = useState(0);

  // choose animation
  const selectAnimation = (selectedAnim) => {
    setAnim(selectedAnim);
  };

  // choose algorithm
  const selectAlgorithm = (selectedAlgo) => {
    setAlgo(selectedAlgo);
  };

  return (
    <div>
      <div className="text-center">
        <Navbar
          selectAlgorithm={selectAlgorithm}
          selectAnimation={selectAnimation}
        />
        <div className="mt-4">
          <h3 className="fw-bold">Tutorial</h3>
        </div>

        <div className="col-md-4 mx-auto text-start mb-4">
          <h5>1. Select algorithm and animation type in the top right menu</h5>
          <h5>2. Add/Randomize weight (if supported by algorithm)</h5>
          <h5>3. Click and drag endpoints to move or non-endpoints to add wall.</h5>
        </div>

        <button
          className="btn btn-success m-1"
          onClick={() => setAnimationSignal((n) => n + 1)}
        >
          Visualize
        </button>
        <button
          className="btn btn-success m-1"
          onClick={() => setRandomWeightSignal((n) => n + 1)}
        >
          Randomize Weight
        </button>
        <button 
          className="btn btn-primary m-1" 
          onClick={() => setClearSignal((n) => n + 1)}>
          Clear
        </button>
      </div>

      <div className="container-fluid mt-5" style={{ fontSize: 0 }}>
        <Grid 
          curAlgo={curAlgo} 
          curAnim={curAnim}
          animationSignal={animationSignal}
          clearSignal={clearSignal}
          randomWeightSignal={randomWeightSignal}
        />
      </div>
    </div>
  );
}

export default App;
