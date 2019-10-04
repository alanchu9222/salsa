import React from "react";
import { Link } from "react-router-dom";
import GoogleAuth from "./GoogleAuth";
import "./navstyle.css";
const Header = () => {
  return (
    <div className="ui secondary pointing menu">
      <div className="ui navbar grid">
        <div className="seven wide column">
          <Link to="/">
            <img
              src={require("./salsa_studio.png")}
              height="100px"
              width="100%"
              alt=""
            />
          </Link>
        </div>
        <div className="three wide column">
          <img
            src={require("./salsa_studio_back.png")}
            height="100px"
            width="100%"
            alt=""
          />
        </div>

        <div className="three wide column">
          <div className="nav-button">
            <Link to="/">
              <img
                src={require("./salsa_studio_main.png")}
                height="100px"
                width="100%"
                alt=""
              />
            </Link>
          </div>
        </div>
        <div className="three wide column">
          <div className="menu nav-button">
            <GoogleAuth />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
