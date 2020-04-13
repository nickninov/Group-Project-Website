import React from "react";

// packages
import { Container, Col, Row } from "react-bootstrap";

// styles
import "./layout.css";

export const Layout = (props) => (
  <div className="account-wrapper">
    <Container>
      <Row className="account-row">
        <Col lg={6} className="details">
          <h1 style={{ marginTop: 30, marginBottom: 20 }}>Details</h1>
          {props.details}
          <h1 style={{ marginTop: 60, marginBottom: 20 }}>Addresses</h1>
          {props.addresses}
        </Col>
        <Col lg={6} className="orders">
          <h1 style={{ marginTop: 30, marginBottom: 20 }}>Orders</h1>
          {props.orders}
        </Col>
      </Row>
    </Container>
  </div>
);

export default Layout;

