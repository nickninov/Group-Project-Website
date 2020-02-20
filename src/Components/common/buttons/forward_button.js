
import React from 'react';

import CustomButton from '../custom_button';

import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

export const ForwardButton = (props) => {

    return (
        <CustomButton
            script={props.script}
            bgColor="#EAEFD3"
            textColor="#A72D2D"
            text="Next"
            icon={<ArrowForwardIcon />}
        />
    )

}

export default ForwardButton;