import React from "react";

// components
import CustomButton from "../common/custom_button";
import { AddressBoxes } from "../common/address_box";

// packages
import { Container, Col, Row } from "react-bootstrap";
import PersonIcon from "@material-ui/icons/Person";

// styles
import "./confirm.css";

export const Confirm = (props) => {
  // get prop data
  const cart = props.userCart;
  const account = props.userAccount;
  const deliveryText = props.deliveryText;
  const deliveryCost = props.deliveryCost;
  const giftEnabled = props.giftEnabled;

  // initalise variables
  var billing = null;
  var delivery = null;
  var same = false;
  var addresses;

  // set billing and delivery to relevant variables
  account.addresses.forEach((e) => {
    e.isBilling && (billing = e);
    e.isDelivery && (delivery = e);
  });

  // check if addresses are the same
  billing === delivery && (same = true);

  // set addresses variable to the relevant content
  if (billing == null && delivery == null) {
    addresses = (
      <div className="confirm-address-error">
        There is no <b>billing</b> and no <b>delivery</b> address in your
        account.
      </div>
    );
  } else if (billing == null) {
    addresses = (
      <div className="confirm-address-error">
        There is no <b>billing</b> address in your account.
      </div>
    );
  } else if (delivery == null) {
    addresses = (
      <div className="confirm-address-error">
        There is no <b>delivery</b> address in your account.
      </div>
    );
  } else {
    addresses = (
      <div className="confirm-addresses-wrapper">
        <AddressBoxes
          firstName={account.firstName}
          lastName={account.lastName}
          shipping={delivery}
          billing={billing}
        />
      </div>
    );
  }

  return (
    <Container>
      <Row className="confirm-upper-row">
        <Col lg={12}>
          <h1>Confirm</h1>
        </Col>
      </Row>
      <Row>
        <Col lg={7}>
          {/* show addresses */}
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
        <Col lg={5}>
          <div>
            {
              // present each item with their respected quantity and price
              cart.cart.map((e) => (
                <div
                  className="checkout-confirm-item"
                  style={{ fontWeight: "bold" }}
                >
                  <div>
                    {e.quantity}x {e.product.name}
                  </div>
                  <div>£{e.subTotal.toFixed(2)}</div>
                </div>
              ))
            }
            <div className="checkout-confirm-item">
              <div style={{ textTransform: "capitalize" }}>
                {deliveryText} Shipping
              </div>
              <div>£{deliveryCost.toFixed(2)}</div>
            </div>
            {
              // if gift selected, present in confirmation page
              giftEnabled && (
                <div className="checkout-confirm-item">
                  <div>Gift</div>
                  <div>Free</div>
                </div>
              )
            }
          </div>
          <div>
            <div className="checkout-confirm-total">
              <div>Total</div>
              <div>£{(cart.total + deliveryCost).toFixed(2)}</div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Confirm;
