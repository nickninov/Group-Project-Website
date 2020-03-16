import React from "react";

import Loading from "../Components/common/loading";

import Layout from "../Components/results/layout";
import Item from "../Components/results/item";

import { getSearchProduct } from "../API/api";

export default class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      products: null
    };
  }

  async componentDidMount() {
    let data = await getSearchProduct();

    this.setState({
      loading: false,
      products: data,
    });
  }

  components() {
    const objectResults = this.state.products.map(item => <Item item={item} />);

    return <Layout products={objectResults} />;
    
  }

  render() {
    return this.state.loading ? <Loading /> : this.components();
  }
}
