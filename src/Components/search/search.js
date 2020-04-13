import React from "react";

import Loading from "../../Components/common/loading";

import Layout from "../../Components/results/layout";
import Item from "../../Components/results/item";

import { getSearchProductByName } from "../../API/api";
import CentredText from "../common/centred_text";

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      products: null,
    };
  }

  async componentDidMount() {
    const params = this.props.match.params;
    const { id } = params;
    console.log(id);
    let data = await getSearchProductByName(id);

    this.setState({
      loading: false,
      products: data.body,
    });
  }

  components() {
    const objectResults = this.state.products.map((item) => (
      <Item item={item} />
    ));
    if (this.state.products.length == 0) {
      return <CentredText text="No Results" />;
    }

    return <Layout products={objectResults} />;
  }

  render() {
    return this.state.loading ? <Loading /> : this.components();
  }
}
