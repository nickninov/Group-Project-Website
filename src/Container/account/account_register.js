import React from "react";
import { useHistory } from "react-router-dom";

import RegisterForm from "../../Components/register/register_form";

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
    ).then(res => {
      if (res.body.token != null) {
        props.setToken(res.body.token);
        history.push("/account");
      } else {
        alert(JSON.stringify(res.body)); // #TODO
      }
    });
  }

  return <RegisterForm callback={apiCall} />;
}
export default AccountRegister;
