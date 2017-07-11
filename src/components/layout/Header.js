import React from "react";
import { Navbar } from "react-bootstrap";

function Header() {
  return (
    <Navbar fixedTop fluid style={navbarStyle}>
      <Navbar.Header>
        <h3 style={headerStyle}>
          FinPro
        </h3>
      </Navbar.Header>
    </Navbar>
  );
}

const navbarStyle = {
  background: "black",
  padding: "0",
  margin: "0",
  minHeight: "40px",
  zIndex: -1
};
const headerStyle = {
  color: "white",
  textAlign: "center",
  background: "black",
  padding: "5px 0px",
  margin: "0"
};

export default Header;
