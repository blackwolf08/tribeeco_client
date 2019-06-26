import React from "react";

import Navbar from "react-bootstrap/Navbar";

import logo from "../../assets/logo.png";

const NavBar = () => (
  <Navbar bg="light" expand="lg" className="navbar-out py-3">
    <div className="container">
      <Navbar.Brand
        href="/"
        className="font-weight-bold text-uppercase"
      >
        <img src={logo} alt="logo" style={{ width: "60px" }} />
        <span className="ml-3">Tribeeco</span>
      </Navbar.Brand>
    </div>
  </Navbar>
);
export default NavBar;
