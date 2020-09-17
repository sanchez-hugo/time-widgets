import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="navbar justify-content-center">
      <ul className="nav">
        <li className="nav-item">
          <NavLink className="nav-link text-white" exact to="/" activeClassName="text-secondary">
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link text-white" exact to="/timer" activeClassName="text-secondary">
            Timer
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link text-white" exact to="/stopwatch" activeClassName="text-secondary">
            Stopwatch
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link text-white" exact to="/clock" activeClassName="text-secondary">
            Clock
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
