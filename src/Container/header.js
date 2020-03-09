import React from "react";

import NavBar from "../Components/header/nav_bar";

import getUser from "../API/get_user";

// business logic component
export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    };
  }

  // DEVELOPMENT :: START
  async setSomething() {
    await this.props.resetToken(null);
    console.log("token reset");
  }

  async getSomething() {
    var data;
    data = await this.props.getToken();
    console.log("token: " + data);
  }

  async setSomethingElse() {
    await this.props.setCart({
      cart: ["5e5da05f60236d003da3ed4b"]
    });
  }

  async getSomethingElse() {
    var data;
    data = await this.props.getCart();
    console.log("cart: ");
    console.log(data);
  }
  // DEVELOPMENT :: END

  async componentDidMount() {
    const token = await this.props.getToken();

    if (token !== null) {
      await getUser(token).then(res => this.setState({ data: res }));
    }
  }

  render() {
    const data = this.state.data;

    const message = data == null ? "Account" : "Welcome " + data.firstName;
    const basketAmount =
      data == null ? "Cart" : "Cart (" + data.cartAmount + ")";

    return (
      <div>
        <button onClick={() => this.setSomething()}>reset</button>
        <button onClick={() => this.getSomething()}>get token</button>
        {/* <button onClick={() => this.setSomethingElse()}>set cart</button>
        <button onClick={() => this.getSomethingElse()}>get cart</button> */}
        <NavBar message={message} basketAmount={basketAmount} />
      </div>
    );
  }
}
