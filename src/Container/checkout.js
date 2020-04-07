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

// api calls
import {
  getUserCart,
  updateUserCart,
  getUserAccount,
  postOrder,
} from "../API/api";

export default class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      empty: false,
      index: 0,
      deliveryValue: "economy",
      giftValue: false,
    };
  }

  changeQuantity = (_id, quanChange, curStock, curQuan) => {
    if (curQuan >= curStock && quanChange === 1) {
      alert("You hit the max.");
    } else if (curQuan <= 1 && quanChange === -1) {
      if (window.confirm("Delete the item?")) {
        this.deleteCartItem(_id);
      }
    } else {
      let currentCart = this.state.cart;
      currentCart.cart.forEach((e) => {
        if (e._id === _id) {
          e.quantity += quanChange;
        }
      });

      this.setState({
        cart: this.reformulateData(currentCart),
      });
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
        e.subTotal = e.product.discount * e.quantity;
      }
    });

    // finding the total
    let total = 0;
    cartData.cart.forEach((e) => {
      total += e.subTotal;
    });
    cartData.total = total;

    return cartData;
  };

  incrementSection = (num) => {
    let i = this.state.index;
    let l = 2;

    if (num === 1 || num == null) {
      i === l && this.finishOrder();
      this.setState({ index: i >= l ? l : i + 1 });
    } else if (num === -1) {
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

    if (billing != null && delivery != null) {
      console.log({
        shippingAddress: delivery._id,
        billingAddress: billing._id,
        isGift: this.state.giftValue,
        deliveryType: this.state.deliveryValue,
      });

      let res = await postOrder(
        {
          shippingAddress: delivery._id,
          billingAddress: billing._id,
          isGift: this.state.giftValue,
          deliveryType: this.state.deliveryValue,
        },
        token
      );

      if (res.body.status === "ordered") {
        alert("Thank you for shopping. Your order has been confirmed.");
        await updateUserCart({ cart: [] }, token).then(() => {
          this.props.history.push("/order/" + res.body._id);
          window.location.reload();
        });
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
      <Cart userCart={cart} changeQuantity={this.changeQuantity} />,
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

    return (
      <Wrapper
        steps={<Steps index={index} />}
        section={sections[index]}
        backwardButton={
          <BackwardButton script={() => this.incrementSection(-1)} />
        }
        forwardButton={<ForwardButton script={() => this.incrementSection()} />}
      />
    );
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
