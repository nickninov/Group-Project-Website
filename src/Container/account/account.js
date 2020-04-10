import React from "react";

// containers
import AccountAddresses from "./account_addresses";

// components
import Layout from "../../Components/account/layout";
import Details from "../../Components/account/details";
import Orders from "../../Components/account/orders";

// common
import Loading from "../../Components/common/loading";

// api
import { getOrders, getUserAccount, updateUserAccount } from "../../API/api";

export default class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      account: null,
      errors: null,
      order: null,
    };
  }

  onSave = async (firstName, lastName, email, phone) => {
    let acc = JSON.parse(JSON.stringify(this.state.account));

    console.log("acc in onSave");
    console.log(acc);

    acc.firstName = firstName;
    acc.lastName = lastName;
    acc.email = email;
    acc.phone = phone;

    const token = await this.props.getToken();
    const res = await updateUserAccount(acc, token);

    if (res.status == 200) {
      window.location.reload();
    } else if (res.status == 400) {
      let rawErrors = res.body;

      const errors = {
        firstName: rawErrors.firstName != null ? rawErrors.firstName : "",
        lastName: rawErrors.lastName != null ? rawErrors.lastName : "",
        email: rawErrors.email != null ? rawErrors.email : "",
        phone: rawErrors.phone != null ? rawErrors.phone : "",
      };

      this.setState({
        errors,
      });
    } else {
      alert("Something went wrong.");
    }
  };

  async componentDidMount() {
    const token = await this.props.getToken();

    if (token !== null) {
      let [account, orders] = await Promise.all([
        getUserAccount(token),
        getOrders(token),
      ]);

      this.setState({
        token: token,
        account: account.body,
        orders: orders.body,
        loading: false,
      });
    } else {
      this.props.history.push("/login");
    }
  }

  components() {
    return (
      <Layout
        details={
          <Details
            account={this.state.account}
            onSave={this.onSave}
            errors={this.state.errors}
          />
        }
        addresses={
          <AccountAddresses
            token={this.state.token}
            history={this.props.history}
            account={this.state.account}
          />
        }
        orders={
          <Orders history={this.props.history} orders={this.state.orders} />
        }
      />
    );
  }

  render() {
    if (this.state.loading) {
      return <Loading />;
    } else {
      return this.components();
    }
  }
}
