import React from "react";

import { Row } from "react-bootstrap";
import { IconButton } from "@material-ui/core";
import { Add, Remove } from "@material-ui/icons";

import "./quantity_controls.css";

export const QuantityControls = (props) => {
  const disabled = props.networkLoad ? true : false;
  return (
    <Row className="quantity-wrapper">
      <IconButton onClick={props.decrease} color="secondary" disabled={disabled}>
        <Remove />
      </IconButton>

      <span className="quantity-number">{props.quantity}</span>

      <IconButton onClick={props.increase} color="secondary" disabled={disabled}>
        <Add />
      </IconButton>
    </Row>
  );
};

export default QuantityControls;
