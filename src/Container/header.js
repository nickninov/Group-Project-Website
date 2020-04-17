import React from "react";

// components
import NavBar from "../Components/header/nav_bar";

// packages
import { Badge } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

// api
import { getUser, getSearchCategories } from "../API/api";

export class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null, // data to populate the personalised account and cart buttons
      category: [], // categories shown on header
    };
  }

  async logout() {
    await this.props.resetToken(null);
  }

  async componentDidMount() {
    // get user token
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

    // set display data to relevant session state, guest or logged in
    const message = data == null ? "Account" : "Welcome " + data.firstName;
    const basketAmount =
      data == null ? (
        "Cart"
      ) : (
        // badge with number of products in the cart
        <Badge color="secondary" badgeContent={data.cartAmount} max={99}>
          <ShoppingCartIcon />
        </Badge>
      );

    return (
      <NavBar
        history={this.props.history}
        logout={() => this.logout()}
        message={message}
        basketAmount={basketAmount}
        category={this.state.category}
      />
    );
  }
}

export default withRouter(Header);
