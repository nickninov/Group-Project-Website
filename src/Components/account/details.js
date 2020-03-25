import React from "react";

import { TextField } from "@material-ui/core";
import { useState } from "react";

import VpnKeyIcon from "@material-ui/icons/VpnKey";
import SaveIcon from "@material-ui/icons/Save";

import EditIcon from "@material-ui/icons/Edit";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";

import { AddressBox } from "../common/address_box";

import CustomButton from "../../Components/common/custom_button";

import "./details.css";

export default function Details(props) {
  let user = props.userAccount;

  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);

  var addresses = user.addresses.map(e => {
    var eTitle = null;
    if (e.isDelivery && e.isBilling) {
      eTitle = "DELIVERY + BILLING";
    } else if (e.isDelivery) {
      eTitle = "DELIVERY";
    } else if (e.isBilling) {
      eTitle = "BILLING";
    }

    return (
      <div className="details-address-wrapper">
        <AddressBox title={eTitle} address={e} fullHeight={true}>
          <CustomButton
            script={() => props.updateTrigger(e)}
            text="Edit"
            bgColor="#95afc0"
            textColor="#535c68"
            icon={<EditIcon />}
          />
        </AddressBox>
      </div>
    );
  });

  addresses.push(
    <div className="details-box-add">
      <CustomButton
        text="Add"
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
      <h1 style={{ marginBottom: 20 }}>Account</h1>
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

      <h1 style={{ marginTop: 60, marginBottom: 20 }}>Addresses</h1>
      <div className="details-content">{addresses}</div>
    </div>
  );
}
