import React from "react";

import { Container, Col, Row } from "react-bootstrap";
import PersonIcon from "@material-ui/icons/Person";

import CustomButton from "../common/custom_button";

import "./confirm.css";

export const Confirm = props => {
  const cart = props.userCart;
  const account = props.userAccount;

  var billing = null;
  var delivery = null;
  var same = false;

  account.addresses.forEach(e => {
    e.isBilling && (billing = e);
    e.isDelivery && (delivery = e);
  });

  billing === delivery && (same = true);

  var addresses;
  if (billing == null && delivery == null) {
    addresses = (<div className="confirm-address-error">There is no <b>billing</b> and no <b>delivery</b> address in your account.</div>)
  } else if(billing == null) {
    addresses = (<div className="confirm-address-error">There is no <b>billing</b> address in your account.</div>)
  } else if(delivery == null) {
    addresses = (<div className="confirm-address-error">There is no <b>delivery</b> address in your account.</div>)
  } else {
    addresses = (
      <div className="confirm-address-wrapper">
        <div className="confirm-address">
          <div className="confirm-address-header">
            {same ? "BILLING + DELIVERY" : "BILLING"}
          </div>
          <div className="confirm-address-details">
            To: {account.firstName} {account.lastName},<br />
            {billing.firstLine},<br />
            {billing.secondLine},<br />
            {billing.townCity},<br />
            {billing.county},<br />
            {billing.postcode}
            <br />
          </div>
        </div>
        {!same && (
          <div className="confirm-address">
            <div className="confirm-address-header">DELIVERY</div>
            <div className="confirm-address-details">
              To: {account.firstName} {account.lastName},<br />
              {delivery.firstLine},<br />
              {delivery.secondLine},<br />
              {delivery.townCity},<br />
              {delivery.county},<br />
              {delivery.postcode}
              <br />
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <Container>
      <Row className="confirm-upper-row">
        <Col lg={8}>
          <h1>Address</h1>
        </Col>
        <Col lg={4}>
          <h1>Products</h1>
        </Col>
      </Row>
      <Row>
        <Col lg={8}>
          {addresses}
          <div className="checkout-details-change">
            <span>Change these details in your</span>
            <div className="checkout-details-change-button">
              <CustomButton
                bgColor="#A72D2D"
                textColor="#EAEFD3"
                icon={<PersonIcon />}
                text="Account"
                script={() => props.history.push("account")}
              />
            </div>
            <span>settings.</span>
          </div>
        </Col>
        <Col lg={4}>
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
