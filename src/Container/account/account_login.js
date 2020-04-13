import React from "react";

// components
import LoginForm from "../../Components/login/login_form";

// packages
import { useHistory } from "react-router-dom";

// api
import { postLogin } from "../../API/api";

export function AccountLogin(props) {
  const history = useHistory();

  async function apiCall(email, password) {
    await postLogin(email, password).then((res) => {
      if (res.body.token != null) {
        props.setToken(res.body.token);
        history.push("/");
      } else {
        // show validation error messages
        for (const property in res.body) {
          alert(`${res.body[property]}`);
        }
      }
    });
  }

  return <LoginForm callback={apiCall} />;
}
export default AccountLogin;
