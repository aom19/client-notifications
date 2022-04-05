import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import "./MainNavigation.css";

const MainNavigation = (props) => {
  const [showNavbar, setShowNavbar] = useState(false);

  return (
    <nav
      className="navbar navbar-expand-lg nav-active myNavbar    "
      id="ftco-navbar"
      style={{ backgroundColor: "red" }}
    >
      <div class="container">
        <NavLink className="navbar-brand" to="/">
          L <span className="navbar-2logo">ABC</span>
        </NavLink>

        <div
          class={`collapse navbar-collapse ${showNavbar ? "show" : ""} `}
          id="ftco-nav"
        >
          <ul class="navbar-nav ml-auto">
            <li className="nav-item ">
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item ">
              <NavLink className="nav-link" to="/list">
                ListDevice
              </NavLink>
            </li>
            <li className="nav-item ">
              <NavLink className="nav-link" to="/create">
                Create Device
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default MainNavigation;
