import React from "react";

// components
import Loading from "../Components/common/loading";
import Layout from "../Components/results/layout";
import Item from "../Components/results/item";

// api
import { getSearchProduct } from "../API/api";

export default class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true, // used to store state of loading
      products: null, // products that get passed to Layout
    };
  }

  async componentDidMount() {
    // get all products
    let data = await getSearchProduct();

    // set data from server res to state
    this.setState({
      loading: false,
      products: data.body,
    });
  }

  components() {
    // generate list of renderable products as jsx elements
    const objectResults = this.state.products.map((item) => (
      <Item item={item} />
    ));

    return <Layout products={objectResults} />;
  }

  render() {
    return this.state.loading ? <Loading /> : this.components();
  }
}
