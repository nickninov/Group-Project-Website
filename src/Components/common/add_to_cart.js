
import React from 'react';

import * as Icon from 'react-feather';

// eslint-disable-next-line
import styles from './add_to_cart.css';

export const AddToCart = () => {
    return (
        <div className="item-add-cart">
            <Icon.ShoppingCart className="icon" size="20" />
            <span className="item-add-cart-text">Add to Cart</span>
        </div>
    );
}