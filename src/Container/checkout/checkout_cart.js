
import React from 'react';

import Loading from '../../Components/common/loading';
import Cart from '../../Components/checkout/cart';

export default class CheckoutCart extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            data: null,
        };
    }

    componentDidMount() {
        this.setState({
            loading: false,
            data: this.props.data,
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

    components() {

        console.log(this.state.data);

        return (
            <Cart
                data={this.state.data}
                total={this.props.total}
                // total={this.getTotal(this.state.data)}
                changeQuantity={this.changeQuantity}
            />
        )
    }

    render() { return this.state.loading ? <Loading /> : this.components() }
}








