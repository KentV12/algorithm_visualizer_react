import { useState } from "react";

const Navbar = ({ selectAlgorithm }) => {
  const [navAlgorithm, setAlgorithm] = useState("Select Algorithm");
  const [navAnimation, setAnimation] = useState("Select Animation");

  const clickAlgorithm = (algorithm) => {
    setAlgorithm("Algorithm: " + algorithm);
    selectAlgorithm(algorithm);
  };

  const clickAnimation = (animation) => {
    setAnimation("Animation: " + animation);
  };

  return (
    <div>
      <div className="navbar navbar-expand-sm bg-dark" data-bs-theme="dark">
        <div className="container">
          <a className="navbar-brand" href="/">
            Pathfinding Visualizer
          </a>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item dropdown mx-2">
                <a
                  href="/"
                  className="nav-link dropdown-toggle"
                  data-bs-toggle="dropdown"
                  type="button"
                >
                  {navAnimation}
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => clickAnimation("Visited Path")}
                    >
                      Visited Path
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => clickAnimation("Outer Scan")}
                    >
                      Outer Scan
                    </button>
                  </li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <a
                  href="/"
                  className="nav-link dropdown-toggle"
                  data-bs-toggle="dropdown"
                  type="button"
                >
                  {navAlgorithm}
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => clickAlgorithm("BFS")}
                    >
                      Breadth First Search
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => clickAlgorithm("DFS")}
                    >
                      Depth First Search
                    </button>
                    <button
                      className="dropdown-item"
                      onClick={() => clickAlgorithm("Dijkstras")}
                    >
                      Dijkstra's (weighted)
                    </button>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
