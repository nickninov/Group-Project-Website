import React from "react";

// components
import Loading from "../Components/common/loading";
import Layout from "../Components/product/layout";
import Images from "../Components/product/images";
import Info from "../Components/product/info";
import Availability from "../Components/product/avaliability";

// utility
import formatImageListURL from "../Utility/formatImageListURL";

// api
import { getSearchProductById, getUserCart, updateUserCart } from "../API/api";

export default class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true, // used to store state of loading
      quantity: 1, // quantity of product on screen
      product: null, // product being displayed
    };
  }

  async componentDidMount() {
    // get id from url
    const params = this.props.match.params;
    const { id } = params;

    // get information about the product by id
    let data = await getSearchProductById(id);

    // set the product from the server res
    this.setState({
      product: data.body[0],
      loading: false,
    });
  }

  // quantity controls (validation checks - upper and lower limits)
  increaseQuantity = () =>
    this.state.quantity < this.state.product.stock &&
    this.setState({ quantity: this.state.quantity + 1 });
  decreaseQuantity = () =>
    this.state.quantity > 1 &&
    this.setState({ quantity: this.state.quantity - 1 });

  addToCart = async () => {
    // get user token
    const token = await this.props.getToken();

    if (token == null) {
      // user is not logged in
      alert("You need to be logged in.");
    } else {
      // get current cart
      let currentCart = await getUserCart(token);

      // clean cart to only provide product and quantity
      let newCart = [];
      currentCart.body.cart.forEach((e) => {
        newCart.push({
          product: e.product._id,
          quantity: e.quantity,
        });
      });

      // to the new cart, add the relevant product with selected quantity
      newCart.push({
        product: this.state.product._id,
        quantity: this.state.quantity,
      });

      // send updated cart to server
      const res = await updateUserCart({ cart: newCart }, token);

      if (res.status == 200) {
        // on success, reload page
        window.location.reload();
      } else {
        alert("Something went wrong.");
      }
    }
  };

  components() {
    // get product information
    const product = this.state.product;

    // get properly formatted url images
    const productImages = formatImageListURL(product.images);

    // calculate discounts
    const totalDiscount = product.discount;
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
            rating={this.state.product.rating}
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
