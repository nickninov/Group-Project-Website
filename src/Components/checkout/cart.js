import React from "react";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { TableFooter } from "@material-ui/core";

import QuantityControls from "../common/quantity_controls";
import Price from "../common/price";

import "./cart";

export const Cart = (props) => {
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
            {cart.cart.map((obj) => (
              <TableRow key={obj._id}>
                <TableCell>
                  <h5 style={{ padding: 0, margin: 0 }}>{obj.product.name}</h5>
                </TableCell>
                <TableCell>
                  <Price
                    oneLine={true}
                    price={obj.product.price}
                    discount={obj.product.discount}
                  />
                </TableCell>
                <TableCell>
                  <QuantityControls
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
                  <Price
                    oneLine={true}
                    price={obj.subTotal}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

          <TableFooter>
            <TableRow>
              <TableCell align="right" colSpan={3}>
                <span className="table-header">Total</span>
              </TableCell>
              <TableCell>
                <Price oneLine={true} price={cart.total} />
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Cart;
