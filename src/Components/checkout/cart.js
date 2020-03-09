
import React from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { TableFooter } from '@material-ui/core';

import QuantityControls from '../common/quantity_controls';
import Price from '../common/price';

import './cart';

export const Cart = (props) => {

    const data = props.data;
    // const total = props.total;

    data.map(item => console.log(item.stock))

    return (
        <div>
            <h1>Cart</h1>
            <TableContainer>
                <Table aria-label="spanning table">

                    <TableHead>
                        <TableRow>
                            <TableCell><span className="table-header">Name</span></TableCell>
                            <TableCell><span className="table-header">Price</span></TableCell>
                            <TableCell><span className="table-header">Quantity</span></TableCell>
                            <TableCell><span className="table-header">Subtotal</span></TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {data.map(row => (
                            <TableRow key={row._id}>
                                <TableCell><h5 style={{ padding: 0, margin: 0 }}>{row.name}</h5></TableCell>
                                <TableCell>
                                    <Price oneLine={true} price={row.price} discount={row.discount} />
                                </TableCell>
                                <TableCell>

                                    <QuantityControls
                                        // quantity={row.quantity}
                                        quantity="n/a"
                                        increase={() => props.changeQuantity(row.sku, 1, row.stock, row.quantity)}
                                        decrease={() => props.changeQuantity(row.sku, -1, row.stock, row.quantity)}
                                    />

                                </TableCell>
                                <TableCell>
                                    <h1>n/a</h1>
                                    {/* <Price oneLine={true} price={row.price_subtotal} discount={row.discount_subtotal} /> */}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>

                    <TableFooter>
                        <TableRow>
                            <TableCell align="right" colSpan={3}><span className="table-header">Total</span></TableCell>
                            {/* <TableCell><Price oneLine={true} price={total} /></TableCell> */}
                            {/* <TableCell><Price oneLine={true} price={total} /></TableCell> */}
                            <h1>n/a</h1>
                        </TableRow>
                    </TableFooter>

                </Table>
            </TableContainer>
        </div>
    )
}

export default Cart;