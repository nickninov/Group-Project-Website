import React, { useState } from "react";

// components
import CustomButton from "../../Components/common/custom_button";

// packages
import { useHistory } from "react-router-dom";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";

// styles
import "./register_form.css";

export default function RegisterForm(props) {
  const history = useHistory();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");

  function validateForm() {
    return (
      firstName.length > 0 &&
      lastName.length > 0 &&
      email.length > 0 &&
      phone.length > 0 &&
      password.length > 0 &&
      confirm_password.length > 0
    );
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  function handleCallback() {
    props.callback(
      firstName,
      lastName,
      email,
      phone,
      password,
      confirm_password
    );
  }

  return (
    <div className="Register">
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="firstName" bsSize="large">
          <FormLabel>First Name</FormLabel>
          <FormControl
            autoFocus
            type="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="lastName" bsSize="large">
          <FormLabel>Last Name</FormLabel>
          <FormControl
            type="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="email" bsSize="large">
          <FormLabel>Email</FormLabel>
          <FormControl
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="phone" bsSize="large">
          <FormLabel>Phone Number</FormLabel>
          <FormControl
            type="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <FormLabel>Password</FormLabel>
          <FormControl
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="confirm_password" bsSize="large">
          <FormLabel>Confirm Password</FormLabel>
          <FormControl
            type="password"
            value={confirm_password}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </FormGroup>
        {/* custom button to display register button */}
        <CustomButton
          fullWidth={true}
          script={handleCallback}
          bgColor="#A72D2D"
          textColor="#da7272"
          text="Register"
          disabled={!validateForm()}
        />
        <p className="p">
          <div className="checkout-details-change">
            <span>Already have an account? </span>
            <div className="checkout-details-change-button">
              {/* custom button to display login button */}
              <CustomButton
                bgColor="#da7272"
                textColor="#A72D2D"
                text="Login"
                script={() => history.push("/login")}
              />
            </div>
          </div>
        </p>
      </form>
    </div>
  );
}
