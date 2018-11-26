import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
 } from 'reactstrap';
import { HashRouter, Link } from 'react-router-dom'

export default class Header extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div>
        <Navbar  light expand="md">
          <Link to="/home/">Be Informed</Link>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <HashRouter  basename={process.env.PUBLIC_URL + '/'}/>
              <NavItem>
                <Link to="/justvote/">Just Vote</Link>
              </NavItem>
              <NavItem>
                <Link to="/justvolu/">Just Volunteer</Link>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}