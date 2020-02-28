import React from "react";

import Loading from "../Components/common/loading";
import BackwardButton from "../Components/common/buttons/backward_button";
import ForwardButton from "../Components/common/buttons/forward_button";

import Steps from "../Components/checkout/steps";
import CheckoutCart from "./checkout_cart";
import CheckoutDetails from "./checkout_details";
import CheckoutOptions from "./checkout_options";
import CheckoutConfirm from "./checkout_confirm";

import getCart from "../API/get_cart";
import getProfile from "../API/get_profile";

import "./checkout.css";

export default class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      index: 0,
      maxIndex: null
    };
  }

  async initSections() {
    let cartData = await getCart();
    let detailsData = await getProfile();

    let total = this.getTotal(cartData);

    let sectionList = [
      <CheckoutCart total={total} data={cartData} />,
      <CheckoutDetails data={detailsData} />,
      <CheckoutOptions />,
      <CheckoutConfirm
        cartData={cartData}
        total={total}
        detailsData={detailsData}
      />
    ];

    this.setState({
      loading: false,
      sectionList: sectionList,
      maxIndex: sectionList.length - 1
    });
  }

  getTotal(data) {
    let total = 0;
    data.map(obj => total += obj.discount_subtotal == null ? obj.price_subtotal : obj.discount_subtotal)
    return total;
}

  getSection(index) {
    return this.state.sectionList[index];
  }

  incrementSection = num => {
    let i = this.state.index;
    let l = this.state.maxIndex;

    if (num === 1 || num == null) {
      this.setState({ index: i >= l ? l : i + 1 });
    } else if (num === -1) {
      this.setState({ index: i <= 0 ? 0 : i - 1 });
    }
  };

  componentDidMount() {
    this.initSections();
  }

  components() {
    var section = this.getSection(this.state.index);

    return (
      <div className="checkout-wrapper">
        <div className="content-steps">
          <Steps index={this.state.index} />
        </div>

        <div className="content-wrapper">
          {section}
          <div className="content-navigator">
            <div
              style={{
                display: this.state.index == 0 ? "none" : "block"
              }}
              className="content-navigator-backwards"
            >
              <BackwardButton script={() => this.incrementSection(-1)} />
            </div>
            <div className="content-navigator-forwards">
              <ForwardButton script={() => this.incrementSection()} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return this.state.loading ? <Loading /> : this.components();
  }
}
