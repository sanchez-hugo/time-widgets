import React from "react";
import { NavLink } from "react-router-dom";
import { useState } from "react";

const NavBar = () => {
  const [Toggle, setToggle] = useState(false);

  const onToggleClick = () => {
    setToggle(!Toggle);
  };

  return (
    <div className="container-fluid pt-3 row">
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
      <ul className={Toggle ? "nav navbar" : "d-none"}>
        <li className="nav-item">
          <NavLink
            className="h4 font-weight-light nav-link text-white"
            exact
            to="/"
            activeClassName="text-info"
          >
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            className="h4 font-weight-light nav-link text-white"
            exact
            to="/clock"
            activeClassName="text-info"
          >
            Clock
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            className="h4 font-weight-light nav-link text-white"
            exact
            to="/timer"
            activeClassName="text-info"
          >
            Timer
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            className="h4 font-weight-light nav-link text-white"
            exact
            to="/stopwatch"
            activeClassName="text-info"
          >
            Stopwatch
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
