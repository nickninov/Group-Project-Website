
import React from 'react';

import CustomButton from '../custom_button';

import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

export const ViewProduct = (props) => {

    return (
        <CustomButton
            script={props.script}
            bgColor="#EAEFD3"
            textColor="#A72D2D"
            text="View Product"
            icon={<ShoppingCartIcon />}
        />
    )

}

export default ViewProduct;