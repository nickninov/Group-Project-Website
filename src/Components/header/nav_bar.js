import React from "react";
import { Nav, Navbar, Form, Col, Row, NavDropdown } from "react-bootstrap";
import logo from "../../assets/logo.png";
import { Categories } from "./categories";
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
      <Navbar.Brand href="/" className="navbar-brand">
        <img className="logo" src={logo} alt="Logo"></img>
      </Navbar.Brand>
      <div>
        <Col>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Form inline>
            <input className="searchbar-size" placeholder="Search" />
          </Form>
          <Row>
            <Categories className={b.button} />
          </Row>
        </Col>
      </div>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
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
              <NavDropdown title={props.message} id="collasible-nav-dropdown">
                <NavDropdown.Item onClick={account}>Account</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/checkout">{props.basketAmount}</Nav.Link>
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
export default NavBar;
