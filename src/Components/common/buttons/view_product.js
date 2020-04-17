import React from "react";

// components
import CustomButton from "../custom_button";

// packages
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

export const ViewProduct = (props) => (
  <CustomButton
    script={props.script}
    bgColor="#da7272"
    textColor="#A72D2D"
    text="View Product"
    icon={<ShoppingCartIcon />}
  />
);

export default ViewProduct;
