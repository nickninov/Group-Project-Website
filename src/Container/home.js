import React from "react";

import Loading from "../Components/common/loading";

import LandingPage from "../Components/home/landing_page";
import Item from "../Components/results/item";

import { getSearchProductById } from "../API/api";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  async componentDidMount() {
    const guest = (await this.props.getToken()) == null ? true : false;

    const pageData = {
      guest: guest,
      // slideshow: [],
      hero: [
        {
          url:
            "https://cdn.shopify.com/s/files/1/1504/8570/products/s-l1600_1_e46cb70f-fafe-4292-9249-0c46a950c23e_1024x1024.jpg?v=1548944935",
          small: "Available",
          big: "May 11th",
        },
        {
          url:
            "https://d1rw89lz12ur5s.cloudfront.net/photo/jeux3dragons/file/99f86bb0398c11e99a0fab28424873dd/1.jpg",
          small: "Out This",
          big: "Summer",
        },
      ],
      highlight: {
        newProducts: [
          "5e5da05f60236d003da3ed4b",
          "5e5da05f60236d003da3ed4b",
          "5e5da05f60236d003da3ed4b",
        ],
        trendingProducts: [
          "5e5da05f60236d003da3ed4b",
          "5e5da05f60236d003da3ed4b",
          "5e5da05f60236d003da3ed4b",
        ],
        favouriteProducts: [
          "5e5da05f60236d003da3ed4b",
          "5e5da05f60236d003da3ed4b",
          "5e5da05f60236d003da3ed4b",
        ]
      },
    };

    this.setState({
      data: pageData,
      loading: false,
    });
  }

  components() {
    return <LandingPage data={this.state.data} history={this.props.history} />;
  }

  render() {
    return this.state.loading ? <Loading /> : this.components();
  }
}
