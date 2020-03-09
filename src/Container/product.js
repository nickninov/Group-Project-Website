import React from "react";

import { useHistory } from "react-router-dom";

import Loading from "../Components/common/loading";

import Layout from "../Components/product/layout";
import Images from "../Components/product/images";
import Info from "../Components/product/info";
import Availability from "../Components/product/avaliability";

import formatImageListURL from "../Utility/formatImageListURL";

import getSearchProductById from "../API/get_search_product_by_id";
import getUserCart from "../API/get_user_cart";
import updateUserCart from "../API/update_user_cart";

export default class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      quantity: 1,
      product: null
    };
  }

  async componentDidMount() {
    //! KEEP THIS FOR REFERENCE, #TODO REMOVE AT PRODUCTION:
    // const {
    //   match: { params }
    // } = this.props;
    const params = this.props.match.params;
    const { id } = params;

    let data = await getSearchProductById(id);

    this.setState({
      product: data[0],
      loading: false
    });
  }

  increaseQuantity = () =>
    this.state.quantity < this.state.product.stock &&
    this.setState({ quantity: this.state.quantity + 1 });

  decreaseQuantity = () =>
    this.state.quantity > 1 &&
    this.setState({ quantity: this.state.quantity - 1 });

  addToCart = async () => {
    const token = await this.props.getToken();

    if (token == null) {
      alert("You need to be logged in.");
    } else {
      this._apiCart(token);
      // const currentCart = await this.props.getCart();

      // var newCart = {
      //   cart: []
      // };

      // newCart.cart.push(this.state.product._id);

      // if (currentCart.cart != null) {
      //   currentCart.cart.map(item => {
      //     newCart.cart.push(item);
      //   });
      // }

      // await this.props.setCart(newCart);

      // console.log(newCart);

      // newCart.push(this.state.product._id);

      // console.log(typeof currentCart);
      // console.log(currentCart);

      // if (currentCart != null) {
      //   currentCart.map(item => {
      //     newCart.push(item);
      //   })
      // }

      // await this.props.setCart(["hello", "there"]);

      // console.log(value);

      // const productId = this.state.product._id;
      // const currentCart = await this.props.getCart();

      // var newCart = [];
      // newCart.push(productId);

      // if (currentCart != null) {
      //   currentCart.map(item => {
      //     newCart.push(item);
      //   })
      // }

      // console.log(newCart)
    }
  };

  _tmp = async token => {
    const value = this.props.getCart();
    console.log(value);
    console.log(token);
  };

  _apiCart = async token => {
    // var newCart = [this.state.product._id];

    // console.log("refrsh crt");

    // var currentCart = await this.props.getCart();

    // currentCart != [] && newCart.concat(currentCart);

    // await this.props.setCart(newCart).then(async () => await this._tmp());

    // console.log(res);

    const currentCart = await getUserCart(token);

    var cartItems = {
      cart: []
    };

    cartItems.cart.push(this.state.product._id);

    try {
      currentCart.cart.map(i => {
        cartItems.cart.push(i._id);
      });
      const res = await updateUserCart(cartItems, token);
      if (res.cart.length == cartItems.cart.length) {
        window.location.reload();
      } else {
        alert("error has occured");
        console.log(res);
      }
    } catch {
      console.log("err in compiling previous basket");
      const res = await updateUserCart(cartItems, token);
      window.location.reload();
    }

    // const res = await updateUserCart(cartItems, token);

    // if (res.cart.length == cartItems.cart.length) {
    //   window.location.reload();
    // } else {
    //   alert("error has occured");
    //   console.log(res);
    // }
  };

  components() {
    const product = this.state.product;

    const productImages = formatImageListURL(product.images);

    const totalDiscount =
      product.discount == null ? null : product.discount * this.state.quantity;
    const totalPrice = product.price * this.state.quantity;

    return (
      <Layout
        left={<Images data={productImages} />}
        mid={
          <Info
            name={product.name}
            description={product.description}
            currentPrice={product.price}
            discountPrice={product.discount}
            categories={product.categories}
          />
        }
        right={
          <Availability
            // stock={0}
            // stock={5}
            stock={product.stock}
            quantity={this.state.quantity}
            increaseQuantity={this.increaseQuantity}
            decreaseQuantity={this.decreaseQuantity}
            price={totalPrice}
            discount={totalDiscount}
            addToCart={this.addToCart}
          />
        }
      />
    );
  }

  render() {
    return this.state.loading ? <Loading /> : this.components();
  }
}
