import React from "react";
import { useHistory } from "react-router-dom";

import LoginForm from "../../Components/login/login_form";

import { postLogin } from "../../API/api";

export function AccountLogin(props) {
  const history = useHistory();

  async function apiCall(email, password) {
    await postLogin(email, password).then(res => {
      if (res.body.token != null) {
        props.setToken(res.body.token);
        history.push("/");
      } else {
        alert(JSON.stringify(res.body)); // #TODO
      }
    });
  }

  return <LoginForm callback={apiCall} />;
}
export default AccountLogin;
