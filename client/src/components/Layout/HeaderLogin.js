import React from 'react';
import { Link } from 'react-router-dom';
import logo from "./../../data/logo.png";
import './HeaderLogin.css'; 

const HeaderLogin = () => {
  return (
    <>
      <nav className="headerLogin1 navbar">
        <div className="headerLogin2 container-fluid">
          {/* Logo without the collapsing section */}
          <Link to="/" className="headerLogin6 navbar-brand">
            <img src={logo} alt="SmartFix Logo" className="headerlogin-navbar-logo" />
          </Link>
        </div>
      </nav>
    </>
  );
};

export default HeaderLogin;