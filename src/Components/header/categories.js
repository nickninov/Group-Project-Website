import React from "react";
import { Dropdown } from "react-bootstrap";
import { Row } from "react-bootstrap";
import DropdownMenu from "react-bootstrap/DropdownMenu";
import DropdownItem from "react-bootstrap/DropdownItem";
import DropdownToggle from "react-bootstrap/DropdownToggle";
import "./categories.css";

export class Categories extends React.Component {
  render() {
    const category = this.props.category;

    return (
      <Dropdown>
        {category.map((item) => {
          var link = "/search/" + item._id;
          return (
            <DropdownToggle
              variant="link"
              id="dropdown-menu-align-right"
              href={link}
            >
              {item.name}
            </DropdownToggle>
          );
        })}
      </Dropdown>
    );
  }
}
