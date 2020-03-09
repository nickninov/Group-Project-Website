import React from "react";

import { Container, Col, Row } from "react-bootstrap";

import "./layout.css";

export const Layout = props => (
  <div className="account-wrapper">
    <Container>
      <Row className="account-row">
        <Col lg={6} className="details">
          {props.left}
        </Col>
        <Col lg={6} className="orders">
          {props.right}
        </Col>
      </Row>
    </Container>
  </div>
);

export default Layout;
