import React from "react";
import { useHistory } from "react-router-dom";

import LoginForm from "../../Components/login/login_form";
import postLogin from "../../API/post_login";

export function AccountLogin(props) {
  const history = useHistory();

  async function apiCall(email, password) {
    await postLogin(email, password).then(res => {
      if (res.token != null) {
        props.setToken(res.token);
        history.push("/account");
      } else {
        alert(JSON.stringify(res)); // #TODO
      }
    });
  }

  return <LoginForm callback={apiCall} />;
}
export default AccountLogin;
