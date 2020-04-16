import React from "react";

import SearchIcon from "@material-ui/icons/Search";
import CustomButton from "../../Components/common/custom_button";
import "./search_form.css";

export default class SearchForm extends React.Component {
  // setup variables
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      value: "",
    };

    this.handleChange = this.handleChange.bind(this);
  }

  // set value with the user input
  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  // prevent default auto-refreshing
  // update the url with the user input
  handleSubmit = async (e) => {
    e.preventDefault();
    const uri = encodeURIComponent(this.state.value.trim());
    this.props.history.push("/search/" + uri);
    window.location.reload();
  };

  render() {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <form className="form-inline">
          <div className="form-group">
            {/* search bar */}
            <input
              type="text"
              borderRadius={10}
              value={this.state.value}
              onChange={this.handleChange}
              className="form-control"
              name="search"
              placeholder="Search..."
            />
            {/* search button */}
            <CustomButton
              script={this.handleSubmit}
              bgColor="#EAEFD3"
              textColor="#A72D2D"
              text="Search"
              startIcon={<SearchIcon />}
            />
          </div>
        </form>
      </div>
    );
  }
}
