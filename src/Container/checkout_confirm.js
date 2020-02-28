import React from "react";

import Loading from "../Components/common/loading";
import Confirm from "../Components/checkout/confirm";

export default class CheckoutConfirm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: null
    };
  }

  componentDidMount() {
    this.setState({
      loading: false
    });
  }

  components() {
    return (
      <Confirm
        cartData={this.props.cartData}
        total={this.props.total}
        detailsData={this.props.detailsData}
      />
    );
  }

  render() {
    return this.state.loading ? <Loading /> : this.components();
  }
}
