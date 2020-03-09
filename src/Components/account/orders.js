import React from "react";

import "./layout.css";

export const Orders = props => {

  let orders = props.data;

  return (
    <div>
      <h1>Orders</h1>
      {orders.length === 0 ? (<p>You have no orders.</p>) : (<p>You have orders. THIS HAS NOT YET BEEN DEVELOPED.</p>)}
    </div>
  );
};

export default Orders;
