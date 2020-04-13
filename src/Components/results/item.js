import React from "react";

import LinesEllipsis from "react-lines-ellipsis";
import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";

import ViewProduct from "../common/buttons/view_product";
import Price from "../common/price";

// styles
import "./item.css";

export const Item = (props) => {
  // item to render from prop
  const item = props.item;

  return (
    <Col className="item-wrapper" xs={12} md={4} lg={3}>
      <div className="item">
        {/* upper section */}
        <div>
          {/* image, title, price */}
          <img className="item-image" src={item.images[0]} alt="Product" />
          <LinesEllipsis className="item-title" text={item.name} maxLine="2" />
          <Price oneLine={true} price={item.price} discount={item.discount} />
        </div>

        {/* lower section */}
        <div className="item-controls">
          <Link style={{ textDecoration: "none" }} to={"/product/" + item._id}>
            <ViewProduct />
          </Link>
        </div>
      </div>
    </Col>
  );
};

export default Item;
