import React from "react";

import { Container, Col, Row } from "react-bootstrap";

import "./confirm.css";

export const Confirm = props => {
  const cart = props.userCart;
  const account = props.userAccount;

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
            To: {account.firstName} {account.lastName},<br />
            {account.addresses.addressLine1}
            {account.addresses.addressLine2}, <br />
            {account.addresses.townCity}, {account.addresses.county}, <br />
            {account.addresses.postcode}
          </p>
        </Col>
        <Col lg={6}>
          <table>
            {cart.cart.map(e => (
              <tr>
                <td>
                  {e.quantity}x {e.product.name}
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
              <td className="confirm-total">£{cart.total}</td>
            </tr>
          </table>
        </Col>
      </Row>
    </Container>
  );
};

export default Confirm;
