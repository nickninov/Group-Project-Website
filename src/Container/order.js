import React from "react";

import Loading from "../Components/common/loading";

import Modal from "react-bootstrap/Modal";
import OrderComponent from "../Components/order/order_component";

import { getOrders } from "../API/api";

export default class Order extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      modalVisible: false,
      token: ''
    };
  }

  async componentDidMount() {
    const token = await this.props.getToken();
    
    if (token == null) {
      this.props.history.push("/login");
    } else {
      this.setState({
        token: token
      })
      const { id } = this.props.match.params;

      this.initialiseOrder(token, id);
    }
  }

  async initialiseOrder(token, id) {
    const all = await getOrders(token);

    let order;

    all.body.forEach(e => {
      if (e._id == id) {
        order = e;
      }
    });

    if (order == null) {
      this.props.history.push("/account");
    } else {
      this.setState({
        order: order,
        loading: false
      });
    }
  }

  components() {
    const order = this.state.order;

    return (
      <OrderComponent
        history={this.props.history}
        order={order}
        token = {this.state.token}
      />
    );
  }

  render() {
    return this.state.loading ? <Loading /> : this.components();
  }
}
