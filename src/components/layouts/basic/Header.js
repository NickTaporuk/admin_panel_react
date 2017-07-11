import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'

import { Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import { Link } from 'react-router-dom';

class Header extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        return(
            <Navbar collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to="/">
                            Ownhome Inc.
                        </Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <NavItem>
                            <Link to="/">
                                Home
                            </Link>
                        </NavItem>

                    </Nav>
                    <Nav pullRight>
                        <NavItem >
                            <Link to="/login">
                                Login
                            </Link>
                        </NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default connect(
    state => ({}),
    dispatch => ({})
)(withRouter(Header));