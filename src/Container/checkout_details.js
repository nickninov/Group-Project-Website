import React from "react";

import Loading from "../Components/common/loading";
import Details from "../Components/checkout/details";

import getProfile from "../API/get_profile";

export default class CheckoutDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: null
    };
  }

  async componentDidMount() {
    let data = await getProfile();

    this.setState({
      loading: false,
      data: data
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
