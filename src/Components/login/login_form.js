import React, { useState } from "react";

// components
import CustomButton from "../../Components/common/custom_button";

// packages
import { FormGroup, FormControl, FormLabel } from "react-bootstrap";
import { useHistory } from "react-router-dom";

// styles
import "./login_form.css";

export const LoginForm = (props) => {

  const history = useHistory();

  // setup variables using hooks
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // validation of the form
  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  // prevent auto-refresh
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  // callback
  function handleCallback() {
    props.callback(email, password);
  }

  return (
    <div className="Login">
      <form onSubmit={handleSubmit}>
        {/* email */}
        <FormGroup controlId="email" bsSize="large">
          <FormLabel>Email</FormLabel>
          <FormControl
            autoFocus
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormGroup>
        {/* password */}
        <FormGroup controlId="password" bsSize="large">
          <FormLabel>Password</FormLabel>
          <FormControl
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
        </FormGroup>
        {/* custom button to display login button */}
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
              {/* custom button to display register button */}
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
