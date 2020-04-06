import React from "react";

import * as FeatherIcon from "react-feather";
import LinesEllipsis from "react-lines-ellipsis";
import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";

import ViewProduct from "../common/buttons/view_product";
import Price from "../common/price";

import "./item.css";

export const Item = (props) => {
  const item = props.item;

  return (
    <Col className="item-wrapper" xs={12} md={4} lg={3}>
      <div className="item">
        {/* top section */}
        <div>
          {/* image, title, price */}
          <img className="item-image" src={item.images[0]} alt="Product" />
          <LinesEllipsis className="item-title" text={item.name} maxLine="2" />
          <Price oneLine={true} price={item.price} discount={item.discount} />
        </div>

        {/* bottom section */}
        <div className="item-controls">
          <Link style={{ textDecoration: "none" }} to={"product/" + item._id}>
            <ViewProduct />
          </Link>
        </div>
      </div>
    </Col>
  );
};

export default Item;
