import React from "react";

// packages
import { Container, Col, Row } from "react-bootstrap";

// styles
import "./layout.css";

const Layout = (props) => (
  <Container className="product-wrapper">
    <Row className="product-row">
      <Col lg={4} className="left">
        {props.left}
      </Col>
      <Col lg={5} className="mid">
        {props.mid}
      </Col>
      <Col lg={3} className="right">
        {props.right}
      </Col>
    </Row>
  </Container>
);

export default Layout;
