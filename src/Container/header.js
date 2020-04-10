import React from "react";

import NavBar from "../Components/header/nav_bar";

import { Typography } from "@material-ui/core";
import { Badge } from "@material-ui/core";

import { getUser } from "../API/api";

import { withRouter } from "react-router-dom";

// business logic component
export class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
    };
  }

  async logout() {
    await this.props.resetToken(null);
    console.log("token reset");
  }

  // DEVELOPMENT :: START
  async getSomething() {
    var data;
    data = await this.props.getToken();
    console.log("token: " + data);
  }
  // DEVELOPMENT :: END

  async componentDidMount() {
    const token = await this.props.getToken();

    if (token !== null) {
      await getUser(token).then((res) => this.setState({ data: res.body }));
    }
  }

  render() {
    const data = this.state.data;

    const message = data == null ? "Account" : "Welcome " + data.firstName;

    const basketAmount =
      data == null ? (
        "Cart"
      ) : (
        <Badge color="secondary" badgeContent={data.cartAmount} max={99}>
          Cart
        </Badge>
      );

    return (
      <div>
        <button onClick={() => this.getSomething()}>get token</button>
        <NavBar
          history={this.props.history}
          logout={() => this.logout()}
          message={message}
          basketAmount={basketAmount}
        />
      </div>
    );
  }
}

export default withRouter(Header);
