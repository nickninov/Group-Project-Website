import React from "react";

// components
import CustomButton from "../custom_button";

// packages
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

export const BackwardButton = (props) => (
  <CustomButton
    script={props.script}
    bgColor="#EAEFD3"
    textColor="#A72D2D"
    text="Back"
    startIcon={<ArrowBackIcon />}
  />
);

export default BackwardButton;
