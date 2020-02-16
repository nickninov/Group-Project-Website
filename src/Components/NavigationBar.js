import React from 'react';
import { Nav, Navbar, Button, Form, FormControl } from 'react-bootstrap';
import s from './NavigationBar.css';
import logo from '../assets/logo.png';

export const NavigationBar = () => (
    <Navbar className="s.navbar"
    expand="lg"
    sticky="top">
        <Navbar.Brand href="/" className="navbar-brand">
            <img className="logo"src={logo}></img>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
            <Form inline>
                <input className="searchbar-size" placeholder="Search" />
            </Form>
            <Nav className="ml-auto">
                <Nav.Item><Nav.Link href="/account">Account</Nav.Link></Nav.Item>
                <Nav.Item><Nav.Link href="/basket">Basket</Nav.Link></Nav.Item>
                <Button>
                    <Nav.Item><Nav.Link href="/results">Results</Nav.Link></Nav.Item>
                </Button>
                <Button>
                    <Nav.Item><Nav.Link href="/product">Product</Nav.Link></Nav.Item>
                </Button>
            </Nav>
        </Navbar.Collapse>
    </Navbar>
)