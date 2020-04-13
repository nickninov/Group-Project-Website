import React from "react";

// components
import QuantityControls from "../common/quantity_controls";
import AddToCart from "../common/buttons/add_to_cart";
import Price from "../common/price";

// packages
import { Row } from "react-bootstrap";
import { Paper } from "@material-ui/core";
import { Check, Warning } from "@material-ui/icons";
import Rating from "react-rating";
import StarIcon from "@material-ui/icons/Star";
import StarBorderIcon from "@material-ui/icons/StarBorder";

// styles
import "./avaliability.css";

const Availability = (props) => (
  <Paper
    elevation={3}
    style={{
      // height: '100%',
      borderRadius: "10px",
      backgroundColor: "#F8F8F8",
    }}
  >
    {
      // show item as unavaliable to purchase when there is no stock
      props.stock === 0 ? (
        <div className="data-wrapper" style={{ justifyContent: "center" }}>
          <h5 className="out-of-stock-text">
            Currently
            <br />
            Unavailable
          </h5>
        </div>
      ) : (
        <div className="data-wrapper">
          <div className="upper-data">
            {/* stock */}
            <span className="header-label">Availability</span>
            <Row className="stock-wrapper">
              {props.stock > 10 ? (
                <div className="stock-data">
                  <h5 className="stock-text">In stock</h5>
                  <Check />
                </div>
              ) : (
                <div className="stock-data" style={{ color: "#d63031" }}>
                  <h5 className="stock-text">Low Stock</h5>
                  <Warning />
                </div>
              )}
            </Row>

            {/* display rating */}
            <span className="header-label">Rating</span>
            <div style={{ marginBottom: 10, textAlign: "center" }}>
              {props.rating.ratedBy > 0 ? (
                <div>
                  <div>
                    <Rating
                      emptySymbol={<StarBorderIcon />}
                      fullSymbol={<StarIcon />}
                      fractions={2}
                      initialRating={props.rating.stars}
                      readonly={true}
                    />
                  </div>
                  <span style={{ fontSize: 12 }}>
                    {props.rating.ratedBy}{" "}
                    {props.rating.ratedBy == 1 ? "rating" : "ratings"}
                  </span>
                </div>
              ) : (
                <div>
                  <div style={{ opacity: "10%" }}>
                    <Rating
                      emptySymbol={<StarBorderIcon />}
                      fullSymbol={<StarIcon />}
                      fractions={2}
                      initialRating={props.rating.stars}
                      readonly={true}
                    />
                  </div>
                  <span style={{ fontSize: 12 }}>No ratings</span>
                </div>
              )}
            </div>

            {/* quantity */}
            <span className="header-label">Quantity</span>
            <QuantityControls
              quantity={props.quantity}
              increase={props.increaseQuantity}
              decrease={props.decreaseQuantity}
            />

            {/* total */}
            <span className="header-label">Total</span>
            <div className="full-price-wrapper">
              <Price price={props.price} discount={props.discount} />
            </div>
          </div>

          {/* add to cart */}
          <AddToCart script={props.addToCart} />
        </div>
      )
    }
  </Paper>
);

export default Availability;
