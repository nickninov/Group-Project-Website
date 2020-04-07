import React, { useState } from "react";

// common
import CustomButton from "../../Components/common/custom_button";

// external
import { TextField } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";

import "./details.css";

export default function Details(props) {
  let user = props.account;

  const errors = props.errors;
  const errEx = errors != null ? true : false;

  console.log("errs in details");
  console.log(errors);

  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);

  function saveDetails() {
    props.onSave(firstName, lastName, email, phone);
  }

  function errCheckBool(attribute) {
    return errEx && errors[attribute] != "" ? true : false;
  }

  function errCheckText(attribute) {
    return errEx ? errors[attribute] : "";
  }

  return (
    <div>
      <div className="details-basic-credentials-wrapper">
        <div>
          <div>
            <TextField
              className="details-textfield"
              id="standard-basic"
              label="First Name"
              defaultValue={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              error={errCheckBool("firstName")}
              helperText={errCheckText("firstName")}
            />
            <TextField
              className="details-textfield"
              id="standard-basic"
              label="Last Name"
              defaultValue={lastName}
              onChange={(e) => setLastName(e.target.value)}
              error={errCheckBool("lastName")}
              helperText={errCheckText("lastName")}
            />
          </div>
          <div>
            <TextField
              className="details-textfield"
              id="standard-basic"
              label="Email"
              defaultValue={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errCheckBool("email")}
              helperText={errCheckText("email")}
            />
            <TextField
              className="details-textfield"
              id="standard-basic"
              label="Phone"
              defaultValue={phone}
              onChange={(e) => setPhone(e.target.value)}
              error={errCheckBool("phone")}
              helperText={errCheckText("phone")}
            />
          </div>
        </div>
        <div className="details-basic-credentials-button-wrapper">
          <div className="details-basic-credentials-button">
            <CustomButton
              bgColor="#da7272"
              textColor="#A72D2D"
              text="Save"
              icon={<SaveIcon />}
              script={saveDetails}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
