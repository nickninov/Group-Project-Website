import React from "react";

import "./layout.css";
import { Container, Card, Grid, CardActionArea } from "@material-ui/core";
import { formatDate } from "../../Utility/formatDateUtility";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export const Orders = props => {
  let orders = props.data;
  console.log(props);

  const renderOrderItems = item => (
    <Container className={"order-item-root"}>
      <Container className={"order-header"}>
        <div>Order Date: {formatDate(item.date)}</div>
        <div>{item.status}</div>
      </Container>
      <div className="divider" />
      <Container className={"order-item"}>
        {item.products.map(prod => (
          <Card className="order-card-root">
            <Link
              className={"match-parent"}
              to={() => props.navigateToProduct(prod.product._id)}
            >
              <CardActionArea className={"order-card"}>
                <img className="order-image" src={prod.product.images[0]} />
                <Container className={"card-item-middle"}>
                  <div className={"item-title"}> {prod.product.name}</div>
                  <div className={"item-description"}>
                    {prod.product.description}
                  </div>
                </Container>
                <div className={"item-price"}>{prod.product.price}$</div>
              </CardActionArea>
            </Link>
          </Card>
        ))}
      </Container>
    </Container>
  );

  return (
    <div>
      <h1>Orders</h1>
      {orders.length === 0 ? (
        <p>You have no orders.</p>
      ) : (
        <Grid container direction="column" justify="center" alignItems="center">
          {orders.map(item => renderOrderItems(item))}
        </Grid>
      )}
    </div>
  );
};

export default Orders;
