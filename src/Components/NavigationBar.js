import React from 'react';
import { Nav, Navbar, Button, Form, Col, Row } from 'react-bootstrap';
import s from './NavigationBar.css';
import logo from '../assets/logo.png';
import { Categories } from '../Container/Categories';
import b from '../Container/Categories.css';
import 'mdbreact/dist/css/mdb.css';
// create two different div after navBrand and before Nav, with row and coloumn structure

export const NavigationBar = () => (
    <Navbar className={s.navbar}
    expand="lg"
    sticky="top">
        <Navbar.Brand href="/" className="navbar-brand">
            <img className="logo"src={logo}></img>
        </Navbar.Brand>
        <div>
            <Col>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Form inline>
                        <input className="searchbar-size" placeholder="Search" />
                    </Form>
                        <Row>
                        <Categories className={b.button}/>
                        </Row>
                </Col>
        </div>
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
                    <Nav.Item><Nav.Link href="/account">Login</Nav.Link></Nav.Item>
                    <Nav.Item><Nav.Link href="/basket">Basket</Nav.Link></Nav.Item>
                    <Nav.Item><Nav.Link href="/results">Products</Nav.Link></Nav.Item>
                
            </Nav>
        </Navbar.Collapse>
    </Navbar>
)