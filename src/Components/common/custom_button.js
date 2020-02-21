
import React from 'react';

import { Button, withStyles } from '@material-ui/core';

export const CustomButton = (props) => {

    const CustomButton = withStyles({
        root: {
            backgroundColor: props.bgColor,
            color: props.textColor,
            fontWeight: 600,
            borderRadius: 10,
            textTransform: 'none',
            '&:hover': {
                backgroundColor: props.textColor,
                color: props.bgColor,
            },
        },
    })(Button);

    // const icon = <Icon>{props.icon}</Icon>;
    const icon = props.icon;

    return (
        <div>
            <CustomButton
                onClick={props.script}
                variant="contained"
                color="primary"
                endIcon={icon}
            >
                {props.text}
            </CustomButton>
        </div>

    );
}

export default CustomButton;