import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="navbar navbar-dark bg-dark">
      <ul className="nav">
        <li className="nav-item">
          <NavLink className="nav-link text-white" to="/">
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link text-white" to="/timer">
            Timer
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link text-white" to="/stopwatch">
            Stopwatch
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link text-white" to="/clock">
            Clock
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
