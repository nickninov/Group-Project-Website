import React from "react";

// components
import CustomButton from "../custom_button";

// packages
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

export const ForwardButton = (props) => (
  <CustomButton
    script={props.script}
    bgColor="#EAEFD3"
    textColor="#A72D2D"
    text="Next"
    icon={<ArrowForwardIcon />}
  />
);

export default ForwardButton;
