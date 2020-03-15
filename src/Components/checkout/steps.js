
import React from 'react';

import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';

import './steps.css';

export const Steps = (props) => {

    const selected = "#A72D2D";
    const idle = "#EAEFD3"

    return (
        <Breadcrumbs
            className="breadcrumb-wrapper"
            separator={<NavigateNextIcon style={{ color: idle}} fontSize="small" />}
            aria-label="breadcrumb">

            <div className="breadcrumb-item"
                style={{ color: props.index >= 0 ? selected : idle }}>
                <ShoppingCartIcon className="breadcrumb-icon" />
                <span className="breadcrumb-text">Cart</span>
            </div>

            <div className="breadcrumb-item"
                style={{ color: props.index >= 1 ? selected : idle }}>
                <LocalShippingIcon className="breadcrumb-icon" />
                <span className="breadcrumb-text">Options</span>
            </div>

            <div className="breadcrumb-item"
                style={{ color: props.index >= 2 ? selected : idle }}>
                <DoneOutlineIcon className="breadcrumb-icon" />
                <span className="breadcrumb-text">Confirm</span>
            </div>

        </Breadcrumbs>
    )
}

export default Steps;