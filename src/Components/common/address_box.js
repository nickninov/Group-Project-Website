import React from "react";

// styles
import "./address_box.css";

export const AddressBox = (props) => {
  // get prop data
  const firstName = props.firstName;
  const lastName = props.lastName;
  const title = props.title;
  const addr = props.address;

  return (
    <div className="address-box-wrapper" style={{ height: "100%" }}>
      {/* if passed, add a title text from prop */}
      {title != null && <div className="address-box-title">{title}</div>}
      <div className="address-box-text">
        {firstName != null && lastName != null && (
          <div>
            To: {firstName} {lastName},
            <br />
          </div>
        )}
        {addr.firstLine},
        <br />
        {
          // if passed, add second line (optional)
          addr.secondLine != "" && (
            <div>
              {addr.secondLine},
              <br />
            </div>
          )
        }
        {addr.townCity},
        <br />
        {addr.county},
        <br />
        {addr.postcode}
        <br />
      </div>
      {
        // if passed, add any children to the bottom of the address box
        props.children != null && (
          <div className="address-box-children-wrapper">{props.children}</div>
        )
      }
    </div>
  );
};

export const AddressBoxes = (props) => {
  // get prop data
  const shipping = props.shipping;
  const billing = props.billing;

  // establish whether the addresses are the same
  const same =
    shipping.firstLine == billing.firstLine &&
    shipping.postcode == billing.postcode
      ? true
      : false;

  // render relevant content
  return (
    <div>
      {
        // if addresses are the same, render only one box
        same ? (
          <div className="address-boxes-addresses">
            <AddressBox
              address={shipping}
              firstName={props.firstName}
              lastName={props.lastName}
              title="SHIPPING + BILLING"
            />
          </div>
        ) : (
          <div className="address-boxes-addresses">
            <AddressBox
              address={shipping}
              firstName={props.firstName}
              lastName={props.lastName}
              title="SHIPPING"
            />
            <div style={{ marginRight: 20 }} />
            <AddressBox
              address={billing}
              firstName={props.firstName}
              lastName={props.lastName}
              title="BILLING"
            />
          </div>
        )
      }
    </div>
  );
};
