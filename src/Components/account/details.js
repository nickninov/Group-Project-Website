import React from "react";

import { TextField } from "@material-ui/core";
import { useState } from "react";

import VpnKeyIcon from "@material-ui/icons/VpnKey";
import SaveIcon from "@material-ui/icons/Save";

import EditIcon from "@material-ui/icons/Edit";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";

import CustomButton from "../../Components/common/custom_button";

import "./details.css";

export default function Details(props) {
  let user = props.userAccount;

  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);

  const delivery = <span className="details-box-special">DELIVERY</span>;
  const connector = <span className="details-box-special">+</span>;
  const billing = <span className="details-box-special">BILLING</span>;

  var addresses = user.addresses.map(e => {
    var special = null;

    if (e.isDelivery && e.isBilling) {
      special = (
        <div>
          {delivery} {connector} {billing}
        </div>
      );
    } else if (e.isDelivery) {
      special = <div>{delivery}</div>;
    } else if (e.isBilling) {
      special = <div>{billing}</div>;
    } else {
      special = <div />;
    }

    return (
      <div className="details-box">
        {special != null && (
          <div className="details-box-special-wrapper">{special}</div>
        )}
        <div className="details-box-text-wrapper">
          {e.firstLine},<br />
          {e.secondLine},<br />
          {e.townCity},<br />
          {e.county},<br />
          {e.postcode}
        </div>
        <div className="details-box-button-wrapper">
          <CustomButton
            script={() => props.updateTrigger(e)}
            text="Edit"
            // bgColor="#A72D2D"
            // textColor="#EAEFD3"
            bgColor="#95afc0"
            textColor="#535c68"
            icon={<EditIcon />}
          />
        </div>
      </div>
    );
  });
  addresses.push(
    <div className="details-box details-box-add">
      <CustomButton
        text="Add"
        // bgColor="#EAEFD3"
        // textColor="#A72D2D"
        bgColor="#535c68"
        textColor="#95afc0"
        script={props.createTrigger}
        icon={<PlaylistAddIcon />}
      />
    </div>
  );

  function saveDetails() {
    props.triggerDetailsUpdate(firstName, lastName, email, phone);
  }

  return (
    <div>
      <h1>Account</h1>
      <div className="details-basic-credentials-wrapper">
        <div>
          <div>
            <TextField
              className="details-textfield"
              id="standard-basic"
              label="First Name"
              defaultValue={firstName}
              onChange={e => setFirstName(e.target.value)}
            />
            <TextField
              className="details-textfield"
              id="standard-basic"
              label="Last Name"
              defaultValue={lastName}
              onChange={e => setLastName(e.target.value)}
            />
          </div>
          <div>
            <TextField
              className="details-textfield"
              id="standard-basic"
              label="Email"
              defaultValue={email}
              onChange={e => setEmail(e.target.value)}
            />
            <TextField
              className="details-textfield"
              id="standard-basic"
              label="Phone"
              defaultValue={phone}
              onChange={e => setPhone(e.target.value)}
            />
          </div>
        </div>
        <div className="details-basic-credentials-button-wrapper">
          <div className="details-basic-credentials-button">
            <CustomButton
              bgColor="#ff7675"
              textColor="#d63031"
              text="Password"
              icon={<VpnKeyIcon />}
              script={() => alert("reset password")}
            />
          </div>
          <div className="details-basic-credentials-button">
            <CustomButton
              bgColor="#A72D2D"
              textColor="#EAEFD3"
              text="Save"
              icon={<SaveIcon />}
              script={saveDetails}
            />
          </div>
        </div>
      </div>

      <h1 style={{ marginTop: 40 }}>Addresses</h1>
      <div className="details-content">{addresses}</div>
    </div>
  );
}
