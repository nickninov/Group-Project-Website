import React, { Component } from 'react';
import { Dropdown } from 'react-bootstrap';
import DropdownMenu from 'react-bootstrap/DropdownMenu';
import DropdownItem from 'react-bootstrap/DropdownItem';
import DropdownToggle from 'react-bootstrap/DropdownToggle';

export class Categories extends React.Component {

    render() {
        return (
            //Possibility to add onClick function for each action (redirecting for example)
            <Dropdown>
            <Dropdown>
                <DropdownToggle
                alignRight
                variant="Secondary"
                id="dropdown-menu-align-right">
                    Lego
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem href="#/action-1">Boxes</DropdownItem>
                    <DropdownItem href="#/action-2">Collectibles</DropdownItem>
                    <DropdownItem href="#/action-3">Limited Edition</DropdownItem>
                </DropdownMenu>
            </Dropdown>
            <Dropdown>
                <DropdownToggle
                alignRight
                variant="Secondary"
                id="dropdown-menu-align-right">
                    Boardgame
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem href="#/action-1">Classics</DropdownItem>
                    <DropdownItem href="#/action-2">New Editions</DropdownItem>
                    <DropdownItem href="#/action-3">More..</DropdownItem>
                </DropdownMenu>
            </Dropdown>
            <Dropdown>
                <DropdownToggle
                alignRight
                variant="Secondary"
                id="dropdown-menu-align-right">
                    D&D
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem href="#/action-1">Characters</DropdownItem>
                    <DropdownItem href="#/action-2">Dices</DropdownItem>
                    <DropdownItem href="#/action-3">Boards</DropdownItem>
                </DropdownMenu>
            </Dropdown>
            <Dropdown>
                <DropdownToggle
                alignRight
                variant="Secondary"
                id="dropdown-menu-align-right">
                    Whats New
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem href="#/action-1">Something</DropdownItem>
                    <DropdownItem href="#/action-2">Something else</DropdownItem>
                    <DropdownItem href="#/action-3">More</DropdownItem>
                </DropdownMenu>
            </Dropdown>
            </Dropdown>
        );
    }
}