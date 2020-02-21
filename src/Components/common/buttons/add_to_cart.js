
import React from 'react';

import CustomButton from '../custom_button';

import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

export const AddToCart = (props) => {

    return (
        <CustomButton
            script={props.script}
            bgColor="#EAEFD3"
            textColor="#A72D2D"
            text="Add to Cart"
            icon={<AddShoppingCartIcon />}
        />
    )

}

export default AddToCart;