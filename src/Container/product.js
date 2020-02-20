
import React from 'react';

import Loading from '../Components/common/loading';

import Layout from '../Components/product/layout';
import Images from '../Components/product/images';
import Info from '../Components/product/info';
import Availability from '../Components/product/avaliability';

import formatImageListURL from '../Utility/formatImageListURL';
import getProduct from '../API/get_product';

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
		let tmp = await getProduct(this.props.match.params.id);

		this.setState({
			product: tmp,
			loading: false,
		});
	}

	increaseQuantity = () => (this.state.quantity < this.state.product.stock) &&
		this.setState({ quantity: this.state.quantity + 1 });

	decreaseQuantity = () => (this.state.quantity > 1) &&
		this.setState({ quantity: this.state.quantity - 1 });

	addToCart = () => {

		// #TODO: save the selected product with quantity to cart and redirect user to cart
		alert("sku: " + this.state.product.sku + "\nquantity: " + this.state.quantity);
	}

	components() {

		const product = this.state.product;

		const productImages = formatImageListURL(product.image);

		const totalDiscount = (product.discount == null) ? null : product.discount * this.state.quantity;
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
		)
	}

	render() { return this.state.loading ? <Loading /> : this.components() }
}