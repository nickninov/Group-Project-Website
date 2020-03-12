import React from "react";

import Loading from "../../Components/common/loading";

import Layout from "../../Components/account/layout";
import Details from "../../Components/account/details";
import Orders from "../../Components/account/orders";

import getOrders from "../../API/get_orders";
import getUserAccount from "../../API/get_user_account";

export default class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      token: true,
      userAccountData: null,
      ordersData: null
    };
  }

  navigateToProduct = id => {
    return `/product/${id}`;
  };

  getData = async token => {
    //let done = 0;

    // getUserAccount(token).then(res => {
    //   this.setState({ userAccountData: res });
    //   //done++;
    // });

    // getOrders(token).then(res => {
    //   console.log(res);
    //   this.setState({ ordersData: res });
    //   //done++;
    // });
    // //done === 2 && this.setState({ loading: false });

    let [accData, orderData] = await Promise.all([
      getUserAccount(token),
      getOrders(token)
    ]);
    this.setState({
      ordersData: orderData,
      userAccountData: accData,
      loading: false
    });
  };

  async componentDidMount() {
    const token = await this.props.getToken();

    if (token !== null) {
      this.setState({ token: true });
      this.getData(token);
    } else {
      this.setState({ token: false });
    }
  }

  components() {
    return (
      <div>
        <Layout
          left={<Details data={this.state.userAccountData} />}
          right={
            <Orders
              data={this.state.ordersData}
              navigateToProduct={this.navigateToProduct}
            />
          }
        />
      </div>
    );
  }

  render() {
    if (this.state.token === false) {
      return (
        <h1>
          {/* #TODO */}
          <a href="/login">Log in.</a>
        </h1>
      );
    } else {
      return this.state.loading ? <Loading /> : this.components();
    }
  }
}
