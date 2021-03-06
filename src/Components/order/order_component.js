import React from "react";

// components
import Price from "../common/price";
import { AddressBoxes } from "../common/address_box";

// utility
import { formatDate } from "../../Utility/formatDateUtility";

// api
import { updateRating } from "../../API/api";

// packages
import { Container, NavDropdown } from "react-bootstrap";
import Rating from "react-rating";
import CustomButton from "../common/custom_button";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import StarIcon from "@material-ui/icons/Star";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import ArtTrackIcon from "@material-ui/icons/ArtTrack";
import LocalActivityIcon from "@material-ui/icons/LocalActivity";

// styles
import "./order_component.css";

export default function OrderComponent(props) {
  // get prop data
  const order = props.order;
  const token = props.token;

  // setup variables using hooks
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(0);

  // callbacks
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  async function submitRating(product) {
    // Check selected stars
    if (value > 0) {
      // Push to database
      var productRequest = {
        product: product._id,
        rating: value,
      };

      var test = await updateRating(productRequest, token);
      console.log(test);
      // Reload page
      window.location.reload(false);
    } else {
      alert("Please rate product.");
    }
  }

  // generation of product list as jsx elements
  var productList = [];
  order.products.forEach((e) => {
    let product = e.product;

    // Product has no rating
    if (product.rating == 0) {
      productList.push(
        <div>
          <div className="order-item">
            <span className="order-item-ids">
              SKU: {product.sku}, ID: {product._id}
            </span>
            <div className="order-item-content">
              <div className="order-item-details">
                <div className="order-item-picture-wrapper">
                  <img
                    className="order-item-picture"
                    src={product.images[0]}
                    alt="product thumbnail"
                  />
                </div>
                <div className="order-item-text">
                  <p className="order-item-name">{product.name}</p>
                  <p className="order-item-price">
                    <Price
                      price={product.price}
                      discount={product.discount}
                      oneLine={true}
                    />
                    <span style={{ fontSize: 13, fontWeight: 400 }}>
                      Amount: {e.quantity}
                    </span>
                  </p>
                </div>
              </div>
              <div className="order-rating-wrapper">
                <CustomButton
                  text="Rate"
                  bgColor="#a4b0be"
                  textColor="#5d646f"
                  script={handleOpen}
                  icon={<StarIcon />}
                />
                <div style={{ marginRight: 25 }} />
                <CustomButton
                  text="View Product"
                  bgColor="#5d646f"
                  textColor="#a4b0be"
                  script={() => props.history.push(`/product/${product._id}`)}
                  icon={<ArtTrackIcon />}
                />
              </div>
            </div>
          </div>
          <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <div className="order-item-rate-modal">
              <Rating
                emptySymbol={<StarBorderIcon />}
                fullSymbol={<StarIcon />}
                fractions={1}
                initialRating={value}
                onChange={(rate) => setValue(rate)}
              />
              <div style={{ marginBottom: 25 }} />
              <CustomButton
                text="Submit Rating"
                bgColor="#5d646f"
                textColor="#a4b0be"
                script={() => submitRating(product)}
                icon={<LocalActivityIcon />}
              />
            </div>
          </Modal>
        </div>
      );
    } else {
      // Product is rated
      productList.push(
        <div>
          <div className="order-item">
            <span className="order-item-ids">
              SKU: {product.sku}, ID: {product._id}
            </span>
            <div className="order-item-content">
              <div className="order-item-details">
                <div className="order-item-picture-wrapper">
                  <img
                    className="order-item-picture"
                    src={product.images[0]}
                    alt="product thumbnail"
                  />
                </div>
                <div className="order-item-text">
                  <p className="order-item-name">{product.name}</p>
                  <p className="order-item-price">
                    <Price
                      price={product.price}
                      discount={product.discount}
                      oneLine={true}
                    />
                    <span style={{ fontSize: 13, fontWeight: 400 }}>
                      Amount: {e.quantity}
                    </span>
                  </p>
                </div>
              </div>
              <div className="order-rating-wrapper">
                <Rating
                  emptySymbol={<StarBorderIcon />}
                  fullSymbol={<StarIcon />}
                  initialRating={product.rating}
                  readonly={true}
                />
                <div style={{ marginRight: 25 }} />
                <CustomButton
                  text="View Product"
                  bgColor="#5d646f"
                  textColor="#a4b0be"
                  // #TODO
                  script={() => props.history.push(`/product/${product._id}`)}
                  icon={<ArtTrackIcon />}
                />
              </div>
            </div>
          </div>
        </div>
      );
    }
  });

  return (
    <Container className="order-wrapper">
      <Container className="order-attribute-wrapper">
        <div className="order-attribute">
          <p className="order-attribute-title">Order</p>
          <p className="order-attribute-value">#{order.orderNo}</p>
        </div>
        <div className="order-attribute">
          <p className="order-attribute-title">Date</p>
          <p className="order-attribute-value">{formatDate(order.date)}</p>
        </div>
        <div className="order-attribute">
          <p className="order-attribute-title">Status</p>
          <p className="order-attribute-value">{order.status}</p>
        </div>
        <div className="order-attribute">
          <p className="order-attribute-title">Delivery</p>
          <p className="order-attribute-value">
            £{(order.deliveryType == "priority" ? 3.99 : 0).toFixed(2)}
          </p>
        </div>
        <div className="order-attribute">
          <p className="order-attribute-title">Gift</p>
          <p className="order-attribute-value">{order.isGift ? "Yes" : "No"}</p>
        </div>
        <div className="order-attribute">
          <p className="order-attribute-title">Addresses</p>
          <p className="order-attribute-value">
            <NavDropdown
              className="order-attribute-to"
              title={<span className="order-attribute-to-text">Show</span>}
              id="collasible-nav-dropdown"
            >
              <AddressBoxes
                shipping={order.shippingAddress}
                billing={order.billingAddress}
              />
            </NavDropdown>
          </p>
        </div>
        <div className="order-attribute">
          <p className="order-attribute-title">Total</p>
          <p className="order-attribute-value">
            £
            {(
              (order.deliveryType == "priority" ? 3.99 : 0) + order.total
            ).toFixed(2)}
          </p>
        </div>
      </Container>
      <Container className="order-item-wrapper">{productList}</Container>
    </Container>
  );
}
