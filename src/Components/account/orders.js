import React from "react";

// components
import CustomButton from "../common/custom_button";

// utility
import { formatDate } from "../../Utility/formatDateUtility";

// packages
import { Grid } from "@material-ui/core";
import ListAltIcon from "@material-ui/icons/ListAlt";

// styles
import "./layout.css";
import "./orders.css";

export const Orders = (props) => {
  // get prop data
  let orders = props.orders;

  // create renderable jsx element
  const renderOrderItems = (item) => (
    <div className="sm-order-item-wrapper">
      <div className="sm-order-item-metadata">
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
        {
          // for each item in order, add thumbnail
          item.products.map((i) => (
            <img
              className="sm-order-item-thumbnail"
              src={i.product.images[0]}
              alt="product thumbnail"
            />
          ))
        }
      </div>
    </div>
  );

  return (
    <div>
      {orders.length === 0 ? (
        <p>You have no orders.</p>
      ) : (
        // generate grid of orders
        <Grid container direction="column" justify="center" alignItems="center">
          {orders
            .slice(0)
            .reverse()
            .map((item) => renderOrderItems(item))}
        </Grid>
      )}
    </div>
  );
};

export default Orders;
