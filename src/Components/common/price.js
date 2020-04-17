import React from "react";

// styles
import "./price.css";

const Price = (props) => {
  // get prop data
  const price = props.price;
  const discountPerc = props.discount;

  // current price function displayed in discounted and not discounted prices
  function currentPrice(price) {
    return <span className="item-price-current">£{price.toFixed(2)}</span>;
  }

  if (discountPerc != 0 && discountPerc != null) {
    // offer exists

    // find discount
    const discountPrice = price - (props.discount / 100) * price;

    return (
      <h5 className="item-price">
        {currentPrice(discountPrice)}
        {props.oneLine ? " " : <br />}
        <span className="item-price-original-wrapper">
          <span className="item-prct-off">-{discountPerc}%</span>
          &nbsp; £
          <span className="item-price-original">{price.toFixed(2)}</span>
        </span>
      </h5>
    );
  } else {
    // no offer exists
    return <h5 className="item-price">{currentPrice(price)}</h5>;
  }
};

export default Price;
