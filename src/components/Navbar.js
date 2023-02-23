import { useState } from "react";

const Navbar = ({ selectAlgorithm }) => {
  const [navAlgorithm, setAlgorithm] = useState("Select Algorithm");

  const clickAlgorithm = (algorithm) => {
    setAlgorithm("Algorithm: " + algorithm);
    selectAlgorithm(algorithm);
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
                  Select Animation
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <button className="dropdown-item">(In Progress)</button>
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
