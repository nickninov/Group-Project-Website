import React from "react";

// components
import QuantityControls from "../common/quantity_controls";
import Price from "../common/price";

// packages
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { TableFooter } from "@material-ui/core";
import { Link } from "react-router-dom";
import AnnouncementIcon from "@material-ui/icons/Announcement";

// styles
import "./cart";

export const Cart = (props) => {
  // get prop data
  const cart = props.userCart;

  return (
    <div>
      <h1>Cart</h1>
      <TableContainer>
        <Table aria-label="spanning table">
          <TableHead>
            <TableRow>
              <TableCell>
                <span className="table-header">Name</span>
              </TableCell>
              <TableCell>
                <span className="table-header">Price</span>
              </TableCell>
              <TableCell>
                <span className="table-header">Quantity</span>
              </TableCell>
              <TableCell>
                <span className="table-header">Subtotal</span>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {
              // generate each product as row
              cart.cart.map((obj) => (
                <TableRow key={obj._id}>
                  <TableCell>
                    <Link
                      style={{ textDecoration: "underline", color: "black" }}
                      to={"product/" + obj.product._id}
                    >
                      <h5 style={{ padding: 0, margin: 0 }}>
                        {obj.product.name}
                      </h5>
                    </Link>
                    {
                      // add appropriate feedback to user on maximum item quantity if limit exceeded
                      obj.quantity > obj.product.stock && (
                        <div>
                          <br />
                          <span style={{ color: "red" }}>
                            <AnnouncementIcon /> Maximum quantity for this item
                            is {obj.product.stock}.
                          </span>
                        </div>
                      )
                    }
                  </TableCell>
                  <TableCell>
                    <Price
                      oneLine={true}
                      price={obj.product.price}
                      discount={obj.product.discount}
                    />
                  </TableCell>
                  <TableCell>
                    {/* provide quantity controls */}
                    <QuantityControls
                      // network load will determine if
                      networkLoad={props.networkLoad}
                      quantity={obj.quantity}
                      increase={() => {
                        props.changeQuantity(
                          obj._id,
                          1,
                          obj.product.stock,
                          obj.quantity
                        );
                      }}
                      decrease={() =>
                        props.changeQuantity(
                          obj._id,
                          -1,
                          obj.product.stock,
                          obj.quantity
                        )
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <Price price={obj.subTotal} />
                  </TableCell>
                </TableRow>
              ))
            }
          </TableBody>

          <TableFooter>
            <TableRow>
              <TableCell align="right" colSpan={3}>
                <span className="table-header">Total</span>
              </TableCell>
              <TableCell>
                <Price price={cart.total} />
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Cart;
