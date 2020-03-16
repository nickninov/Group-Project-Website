import React from "react";
import { useState } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import "./login_form.css";

import { useHistory } from "react-router-dom";
import CustomButton from "../../Components/common/custom_button";

export const LoginForm = props => {
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  const handleSubmit = event => {
    event.preventDefault();
  };

  function handleCallback() {
    props.callback(email, password);
  }

  return (
    <div className="Login">
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="email" bsSize="large">
          <FormLabel>Email</FormLabel>
          <FormControl
            autoFocus
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <FormLabel>Password</FormLabel>
          <FormControl
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
          />
        </FormGroup>
        <CustomButton
          fullWidth={true}
          script={handleCallback}
          bgColor="#A72D2D"
          textColor="#da7272"
          text="Login"
          disabled={!validateForm()}
        />

        <p className="p">
          <div className="checkout-details-change">
            <span>Don't have an account? </span>
            <div className="checkout-details-change-button">
              <CustomButton
                bgColor="#da7272"
                textColor="#A72D2D"
                text="Register"
                script={() => history.push("/register")}
              />
            </div>
          </div>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
