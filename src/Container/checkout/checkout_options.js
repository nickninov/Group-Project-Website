import React from "react";

import Loading from "../../Components/common/loading";
import Options from "../../Components/checkout/options";

export default class CheckoutOptions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    this.setState({
      loading: false,
    });
  }

  components() {
    return (
      <div>
          <Options />
      </div>
    );
  }

  render() {
    return this.state.loading ? <Loading /> : this.components();
  }
}
