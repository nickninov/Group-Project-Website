import React from "react";

import "./layout.css";
import { Container, Card, Grid } from "@material-ui/core";
import { formatDate } from "../../Utility/formatDateUtility";

const url =
  "https://books.google.co.uk/books/content?id=-d0QtAEACAAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE707dBvGu9FRs6En58Ds_oaZPoM0Cr5y53UQ5Vy5mI-4yc7SFK9fO7o96FmDcFcImSCYhH464xe-dT_-_ZX2NCWKrPH5HqCy4npgC60QVO-niHBOUf_0-ek0SuKcpPqBVxw2bHgf";
export const Orders = props => {
  let orders = props.data;

  const renderOrderItems = item => (
    <Container className={"order-item-root"}>
      <Container className={"order-header"}>
        <div>Order Date: {formatDate(item.date)}</div>
        <div>{item.status}</div>
      </Container>
      <div className="divider" />
      <Container className={"order-item"}>
        {item.products.map(prod => (
          <Card className="order-card">
            <img className="order-image" src={prod.product.images[0]} />
            <Container className={"card-item-middle"}>
              <div className={"item-title"}> {prod.product.name}</div>
              <div className={"item-description"}>
                {prod.product.description}
              </div>
            </Container>
            <div className={"item-price"}>{prod.product.price}$</div>
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
