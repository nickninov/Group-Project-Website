
import React from 'react';

import CustomButton from '../custom_button';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';

export const BackwardButton = (props) => {

    return (
        <CustomButton
            script={props.script}
            bgColor="#EAEFD3"
            textColor="#A72D2D"
            text="Back"
            startIcon={<ArrowBackIcon />}
        />
    )

}

export default BackwardButton;