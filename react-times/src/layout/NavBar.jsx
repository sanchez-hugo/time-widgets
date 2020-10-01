import React from "react";
import { NavLink } from "react-router-dom";
import { useState } from "react";

const NavBar = () => {
  const [Toggle, setToggle] = useState(false);

  const onToggleClick = () => {
    setToggle(!Toggle);
  };

  return (
    <div className="container-fluid mt-3">
      {Toggle ? (
        <div className="navbar justify-content-center">
          <ul className="nav">
            <li className="nav-item">
              <NavLink
                className="h4 font-weight-light nav-link text-white"
                exact
                to="/"
                activeClassName="text-secondary"
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="h4 font-weight-light nav-link text-white"
                exact
                to="/timer"
                activeClassName="text-secondary"
              >
                Timer
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="h4 font-weight-light nav-link text-white"
                exact
                to="/stopwatch"
                activeClassName="text-secondary"
              >
                Stopwatch
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="h4 font-weight-light nav-link text-white"
                exact
                to="/clock"
                activeClassName="text-secondary"
              >
                Clock
              </NavLink>
            </li>
          </ul>
        </div>
      ) : null}
      <nav className="navbar navbar-dark justify-content-left">
        <button
          className="btn btn-sm navbar-toggler bg-dark"
          type="button"
          aria-label="Toggle navigation"
          onClick={onToggleClick}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
      </nav>
    </div>
  );
};

export default NavBar;
