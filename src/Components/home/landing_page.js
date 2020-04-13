import React from "react";

// components
import { Slideshow } from "./slideshow";

// api
import { getSearchProductById } from "../../API/api";

// packages
import * as FeatherIcon from "react-feather";
import { Link } from "react-router-dom";
import Results from "../../Container/results";
import PersonIcon from "@material-ui/icons/Person";
import CustomButton from "../common/custom_button";

// styles
import "./landing_page.css";

export const LandingPage = (props) => {
  const data = props.data;

  return (
    <div className="home-section-wrapper">
      <div className="home-section-slideshow">
        <Slideshow />
      </div>

      {/* hero */}
      <div className="home-section-hero-alt home-section-hero">
        <img src={data.hero[0].url} />
        <h2>
          <span>{data.hero[0].small}</span>
          <br />
          {data.hero[0].big}
        </h2>
      </div>

      {/* new releases */}
      <div className="home-section">
        <div>
          <h2>
            New
            <br />
            Releases
          </h2>
          <span className="home-section-icon">
            <FeatherIcon.Loader size={42} />
          </span>
        </div>
        <div>
          {data.highlight.newProducts.map((e) => {
            return (
              <div className="home-section-item">
                <HighlightItem id={e} />
              </div>
            );
          })}
        </div>
      </div>

      {/* hero */}
      <div className="home-section-hero">
        <img src={data.hero[1].url} />
        <h2>
          <span>{data.hero[1].small}</span>
          <br />
          {data.hero[1].big}
        </h2>
      </div>

      {/* trending */}
      <div className="home-section-invert home-section ">
        <div>
          {data.highlight.trendingProducts.map((e) => {
            return (
              <div className="home-section-invert-item-last home-section-item">
                <HighlightItem id={e} />
              </div>
            );
          })}
        </div>
        <div>
          <h2>
            Now
            <br />
            Trending
          </h2>
          <span className="home-section-icon">
            <FeatherIcon.TrendingUp size={42} />
          </span>
        </div>
      </div>

      {/* favourites */}
      <div className="home-section">
        <div>
          <h2>
            Our
            <br />
            Favourites
          </h2>
          <span className="home-section-icon">
            <FeatherIcon.Award size={42} />
          </span>
        </div>
        <div>
          {data.highlight.favouriteProducts.map((e) => {
            return (
              <div className="home-section-item">
                <HighlightItem id={e} />
              </div>
            );
          })}
        </div>
      </div>

      {/* login/register for guests */}
      <div
        className="home-section-login"
        style={{ display: data.guest ? "block" : "none" }}
      >
        <div className="checkout-details-change">
          <span>Already have an account?</span>
          <div className="checkout-details-change-button">
            <CustomButton
              bgColor="#EAEFD3"
              textColor="#da7272"
              icon={<PersonIcon />}
              text="Sign In"
              script={() => props.history.push("login")}
            />
          </div>
          <span>or</span>
          <div className="checkout-details-change-button">
            <CustomButton
              bgColor="#EAEFD3"
              textColor="#da7272"
              icon={<PersonIcon />}
              text="Register"
              script={() => props.history.push("register")}
            />
          </div>
          <span>and become a member!</span>
        </div>
      </div>

      {/* all products */}
      <div className="home-section-products">
        <Results />
      </div>
    </div>
  );
};

class HighlightItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  async componentDidMount() {
    const res = await getSearchProductById(this.props.id);
    this.setState({
      item: res.body[0],
      loading: false,
    });
  }

  components() {
    const item = this.state.item;
    return (
      <div>
        <Link to={"product/" + item._id}>
          <img style={{ width: 170, height: 170 }} src={item.images[0]} />
        </Link>
      </div>
    );
  }

  render() {
    return this.state.loading ? <div /> : this.components();
  }
}

export default LandingPage;
