import React from "react";
import { Link } from "react-router-dom";
import GoogleAuth from "./GoogleAuth";
import "./navstyle2.css";
const Header = () => {
  return (
    <div className="nav-bar-grid">
      <div className="logo">
        <Link to="/">
          <img
            src={require("./salsa_studio.png")}
            height="100px"
            width="100%"
            alt="Logo"
          />
        </Link>
      </div>
      <div className="menu-space"></div>

      <div className="menu-item">
        <Link to="/">
          <i className="fas fa-home fa-4x"></i>
        </Link>
      </div>

      <div className="login">
        <GoogleAuth />
      </div>
    </div>
  );
};

export default Header;
