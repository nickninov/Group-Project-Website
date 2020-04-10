import React from "react";
import SearchIcon from '@material-ui/icons/Search';
import CustomButton from '../../Components/common/custom_button';
import './search_form.css';

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

                        <input 
                        type="text"
                        borderRadius={10}
                        value={this.state.value}
                        onChange={this.handleChange}
                        className="form-control"
                        name="search"
                        placeholder="Search..." />

                        <CustomButton
                          script={this.handleSubmit}
                          bgColor="#EAEFD3"
                          textColor="#A72D2D"
                          text="Search"
                          startIcon={<SearchIcon />} />
                            
                            
                     
                    </div>
                </form>
          </div>
        );
      }
    }
    
    