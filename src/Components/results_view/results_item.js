import React from 'react';

import * as Icon from 'react-feather';
import LinesEllipsis from 'react-lines-ellipsis';
import { Col } from 'react-bootstrap';

import styles from './results_item.css';

export const ResultsItem = (props) => {

	const item = props.item;

	const itemOriginalPrice = (Math.floor(Math.random() * 3) + 1) === 3 ? (
		<span className="item-price-original-wrapper">  £<span className="item-price-original">
			{(item.price * 1.1).toFixed(2)}</span>
		</span>
	) : <div />

	return (
		<Col className="item-wrapper" xs={12} md={4} lg={3}>
			<div className="item">

				{/* top section */}
				<div>
					{/* image, title, price */}
					<img className="item-image" src={item.image} alt="Product" />
					<LinesEllipsis className="item-title" text={item.name} maxLine='2' />
					<h5 classname="item-price"><span style={{ fontWeight: 700 }}>£{item.price}</span>{itemOriginalPrice}</h5>
				</div>

				{/* bottom section */}
				<div className="item-controls">

					{/* left side */}
					<div>
						<Icon.Share className="icon" size="20" />
					</div>

					{/* right side */}
					<div className="item-add-cart">
						<Icon.ShoppingCart className="icon" size="20" />
						<span className="item-add-cart-text">Add to Cart</span>
					</div>

				</div>
				
			</div>
		</Col>
	)
}


