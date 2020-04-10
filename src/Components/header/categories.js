import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import DropdownMenu from 'react-bootstrap/DropdownMenu';
import DropdownItem from 'react-bootstrap/DropdownItem';
import DropdownToggle from 'react-bootstrap/DropdownToggle';
import './categories.css';

export class Categories extends React.Component {

    render() {
        const category = this.props.category
        
        // Check if category is returned from back end
        if(category.length == 0){
            return (
                <Dropdown>
                    <Row>
                <Dropdown>
                    <DropdownToggle
                    // alignRight
                    variant="link"
                    id="dropdown-menu-align-right">
                        Lego
                    </DropdownToggle>
                    
                </Dropdown>
                <Dropdown>
                    <DropdownToggle
                    // alignRight
                    variant="link"
                    id="dropdown-menu-align-right">
                        Boardgame
                    </DropdownToggle>
                </Dropdown>
                <Dropdown>
                    <DropdownToggle
                    // alignRight
                    variant="link"
                    id="dropdown-menu-align-right">
                        D&D
                    </DropdownToggle>
                </Dropdown>
                <Dropdown>
                    <DropdownToggle
                    // alignRight
                    variant="link"
                    id="dropdown-menu-align-right">
                        Whats New
                    </DropdownToggle>
                </Dropdown>
                <Dropdown>
                    <DropdownToggle
                    // alignRight
                    variant="link"
                    id="dropdown-menu-align-right">
                        More Categories
                    </DropdownToggle>
                </Dropdown>
                </Row>
                </Dropdown>
              
            );
        }
        // Display categorie from the back end
        else {
            return (
                <Dropdown>
                    <Row>
                
                <Dropdown>
                    {category.map((item) => {
                        var link = "/search/"+item._id
                        return(
                            <DropdownToggle variant="link" id="dropdown-menu-align-right" href={link}>
                                {item.name}
                            </DropdownToggle>
                        );
                    })}
                </Dropdown>
                
                </Row>
                </Dropdown>
              
            );
        }
        
    }
}