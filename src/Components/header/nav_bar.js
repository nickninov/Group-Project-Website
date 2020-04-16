import React from "react";

// components
import { Categories } from "./categories";
import SearchForm from "../search/search_form";

// packages
import { Nav, Navbar, Form, Col, Row, NavDropdown } from "react-bootstrap";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";

// assets
import logo from "../../assets/logo.png";

// styles
import b from "./categories.css";
import s from "./nav_bar.css";
import "mdbreact/dist/css/mdb.css";

// create two different div after navBrand and before Nav, with row and coloumn structure
export function NavBar(props) {
  function account() {
    props.history.push("/account");
  }

  function logout() {
    props.logout();
  }

  return (
    <Navbar className={s.navbar} expand="lg" sticky="top">
      {/* logo */}
      <Navbar.Brand href="/" className="navbar-brand">
        <img className="logo" src={logo} alt="Logo"></img>
      </Navbar.Brand>
      <div id="header-mid">
        <Col>
            {/* search */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <SearchForm history={props.history} />
          <Row
            style={{ display: "flex", justifyContent: "center", marginTop: 10 }}
          >
            {/* ategories */}
            <Categories className={b.button} category={props.category} />
          </Row>
        </Col>
      </div>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          {/* account with login/register dropdown */}
          <Nav.Item>
            {props.message === "Account" ? (
              <NavDropdown title="Account" id="collasible-nav-dropdown">
                <NavDropdown.Item onClick={() => props.history.push("/login")}>
                  Login
                </NavDropdown.Item>
                <NavDropdown.Item
                  onClick={() => props.history.push("/register")}
                >
                  Register
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <NavDropdown title={props.message} id="collasible-nav-dropdown">
                  <NavDropdown.Item onClick={account}>Account</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                </NavDropdown>
                <KeyboardArrowDownIcon
                  style={{ marginLeft: -10, marginRight: 10 }}
                />
              </div>
            )}
          </Nav.Item>
          {/* cart */}
          <Nav.Item>
            <Nav.Link href="/checkout">{props.basketAmount}</Nav.Link>
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
export default NavBar;
