import React from "react";

// components
import Price from "../common/price";

// packages
import * as FeatherIcon from "react-feather";

// styles
import "./info.css";

const Info = (props) => {
  // allow user to copy link to product to clipboard
  function share() {
    const port = window.location.port;
    navigator.clipboard.writeText(
      window.location.hostname +
        (port != null && ":" + port) +
        "/product/" +
        props.id
    );
    document.getElementById("vis").style.display = "inline";
  }

  // generate product categories as jsx elements
  const productCategories = props.categories.map((cat) => (
    <span className="chip">{cat.name.toUpperCase()}</span>
  ));

  return (
    <div>
      {/* display categories */}
      <div className="chip-wrapper">{productCategories}</div>

      {/* display product name and desc. */}
      <h1>{props.name}</h1>
      <p className="product-desc">{props.description}</p>
      {/* share product */}
      <div onClick={share} className="product-share">
        <FeatherIcon.Share color="black" size="20" />
        <span
          id="vis"
          style={{
            marginLeft: 10,
            marginTop: 15,
            display: "none",
          }}
        >
          Link copied!
        </span>
      </div>
      {/* display product price */}
      <Price
        oneLine={true}
        price={props.currentPrice}
        discount={props.discountPrice}
      />
    </div>
  );
};

export default Info;
