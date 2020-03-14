import React from "react";

import Loading from "../Components/common/loading";

// misc.
import Wrapper from "../Components/checkout/wrapper";
import Steps from "../Components/checkout/steps";
import BackwardButton from "../Components/common/buttons/backward_button";
import ForwardButton from "../Components/common/buttons/forward_button";

// checkout sections
import Cart from "../Components/checkout/cart";
import Account from "../Components/checkout/account";
import Options from "../Components/checkout/options";
import Confirm from "../Components/checkout/confirm";

// api calls
import getUserCart from "../API/get_user_cart";
import updateUserCart from "../API/update_user_cart";
import getUserAccount from "../API/get_user_account";
import postOrder from "../API/post_order";

export default class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      empty: false,
      index: 0
    };
  }

  changeQuantity = (_id, quanChange, curStock, curQuan) => {
    // parameters passed in so no need to find with for loop

    // console.log(_id + " / " + quanChange + " / " + curStock + " / " + curQuan);

    if (curQuan >= curStock && quanChange === 1) {
      alert("You hit the max.");
    } else if (curQuan <= 1 && quanChange === -1) {
      alert("Do you wish to delete the item?");
    } else {
      let currentCart = this.state.cart;
      currentCart.cart.forEach(e => {
        if (e._id == _id) {
          e.quantity += quanChange;
        }
      });

      this.setState({
        cart: this.reformulateData(currentCart)
      });
    }
  };

  reformulateData = cartData => {
    // to reformulate the prices when quantity is changed

    cartData.cart.forEach(e => {
      // price subtotal
      e.price_subtotal = e.product.price * e.quantity;

      // discount subtotal
      let ds = e.product.discount;
      if (typeof ds === "undefined" || ds === null) {
        e.product.discount = null;
        e.discount_subtotal = null;
      } else {
        e.discount_subtotal = e.product.discount * e.quantity;
      }
    });

    // total
    let total = 0;
    cartData.cart.forEach(e => {
      let ds = e.discount_subtotal;
      ds != null ? (total += ds) : (total += e.price_subtotal);
    });
    cartData.total = total;
    return cartData;
  };

  incrementSection = num => {
    let i = this.state.index;
    let l = 3;

    if (num === 1 || num == null) {
      i == l && this.finishOrder();
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

      if (userCart.cart.length == 0 || userCart.cart == null) {
        this.setState({
          empty: true
        });
      } else {
        this.setState({
          cart: this.reformulateData(userCart),
          account: userAccount,
          loading: false,
          message: "not empty"
        });
      }
    }
  }

  finishOrder = async () => {
    const token = await this.props.getToken();

    var formattedCart = [];

    this.state.cart.cart.forEach(e => {
      formattedCart.push({
        quantity: e.quantity,
        product: e.product._id
      });
    });

    let res = await postOrder(
      {
        shippingAddress: {
          firstLine: "firstLine",
          secondLine: "secondLine",
          townCity: "townCity",
          county: "county",
          postcode: "postcode",
          isBilling: true,
          isDelivery: false
        },
        billingAddress: {
          firstLine: "firstLine",
          secondLine: "secondLine",
          townCity: "townCity",
          county: "county",
          postcode: "postcode",
          isBilling: false,
          isDelivery: true
        },
        products: formattedCart
      },
      token
    );

    if (res.status == "ordered") {
      alert("Thank you for shopping. Your order has been confirmed.");
      await updateUserCart({ cart: [] }, token).then(() => {
        window.location.reload();
      });
    } else {
      alert("err, chk console for call res");
      console.log(res);
    }
  };

  components() {
    const cart = this.state.cart;
    const account = this.state.account;
    const index = this.state.index;

    var sections = [
      <Cart userCart={cart} changeQuantity={this.changeQuantity} />,
      <Account userAccount={account} />,
      <Options />,
      <Confirm userAccount={account} userCart={cart} total={cart.cart.total} />
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
      return <h1>Empty</h1>;
    } else if (this.state.loading) {
      return <Loading />;
    } else {
      return this.components();
    }
  }
}