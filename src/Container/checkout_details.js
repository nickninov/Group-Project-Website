import React from "react";

import Loading from "../Components/common/loading";
import Details from "../Components/checkout/details";

export default class CheckoutDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: null
    };
  }

  componentDidMount() {
    this.setState({
      loading: false,
      data: this.props.data,
    });
  }

  components() {
    return (
      <div>
        <Details
            data={this.state.data}
        />
      </div>
    );
  }

  render() {
    return this.state.loading ? <Loading /> : this.components();
  }
}
