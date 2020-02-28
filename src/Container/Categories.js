import React, { Component } from 'react';
import { Dropdown } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import DropdownMenu from 'react-bootstrap/DropdownMenu';
import DropdownItem from 'react-bootstrap/DropdownItem';
import DropdownToggle from 'react-bootstrap/DropdownToggle';
import b from './Categories.css';

export class Categories extends React.Component {

    render() {
        return (
            //Possibility to add onClick function for each action (redirecting for example)
        
            <Dropdown>
                <Row>
            <Dropdown>
                <DropdownToggle
                alignRight
                variant="Secondary"
                id="dropdown-menu-align-right">
                    Lego
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem href="#/boxes">Boxes</DropdownItem>
                    <DropdownItem href="#/collectibles">Collectibles</DropdownItem>
                    <DropdownItem href="#/limited-edition">Limited Edition</DropdownItem>
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
                    <DropdownItem href="#/classics">Classics</DropdownItem>
                    <DropdownItem href="#/new-editions">New Editions</DropdownItem>
                    <DropdownItem href="#/more">More..</DropdownItem>
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
                    <DropdownItem href="#/characters">Characters</DropdownItem>
                    <DropdownItem href="#/dices">Dices</DropdownItem>
                    <DropdownItem href="#/boards">Boards</DropdownItem>
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
                    <DropdownItem href="#/something">Something</DropdownItem>
                    <DropdownItem href="#/something-else">Something else</DropdownItem>
                    <DropdownItem href="#/more">More</DropdownItem>
                </DropdownMenu>
            </Dropdown>
            <Dropdown>
                <DropdownToggle
                alignRight
                variant="Secondary"
                id="dropdown-menu-align-right">
                    More Categories
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem href="#/something">Something</DropdownItem>
                    <DropdownItem href="#/something-else">Something else</DropdownItem>
                    <DropdownItem href="#/more">More</DropdownItem>
                </DropdownMenu>
            </Dropdown>
            </Row>
            </Dropdown>
          
        );
    }
}