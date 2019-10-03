import React from "react";
import { Link } from "react-router-dom";
import GoogleAuth from "./GoogleAuth";
const Header = () => {
  return (
    <div
      className="ui secondary pointing menu nav-bar"
      style={{ position: "relative" }}
    >
      <Link to="/">
        <img
          src={require("./salsa_studio.png")}
          height="100px"
          width="50%"
          alt=""
        />
        <img
          src={require("./salsa_studio_back.png")}
          height="100px"
          width="25%"
          alt=""
        />
        <img
          src={require("./salsa_studio_main.png")}
          height="100px"
          width="25%"
          alt=""
        />
      </Link>

      <div className="right menu ">
        <GoogleAuth />
      </div>
    </div>
  );
};

export default Header;
