import React from "react";

import "./address_box.css";

export const AddressBox = props => {
  const firstName = props.firstName;
  const lastName = props.lastName;
  const title = props.title;
  const addr = props.address;

  console.log(addr);

  return (
    <div className="address-box-wrapper" style={{height: '100%'}}>
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
        {addr.secondLine != "" && (
          <div>
            {addr.secondLine},
            <br />
          </div>
        )}
        {addr.townCity},
        <br />
        {addr.county},
        <br />
        {addr.postcode}
        <br />
      </div>
      {props.children != null && (
          <div className="address-box-children-wrapper">{props.children}</div>
        )}
    </div>
  );
};

export const AddressBoxes = props => {
  const shipping = props.shipping;
  const billing = props.billing;

  const same =
    shipping.firstLine == billing.firstLine &&
    shipping.postcode == billing.postcode
      ? true
      : false;

  return (
    <div>
      {same ? (
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
      )}
    </div>
  );
};
