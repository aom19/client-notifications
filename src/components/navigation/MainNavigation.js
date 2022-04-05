import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import "./MainNavigation.css";

import { useSelector, useDispatch } from "react-redux";

import { logout } from "../../redux/actions/auth";

const MainNavigation = (props) => {
  const [showNavbar, setShowNavbar] = useState(false);

  const dispatch = useDispatch();

  const token = useSelector((state) => state.user);

  return (
    <nav
      className="navbar navbar-expand-lg nav-active myNavbar    "
      id="ftco-navbar"
      style={{ backgroundColor: "green" }}
    >
      <div class="container">
        <NavLink className="navbar-brand" to="/">
          L <span className="navbar-2logo">ABC</span>
        </NavLink>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#ftco-nav"
          aria-controls="ftco-nav"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => {
            setShowNavbar(!showNavbar);
          }}
        >
          <span class="oi oi-menu"></span> Menu
        </button>

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
              <NavLink className="nav-link" to="/contact">
                Contact
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/partners">
                Partners
              </NavLink>
            </li>

            {!token?.email ? (
              <li className="nav-item">
                <NavLink className="nav-link" to="/login">
                  Sign in
                </NavLink>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/admin">
                    Admin
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/list">
                    List Device
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="/"
                    onClick={() => dispatch(logout())}
                  >
                    Sign out
                  </NavLink>
                </li>
              </>
            )}

            {/* 
            <li className="nav-item">
              <NavLink className="nav-link" to="/auth">
                Sign in
              </NavLink>
            </li>

          

              <li className="nav-item">
                <NavLink className="nav-link" to="/">
                  Sign out
                </NavLink>
              </li>
              <li style={{ paddingTop: "15px" }} className="nav-item">
                <span style={{ fontSize: "20px", color: "#fff" }}>
                  Welcome ,
                  <span style={{ fontSize: "18px", color: "#01d28e" }}>
                    {" " + "Admin"}
                  </span>
                  <span style={{ fontSize: "18px", color: "#01d28e" }}></span>
                </span>
              </li> */}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default MainNavigation;
