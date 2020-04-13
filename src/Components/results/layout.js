import React from "react";

// packages
import { Container, Row } from "react-bootstrap";

export const Layout = (props) => (
  <Container style={{ marginTop: 30 }}>
    <Row>{props.products}</Row>
  </Container>
);

export default Layout;
