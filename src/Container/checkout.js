import React from 'react';

import Loading from '../Components/common/loading';
import BackwardButton from '../Components/common/buttons/backward_button';
import ForwardButton from '../Components/common/buttons/forward_button';

import Steps from '../Components/checkout/steps';
import CheckoutCart from './checkout_cart';
import Details from '../Components/checkout/details';
import Options from '../Components/checkout/options';
import Confirm from '../Components/checkout/confirm';

import './checkout.css';

export default class Checkout extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      index: 0,
    };
  }

  initSections() {
    let sectionList = [
      <CheckoutCart />,
      <Details />,
      <Options />,
      <Confirm />
    ]

    this.setState({
      loading: false,
      sectionList: sectionList,
    });
  }

  getSection(index) {
    return this.state.sectionList[index];
  }

  incrementSection = (num) => {
    let i = this.state.index;
    let l = this.state.sectionList.length - 1;

    if (num === 1 || num == null) { this.setState({ index: i >= l ? l : (i + 1) }) }
      else if (num === -1) { this.setState({ index: i <= 0 ? 0 : (i - 1) }) };
  }

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
            <BackwardButton script={() => this.incrementSection(-1)} />
            <ForwardButton script={() => this.incrementSection()} />
          </div>
        </div>

      </div>
    );
  }

  render() { return this.state.loading ? <Loading /> : this.components() }
}
