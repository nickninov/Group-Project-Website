import React from "react";

// packages
import { Button, withStyles } from "@material-ui/core";

export const CustomButton = (props) => {
  // applying styles through Material UI
  const CustomButton = withStyles({
    root: {
      backgroundColor: props.bgColor,
      color: props.textColor,
      fontWeight: 600,
      borderRadius: 10,
      textTransform: "none",
      "&:hover": {
        backgroundColor: props.textColor,
        color: props.bgColor,
      },
    },
    // creating CustomButton element based on button
  })(Button);

  return (
    <div>
      <CustomButton
        fullWidth={props.fullWidth}
        onClick={props.script}
        variant="contained"
        color="primary"
        endIcon={props.icon}
        startIcon={props.startIcon}
        disabled={props.disabled == null ? false : props.disabled}
      >
        {props.text}
      </CustomButton>
    </div>
  );
};

export default CustomButton;
