import React from "react";

import NavBar from "../Components/header/nav_bar";

import { getUser, getSearchCategories } from "../API/api";
import { Badge } from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

import { withRouter } from "react-router-dom";

// business logic component
export class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      category: [],
    };
  }

  async logout() {
    await this.props.resetToken(null);
    console.log("token reset");
  }

  // #TODO DEVELOPMENT :: START
  async getSomething() {
    var data;
    data = await this.props.getToken();
    console.log("The icon of sin!");
  }
  // DEVELOPMENT :: END

  async componentDidMount() {
    const token = await this.props.getToken();

    if (token != null) {
      await getUser(token).then((res) => this.setState({ data: res.body }));
    }

    var res = await getSearchCategories();
    // Check if items are successfully returned
    if (res.status == 200) {
      this.setState({
        category: res.body,
      });
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
          <ShoppingCartIcon />
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
          category={this.state.category}
        />
      </div>
    );
  }
}

export default withRouter(Header);
