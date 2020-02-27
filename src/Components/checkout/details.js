import React from "react";

import { TextField } from "@material-ui/core";
import { Container, Col, Row } from "react-bootstrap";
import PersonIcon from "@material-ui/icons/Person";

import CustomButton from "../common/custom_button";

import "./details.css";

export const Details = props => {
  let data = props.data;

  return (
    <div>
      <form noValidate autoComplete="off">
        <Container>
          <Row className="checkout-details-row">
            <Col lg={4}>
              <h1>Account</h1>
            </Col>
            <Col lg={8}>
              <h1>Address</h1>
            </Col>
          </Row>
          <Row className="checkout-details-row">
            <Col lg={4}>
              <div className="checkout-details-textfield">
                <TextField
                  className="checkout-details-textfield"
                  id="standard-basic"
                  label="First Name"
                  disabled={true}
                  defaultValue={data.firstName}
                />
              </div>
              <div className="checkout-details-textfield">
                <TextField
                  className="checkout-details-textfield"
                  id="standard-basic"
                  label="Last Name"
                  disabled={true}
                  defaultValue={data.lastName}
                />
              </div>
              <div className="checkout-details-textfield">
                <TextField
                  className="checkout-details-textfield"
                  id="standard-basic"
                  label="Phone"
                  disabled={true}
                  defaultValue={data.phone}
                />
              </div>
            </Col>
            <Col lg={4}>
              <div className="checkout-details-textfield">
                <TextField
                  className="checkout-details-textfield"
                  id="standard-basic"
                  label="Adress Line 1"
                  disabled={true}
                  defaultValue={data.addresses.addressLine1}
                />
              </div>
              <div className="checkout-details-textfield">
                <TextField
                  className="checkout-details-textfield"
                  id="standard-basic"
                  label="Adress Line 2"
                  disabled={true}
                  defaultValue={data.addresses.addressLine2}
                />
              </div>
              <div className="checkout-details-textfield">
                <TextField
                  className="checkout-details-textfield"
                  id="standard-basic"
                  label="City / Town"
                  disabled={true}
                  defaultValue={data.addresses.townCity}
                />
              </div>
            </Col>
            <Col lg={4}>
              <div className="checkout-details-textfield">
                <TextField
                  id="standard-basic"
                  label="County"
                  disabled={true}
                  defaultValue={data.addresses.county}
                />
              </div>
              <div className="checkout-details-textfield">
                <TextField
                  className="checkout-details-textfield"
                  id="standard-basic"
                  label="Postcode"
                  disabled={true}
                  defaultValue={data.addresses.postcode}
                />
              </div>
            </Col>
          </Row>
        </Container>
        <div className="checkout-details-change">
          <span>Change these details in your</span>
          <div className="checkout-details-change-button">
            <CustomButton
              bgColor="#A72D2D"
              textColor="#EAEFD3"
              icon={<PersonIcon />}
              text="Profile"
            />
          </div>
          <span>settings.</span>
        </div>
      </form>
    </div>
  );
};

export default Details;
