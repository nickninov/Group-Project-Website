import React from "react";

// packages
import { Row } from "react-bootstrap";
import { IconButton } from "@material-ui/core";
import { Add, Remove } from "@material-ui/icons";

// styles
import "./quantity_controls.css";

export const QuantityControls = (props) => {
  // setup variable based on prop data
  const disabled = props.networkLoad ? true : false;
  return (
    <Row className="quantity-wrapper">
      {/* remove button */}
      <IconButton
        onClick={props.decrease}
        color="secondary"
        disabled={disabled}
      >
        <Remove />
      </IconButton>

      {/* quantity amount */}
      <span className="quantity-number">{props.quantity}</span>

      {/* add button */}
      <IconButton
        onClick={props.increase}
        color="secondary"
        disabled={disabled}
      >
        <Add />
      </IconButton>
    </Row>
  );
};

export default QuantityControls;
