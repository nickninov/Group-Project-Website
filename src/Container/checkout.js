import React from "react";

import Loading from "../Components/common/loading";

// misc.
import Wrapper from "../Components/checkout/wrapper";
import Steps from "../Components/checkout/steps";
import BackwardButton from "../Components/common/buttons/backward_button";
import ForwardButton from "../Components/common/buttons/forward_button";
import CentredText from "../Components/common/centred_text";

// checkout sections
import Cart from "../Components/checkout/cart";
import Options from "../Components/checkout/options";
import Confirm from "../Components/checkout/confirm";

// API calls
import {
  getUserCart,
  updateUserCart,
  getUserAccount,
  postOrder,
} from "../API/api";

// Paypal button
import { PayPalButton } from "react-paypal-button-v2";

// E-mail: n.ninov99-facilitator@gmail.com
// Password: monkaSmonkaS123


export default class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      networkLoad: false,
      empty: false,
      index: 0,
      deliveryValue: "economy",
      giftValue: false,
      // Get total price to pass to PayPal
      paypalTotal: 0
    };
  }

  changeQuantity = async (_id, quanChange, curStock, curQuan) => {
    if (curQuan >= curStock && quanChange === 1) {
      alert("You've hit the maximum number of items.");
    } else if (curQuan <= 1 && quanChange === -1) {
      if (window.confirm("Delete the item?")) {
        this.deleteCartItem(_id);
      }
    } else {
      this.setState({
        networkLoad: true,
      });

      const token = await this.props.getToken();
      const currentCart = await getUserCart(token);
      let newCart = [];

      currentCart.body.cart.forEach((e) => {
        newCart.push({
          product: e.product._id,
          quantity: e._id == _id ? (e.quantity += quanChange) : e.quantity,
        });
      });

      const res = await updateUserCart({ cart: newCart }, token);

      if (res.status == 200) {
        this.setState({
          networkLoad: false,
          cart: res.body,
        });
      } else {
        alert("Something went wrong.");
        // window.location.reload();
      }

      // let currentCart = this.state.cart;
      // currentCart.cart.forEach((e) => {
      //   if (e._id === _id) {
      //     e.quantity += quanChange;
      //   }
      // });

      // const res = await updateUserCart({ cart: currentCart.cart }, token);

      // if (res.status == 200) {
      //   alert("ok!")
      //   this.setState({
      //     cart: this.reformulateData(currentCart),
      //   });
      // } else {
      //   alert("Something went wrong.");
      // }
    }
  };

  deleteCartItem = async (id) => {
    const token = await this.props.getToken();
    const currentCart = await getUserCart(token);
    let newCart = [];

    currentCart.body.cart.forEach((e) => {
      if (e._id != id) {
        newCart.push({
          product: e.product._id,
          quantity: e.quantity,
        });
      }
    });

    const res = await updateUserCart({ cart: newCart }, token);

    if (res.status == 200) {
      window.location.reload();
    } else {
      alert("Something went wrong.");
    }
  };

  reformulateData = (cartData) => {
    // finding subtotal for each item
    cartData.cart.forEach((e) => {
      if (e.product.discount == 0) {
        e.subTotal = e.product.price * e.quantity;
      } else {
        e.subTotal =
          (e.product.price - (e.product.discount / 100) * e.product.price) *
          e.quantity;
      }
    });

    // finding the total
    let total = 0;
    cartData.cart.forEach((e) => {
      total += e.subTotal;
    });
    cartData.total = total;
    
    // Set total amount for PayPal
    this.setState({
      paypalTotal: total.toFixed(2)
    })
    return cartData;
  };

  incrementSection = (num) => {
    let i = this.state.index;
    let l = 2;
    
    if (num === 1 || num == null) {
      i === l && this.finishOrder();
      this.setState({ index: i >= l ? l : i + 1 });
    } else if (num === -1) {
      i == 0 && alert("end");
      this.setState({ index: i <= 0 ? 0 : i - 1 });
    }
  };

  async componentDidMount() {
    const token = await this.props.getToken();

    if (!token) {
      this.props.history.push("/login");
    } else {
      const userCart = await getUserCart(token);
      const userAccount = await getUserAccount(token);

      if (userCart.body.cart.length === 0 || userCart.body.cart == null) {
        this.setState({
          empty: true,
        });
      } else {
        this.setState({
          cart: this.reformulateData(userCart.body),
          account: userAccount.body,
          loading: false,
          message: "not empty",
        });
      }
    }
  }

  changeDeliveryOption = (value) => {
    this.setState({
      deliveryValue: value,
    });
  };

  changeGiftOption = (bool) => {
    this.setState({
      giftValue: bool,
    });
  };

  finishOrder = async () => {
    const token = await this.props.getToken();

    var billing = null;
    var delivery = null;
    const account = this.state.account;

    account.addresses.forEach((e) => {
      e.isBilling && (billing = e);
      e.isDelivery && (delivery = e);
    });

    console.log({
      shippingAddress: delivery._id,
      billingAddress: billing._id,
      isGift: this.state.giftValue,
      deliveryType: this.state.deliveryValue,
    });

    if (billing != null && delivery != null) {
      const res = await postOrder(
        {
          shippingAddress: delivery._id,
          billingAddress: billing._id,
          isGift: this.state.giftValue,
          deliveryType: this.state.deliveryValue,
        },
        token
      );

      if (res.status == 200) {
        // alert("Thank you for shopping. Your order has been confirmed.");
        this.props.history.push("/order/" + res.body._id);
        window.location.reload();
      } else if (res.status == 400) {
        const userCart = await getUserCart(token);

        userCart.body.cart.forEach(e => {
          res.body.cart.forEach(f => {
            if (e._id == f._id) {
              alert(`Maximum quantity for "${e.product.name}" is ${e.product.stock}.`);
            }
          });
        })
      } else {
        alert("Error, try again later.");
      }
    } else {
      alert("A billing and delivery address is required.");
    }
  };

  components() {
    const cart = this.state.cart;
    const account = this.state.account;
    const index = this.state.index;

    var sections = [
      <Cart
        userCart={cart}
        changeQuantity={this.changeQuantity}
        networkLoad={this.state.networkLoad}
      />,
      <Options
        deliveryValue={this.state.deliveryValue}
        giftValue={this.state.giftValue}
        changeDeliveryOption={this.changeDeliveryOption}
        changeGiftOption={this.changeGiftOption}
      />,
      <Confirm
        history={this.props.history}
        userAccount={account}
        userCart={cart}
        deliveryText={this.state.deliveryValue}
        deliveryCost={this.state.deliveryValue == "economy" ? 0 : 3.99}
        giftEnabled={this.state.giftValue}
        total={cart.cart.total}
      />,
    ];

    // PayPal confirm
    if (this.state.index == 2){
      console.log(this.state.paypalTotal)
      return (
        <Wrapper
          steps={<Steps index={index} />}
          section={sections[index]}
          backwardButton={
            index == 0 ? (
              <div />
            ) : (
              <BackwardButton script={() => this.incrementSection(-1)} />
            )
          }
          forwardButton = {<PayPalButton 
            currency = "USD"
            amount = {this.state.paypalTotal}
            onSuccess = {(details, data) => {
              // Finish order
              this.finishOrder()
            }}/>}
        />
      ); 
    }
    else {
      return (
 
        <Wrapper
          steps={<Steps index={index} />}
          section={sections[index]}
          backwardButton={
            index == 0 ? (
              <div />
            ) : (
              <BackwardButton script={() => this.incrementSection(-1)} />
            )
          }
          forwardButton={<ForwardButton script={() => this.incrementSection()} />}
        />
      );
    }
  }

  render() {
    if (this.state.empty) {
      return <CentredText text="Empty" />;
    } else if (this.state.loading) {
      return <Loading />;
    } else {
      return this.components();
    }
  }
}
