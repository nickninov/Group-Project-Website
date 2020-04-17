import React from "react";

// components
import Loading from "../Components/common/loading";

// packages
import OrderComponent from "../Components/order/order_component";

// api
import { getOrders } from "../API/api";

export default class Order extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true, // used to store state of loading
      modalVisible: false, // modal visibility
      token: "", // token of user
    };
  }

  async componentDidMount() {
    // get used token
    const token = await this.props.getToken();

    if (token == null) {
      // if no token available, push to login page
      this.props.history.push("/login");
    } else {
      // if token present, set token in state
      this.setState({ token });

      // by ID in url, begin fetch of relevent order
      const { id } = this.props.match.params;
      this.initialiseOrder(token, id);
    }
  }

  async initialiseOrder(token, id) {
    // get all user orders
    const all = await getOrders(token);

    let order;

    // find relevant order
    all.body.forEach((e) => {
      if (e._id == id) {
        order = e;
      }
    });

    if (order == null) {
      // if no order exists, redirect to cart
      this.props.history.push("/account");
    } else {
      // set the order displayed to the order found from server res
      this.setState({
        order: order,
        loading: false,
      });
    }
  }

  components() {
    // get order from state
    const order = this.state.order;

    // display relevant order
    return (
      <OrderComponent
        history={this.props.history}
        order={order}
        token={this.state.token}
      />
    );
  }

  render() {
    return this.state.loading ? <Loading /> : this.components();
  }
}
