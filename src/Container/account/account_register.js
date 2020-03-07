import React from "react";
import { useHistory } from "react-router-dom";

import RegisterForm from "../../Components/register/register_form";
import postRegister from "../../api/post_register";

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
      if (res.token != null) {
        props.setToken(res.token);
        history.push("/account");
      } else {
        alert(JSON.stringify(res)); // #TODO
      }
    });
  }

  return <RegisterForm callback={apiCall} />;
}
export default AccountRegister;
