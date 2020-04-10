import React from "react";

import {getSearchProductByName} from "../../API/api";

import { Link } from "react-router-dom";

export default class SearchForm extends React.Component {
  
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            value: ''}
          this.handleChange = this.handleChange.bind(this);
        };

      handleChange(event) {
        this.setState({value: event.target.value});
      }

      handleSubmit = async e => {

        e.preventDefault();
        const uri = encodeURIComponent(this.state.value.trim());
        this.props.history.push("/search/" + uri );
        window.location.reload();
//        const searchTerm = this.state.value;
 //         const res = getSearchProductByName(searchTerm)
 //         console.log(res)
      }

      render() {

        return (
        <div>
           <form className="form-inline">

                    <div className="form-group">
                        <input type="text"
                        value={this.state.value}
                        onChange={this.handleChange}
                        className="form-control"
                        name="search"
                        placeholder="Search..." />

                          
                            <button className="btn btn-primary"
                            onClick={this.handleSubmit}>Search</button>
                     
                    </div>
                </form>
          </div>
        );
      }
    }
    
    