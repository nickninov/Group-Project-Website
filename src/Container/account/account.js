import React from "react";

import Loading from "../../Components/common/loading";

import Layout from "../../Components/account/layout";
import Details from "../../Components/account/details";
import Orders from "../../Components/account/orders";
import Address from "../../Components/account/address";

import getOrders from "../../API/get_orders";
import getUserAccount from "../../API/get_user_account";
import updateUserAccount from "../../API/update_user_account";

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

  triggerDetailsUpdate = async (firstName, lastName, email, phone) => {
    var currentData = this.state.userAccountData;

    currentData.firstName = firstName;
    currentData.lastName = lastName;
    currentData.email = email;
    currentData.phone = phone;

    const token = await this.props.getToken();
    await updateUserAccount(currentData, token).then(() =>
      window.location.reload()
    );
  };

  triggerAddressUpdate = address => {
    this.setState({ address: address, showModal: true });
  };

  discardAddress = () => {
    this.setState({ showModal: false });
  };

  saveAddress = async address => {
    var currentData = this.state.userAccountData;

    var indexToChange = 0;
    {
      let index = 0;
      currentData.addresses.forEach(e =>
        e._id === address._id ? (indexToChange = index) : index++
      );
    }

    // removing billing from other addresses
    address.isBilling &&
      currentData.addresses.forEach(e => (e.isBilling = false));

    // removing delivery from other addresses
    address.isDelivery &&
      currentData.addresses.forEach(e => (e.isDelivery = false));

    currentData.addresses[indexToChange] = address;

    const token = await this.props.getToken();
    await updateUserAccount(currentData, token).then(
      this.setState({ showModal: false })
    );
  };

  triggerAddressCreation = () => {
    this.setState({ address: null, showModal: true });
  };

  createAddress = async address => {
    var currentData = this.state.userAccountData;

    // removing billing from other addresses
    address.isBilling &&
      currentData.addresses.forEach(e => (e.isBilling = false));

    // removing delivery from other addresses
    address.isDelivery &&
      currentData.addresses.forEach(e => (e.isDelivery = false));

    currentData.addresses.push({
      firstLine: address.firstLine,
      secondLine: address.secondLine,
      townCity: address.townCity,
      county: address.county,
      postcode: address.postcode,
      isBilling: address.isBilling,
      isDelivery: address.isDelivery
    });

    const token = await this.props.getToken();
    await updateUserAccount(currentData, token).then(
      this.setState({ showModal: false })
    );
  };

  deleteAddress = async address => {
    var currentData = this.state.userAccountData;

    var indexToDelete = 0;
    {
      let index = 0;
      currentData.addresses.forEach(e =>
        e._id === address._id ? (indexToDelete = index) : index++
      );
    }

    currentData.addresses.splice(indexToDelete, indexToDelete + 1);

    const token = await this.props.getToken();
    await updateUserAccount(currentData, token).then(
      this.setState({ showModal: false })
    );
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
          left={
            <Details
              userAccount={this.state.userAccountData}
              triggerDetailsUpdate={this.triggerDetailsUpdate}
              updateTrigger={this.triggerAddressUpdate}
              createTrigger={this.triggerAddressCreation}
            />
          }
          right={
            <Orders
              data={this.state.ordersData}
              navigateToProduct={this.navigateToProduct}
            />
          }
        />
        {this.state.showModal ? (
          <Address
            show={this.state.showModal}
            address={this.state.address}
            onDiscard={this.discardAddress}
            onSave={this.saveAddress}
            onCreation={this.createAddress}
            onDelete={this.deleteAddress}
          />
        ) : (
          <div />
        )}
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
