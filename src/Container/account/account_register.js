import React from "react";

// components
import RegisterForm from "../../Components/register/register_form";

// packages
import { useHistory } from "react-router-dom";

// api
import { postRegister } from "../../API/api";

export function AccountRegister(props) {
  const history = useHistory();

  async function apiCall(
    firstName,
    lastName,
    email,
    phone,
    password,
    confirm_password
  ) {
    await postRegister(
      firstName,
      lastName,
      email,
      phone,
      password,
      confirm_password
    ).then((res) => {
      if (res.body.token != null) {
        props.setToken(res.body.token);
        history.push("/account");
      } else {
        // show validation error messages
        for (const property in res.body) {
          alert(`${res.body[property]}`);
        }
      }
    });
  }

  return <RegisterForm callback={apiCall} />;
}
export default AccountRegister;
