import React from "react";

import { Container, Col, Row } from "react-bootstrap";

import "./confirm.css";

export const Confirm = props => {
  const details = props.detailsData;
  const cart = props.cartData;

  var total;
  cart.forEach(e => {
    total +=
      e.discount_subtotal == null ? e.price_subtotal : e.discount_subtotal;
  });

  console.log("total: " + total);

  return (
    <Container>
      <Row className="confirm-upper-row">
        <Col lg={6}>
          <h1>Address</h1>
        </Col>
        <Col lg={6}>
          <h1>Products</h1>
        </Col>
      </Row>
      <Row>
        <Col lg={6}>
          <p>
            To: {details.firstName} {details.lastName},<br />
            {details.addresses.addressLine1}
            {details.addresses.addressLine2}, <br />
            {details.addresses.townCity}, {details.addresses.county}, <br />
            {details.addresses.postcode}
          </p>
        </Col>
        <Col lg={6}>
          <table>
            {cart.map(e => (
              <tr>
                <td>
                  {e.quantity}x {e.name}
                </td>
                <td>
                  £
                  {e.discount_subtotal == null
                    ? e.price_subtotal
                    : e.discount_subtotal}
                </td>
              </tr>
            ))}
            <tr>
              <td>Standard Delivery</td>
              <td>Free</td>
            </tr>
            <tr>
              <td></td>
              <td className="confirm-total">£{props.total}</td>
            </tr>
          </table>
        </Col>
      </Row>
    </Container>
  );
};

export default Confirm;
