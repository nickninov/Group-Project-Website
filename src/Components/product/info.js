
import React from 'react';

import Price from '../common/price';

import './info.css';

const Info = (props) => {

	const productCategories = props.categories.map(cat =>
		<span className="chip">{cat.name.toUpperCase()}</span>
	);

	return (
		<div>

			<div className="chip-wrapper">
				{productCategories}
			</div>

			<h1>{props.name}</h1>
			<p className="product-desc">{props.description}</p>

			<Price oneLine={true} price={props.currentPrice} discount={props.discountPrice} />

		</div>
	)

}

export default Info;