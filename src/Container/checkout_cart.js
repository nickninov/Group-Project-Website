
import React from 'react';

import Loading from '../Components/common/loading';
import Cart from '../Components/checkout/cart';

export default class CheckoutCart extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            data: null,
        };
    }

    componentDidMount() {

        let data = [
            {
                // all required cart information
                sku: 0,
                quantity: 2,

                // retrieved from database 
                name: 'Ray Harryhausen: Special Effects Titan',
                price: 60.00,
                discount: null,
                stock: 28,

                // generated after retrieved from database
                price_subtotal: 120.00,
                discount_subtotal: null,
            },
            {
                // all required cart information
                sku: 1,
                quantity: 4,

                // retrieved from database 
                name: 'Trail of the Screaming Forehead',
                price: 40.00,
                discount: 35.00,
                stock: 15,

                // generated after retrieved from database
                price_subtotal: 160.00,
                discount_subtotal: 140.00,
            }
        ]

        this.setState({
            loading: false,
            data: data,
        });
    }

    changeQuantity = (sku, quanChange, curStock, curQuan) => {
        let currentData = this.state.data;

        if (curQuan >= curStock && quanChange === 1) {
            alert("You hit the max.");
        } else if (curQuan <= 1 && quanChange === -1) {
            alert("Do you wish to delete the item?");
        } else {
            currentData.forEach(obj => {
                if (obj.sku === sku) {
                    obj.quantity += quanChange;
                    obj.price_subtotal = obj.quantity * obj.price;
                    obj.discount_subtotal = obj.discount == null ? null : obj.quantity * obj.discount;
                }
            });
            this.setState({ data: currentData });
        }
    }

    getTotal(data) {
        let total = 0;
        data.map(obj => total += obj.discount_subtotal == null ? obj.price_subtotal : obj.discount_subtotal)
        return total;
    }

    components() {
        return (
            <Cart
                data={this.state.data}
                total={this.getTotal(this.state.data)}
                changeQuantity={this.changeQuantity}
            />
        )
    }

    render() { return this.state.loading ? <Loading /> : this.components() }
}








