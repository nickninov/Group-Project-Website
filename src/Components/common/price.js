
import React from 'react';

import './price.css';

const Price = (props) => {

	const noDiscount = (
		<h5 className="item-price">
			<CurrentPrice price={props.price} />
		</h5>
	)

	const withDiscount = (
		<h5 style={{ textAlign: props.oneLine ? 'start' : 'center' }} className="item-price">
			<CurrentPrice price={props.discount} />
			{ (props.oneLine) ? " " : <br /> }
			<PreviousPrice price={props.price} discount={props.discount} />
		</h5>
	)

	return props.discount == null ? noDiscount : withDiscount;
}

const CurrentPrice = (props) => <span className="item-price-current">£{(props.price).toFixed(2)}</span>;

const PreviousPrice = (props) => (
	<span className="item-price-original-wrapper">
		<DiscountPrct price={props.price} discount={props.discount} />
		&nbsp;
		£<span className="item-price-original">{(props.price).toFixed(2)}</span>
	</span>
)

const DiscountPrct = (props) => (
	<span className="item-prct-off">
		-{(((props.price - props.discount) / props.price) * 100).toFixed(0)}%
	</span>
)

export default Price;