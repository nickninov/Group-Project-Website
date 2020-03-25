import React from "react";

import "./layout.css";
import { Grid } from "@material-ui/core";

import CustomButton from "../common/custom_button";
import ListAltIcon from "@material-ui/icons/ListAlt";

import { formatDate } from "../../Utility/formatDateUtility";

import "./orders.css";

export const Orders = props => {
  let orders = props.data;

  const renderOrderItems = item => (
    <div className="sm-order-item-wrapper">
      <div className="sm-order-item-metadata">
        {/* <span className="sm-order-item-attribute">{formatDate(item.date)}</span>
        <span className="sm-order-item-attribute">{item.status}</span> */}
        <div className="order-attribute">
          <p className="order-attribute-title">Date</p>
          <p className="order-attribute-value">{formatDate(item.date)}</p>
        </div>
        <div className="order-attribute">
          <p className="order-attribute-title">Status</p>
          <p className="order-attribute-value">{item.status}</p>
        </div>
        <CustomButton
          text="View Order"
          textColor="#535c68"
          bgColor="#95afc0"
          script={() => props.history.push(`/order/${item._id}`)}
          icon={<ListAltIcon />}
        />
      </div>
      <div className="sm-order-item-products">
        {/* {item.products.product.images[0]} */}
        {item.products.map(i => (
          <img
            className="sm-order-item-thumbnail"
            src={i.product.images[0]}
            alt="product thumbnail"
          />
        ))}
      </div>
    </div>
  );

  return (
    <div>
      <h1 style={{ marginBottom: 20 }}>Orders</h1>
      {orders.length === 0 ? (
        <p>You have no orders.</p>
      ) : (
        <Grid container direction="column" justify="center" alignItems="center">
          {orders
            .slice(0)
            .reverse()
            .map(item => renderOrderItems(item))}
        </Grid>
      )}
    </div>
  );
};

export default Orders;
