import React from "react";

import "./price.css";

const Price = (props) => {
  const price = props.price;
  const discountPerc = props.discount;

  function currentPrice(price) {
    return <span className="item-price-current">£{price.toFixed(2)}</span>;
  }

  if (discountPerc != 0 && discountPerc != null) {
    const discountPrice = price - (props.discount / 100) * price;

    return (
      <h5 className="item-price">
        {currentPrice(discountPrice)}
        {props.oneLine ? " " : <br />}
        <span className="item-price-original-wrapper">
          <span className="item-prct-off">-{discountPerc}%</span>
          &nbsp; £<span className="item-price-original">{price.toFixed(2)}</span>
        </span>
      </h5>
    );
  } else {
    return <h5 className="item-price">{currentPrice(price)}</h5>;
  }
};

export default Price;