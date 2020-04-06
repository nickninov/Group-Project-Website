import React from "react";

import Loading from "../Components/common/loading";

import Layout from "../Components/product/layout";
import Images from "../Components/product/images";
import Info from "../Components/product/info";
import Availability from "../Components/product/avaliability";

import formatImageListURL from "../Utility/formatImageListURL";

import { getSearchProductById, getUserCart, updateUserCart } from "../API/api";

export default class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      quantity: 1,
      product: null,
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
      product: data.body[0],
      loading: false,
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
      try {
        const currentCart = await getUserCart(token);

        // # TODO, IDs aren't in cart items
        let inCart = false;
        currentCart.body.cart.forEach((e) => {
          if (e.product._id == this.state.product._id) {
            inCart = true;
          }
        });

        if (inCart) {
          alert("Product is in cart.");
        } else {
          currentCart.body.cart.push({
            quantity: this.state.quantity,
            product: this.state.product._id,
          });
          await updateUserCart(currentCart.body, token);
          window.location.reload();
        }
      } catch {
        alert("Error, please try again later.");
        window.location.reload();
      }
    }
  };

  _apiCart = async (token) => {
    const currentCart = await getUserCart(token);

    var cartItems = {
      cart: [],
    };

    cartItems.cart.push(this.state.product._id);

    try {
      currentCart.body.cart.forEach((i) => {
        cartItems.cart.push(i._id);
      });

      const res = await updateUserCart(cartItems, token);

      if (res.body.cart.length === cartItems.cart.length) {
        window.location.reload();
        return null;
      } else {
        alert("An error has occured.");
        return null;
      }
    } catch {
      console.log("Cannot get previous basket.");
      await updateUserCart(cartItems, token);
      window.location.reload();
    }
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
            id={product._id}
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
