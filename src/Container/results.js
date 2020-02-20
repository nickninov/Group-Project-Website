
import React from 'react';

import Loading from '../Components/common/loading';

import Layout from '../Components/results/layout';
import Item from '../Components/results/item';

export default class Results extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      products: null,
    };
  }

  componentDidMount() {

    // #TODO: change item to passed data (or from api call)
    let tmp = require('../API/MOCK_DATA.json');

    this.setState({
      loading: false,
      products: tmp,
    });
  }

  components() {

    const objectResults = this.state.products.map(item => <Item item={item} />)

    return (
      <Layout products={objectResults} />
    )
  }

  render() { return this.state.loading ? <Loading /> : this.components() }
}