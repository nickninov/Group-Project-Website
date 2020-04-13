import React from "react";

// components
import Loading from "../Components/common/loading";
import Wrapper from "../Components/checkout/wrapper";
import Steps from "../Components/checkout/steps";
import BackwardButton from "../Components/common/buttons/backward_button";
import ForwardButton from "../Components/common/buttons/forward_button";
import CentredText from "../Components/common/centred_text";
import Cart from "../Components/checkout/cart";
import Options from "../Components/checkout/options";
import Confirm from "../Components/checkout/confirm";

// packages
import { PayPalButton } from "react-paypal-button-v2";

// api
import {
  getUserCart,
  updateUserCart,
  getUserAccount,
  postOrder,
} from "../API/api";

/**
 * PayPal login details:
 *  email: n.ninov99-facilitator@gmail.com
 *  password: monkaSmonkaS123
 */

export default class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true, // used to store state of loading
      networkLoad: false, // stating whether network activity is present to disable buttons
      empty: false, // represent if cart is empty
      index: 0, // index of section user is in (default 0: cart)
      deliveryValue: "economy", // represent the delivery choice (default: economy)
      giftValue: false, // represent the gift option choice (default: none)
      paypalTotal: 0, // Get total price to pass to PayPal
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
      // remove the ability to perform more actions while request is processed
      this.setState({
        networkLoad: true,
      });

      const token = await this.props.getToken();
      const currentCart = await getUserCart(token);

      // change relevant quantity (in new cart)
      let newCart = [];
      currentCart.body.cart.forEach((e) => {
        newCart.push({
          product: e.product._id,
          quantity: e._id == _id ? (e.quantity += quanChange) : e.quantity,
        });
      });

      // send new cart
      const res = await updateUserCart({ cart: newCart }, token);

      if (res.status == 200) {
        // re-enable ability to perform quantity changes
        this.setState({
          networkLoad: false,
          cart: res.body,
        });
      } else {
        alert("Something went wrong.");
        window.location.reload();
      }
    }
  };

  deleteCartItem = async (id) => {
    // get token and current cart data
    const token = await this.props.getToken();
    const currentCart = await getUserCart(token);

    // remove relevant product (in new cart)
    let newCart = [];
    currentCart.body.cart.forEach((e) => {
      if (e._id != id) {
        newCart.push({
          product: e.product._id,
          quantity: e.quantity,
        });
      }
    });

    // send new cart
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
      paypalTotal: total.toFixed(2),
    });
    return cartData;
  };

  /**
   * change what section is shown to user.
   *
   * checkout process consists of:
   *  0: cart
   *  1: options (delivery and gift)
   *  2: confirm (show address and cart contents)
   */
  incrementSection = async (num) => {
    let i = this.state.index;
    let l = 2; // number of sections

    if (num === 1 || num == null) {
      // increment section (if not already on the last)
      //! when testing without PayPal, re-add the following line:
      i === l && this.finishOrder();

      if (i === 0 && (num === 1 || num == null)) {
        const token = await this.props.getToken();
        const currentCart = await getUserCart(token);

        let valid = true;
        currentCart.body.cart.forEach((e) => {
          if (e.quantity > e.product.stock) {
            valid = false;
          }
        });

        if (valid) {
          this.setState({ index: i >= l ? l : i + 1 });
        } else {
          alert("One of more products exceed their maximum quantity.");
        }
      } else {
        this.setState({ index: i >= l ? l : i + 1 });
      }
    } else if (num === -1) {
      // decrement section (if not already on the first)
      this.setState({ index: i <= 0 ? 0 : i - 1 });
    }
  };

  // methods for changing delivery options
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
    // get user token
    const token = await this.props.getToken();

    // variable declaration
    var billing = null;
    var delivery = null;

    // variable definitions
    const account = this.state.account;

    account.addresses.forEach((e) => {
      e.isBilling && (billing = e);
      e.isDelivery && (delivery = e);
    });

    if (billing != null && delivery != null) {
      // billing and delivery address present

      // make order
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
        // on success, redirect user to their order in account
        this.props.history.push("/order/" + res.body._id);
        window.location.reload();
      } else if (res.status == 400) {
        const userCart = await getUserCart(token);

        // provide appropriate feedback if there are too many items
        userCart.body.cart.forEach((e) => {
          res.body.cart.forEach((f) => {
            if (e._id == f._id) {
              alert(
                `Maximum quantity for "${e.product.name}" is ${e.product.stock}.`
              );
            }
          });
        });
      } else {
        alert("Error, try again later.");
      }
    } else {
      alert("A billing and delivery address is required.");
    }
  };

  async componentDidMount() {
    // get user token
    const token = await this.props.getToken();

    if (!token) {
      // protected route - if no token (guest), redirect to login
      this.props.history.push("/login");
    } else {
      const userCart = await getUserCart(token);
      const userAccount = await getUserAccount(token);

      // check if cart is empty
      if (userCart.body.cart.length === 0 || userCart.body.cart == null) {
        // on empty display appriopriate message
        this.setState({
          empty: true,
        });
      } else {
        this.setState({
          cart: this.reformulateData(userCart.body),
          account: userAccount.body,
          loading: false,
        });
      }
    }
  }

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

    return (
      <Wrapper
        steps={<Steps index={index} />}
        section={sections[index]}
        backwardButton={
          index == 0 ? (
            // if on inital section, do not display back button
            <div />
          ) : (
            <BackwardButton script={() => this.incrementSection(-1)} />
          )
        }
        forwardButton={
          //! remove the following line and un-comment the lines following
          <ForwardButton script={() => this.incrementSection()} />
          // this.state.index == 2 ? (
          //   // if on the last page, show PayPal button
          //   <PayPalButton
          //     currency="USD"
          //     amount={this.state.paypalTotal}
          //     onSuccess={(details, data) => {
          //       // Finish order
          //       this.finishOrder();
          //     }}
          //   />
          // ) : (
          //   <ForwardButton script={() => this.incrementSection()} />
          // )
        }
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
