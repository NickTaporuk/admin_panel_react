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

        const { user } = this.props;

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
                        <li>
                            <Link to="/">
                                Home
                            </Link>
                        </li>
                    </Nav>
                    <Nav pullRight>
                        <li>
                            {
                                user.token ?
                                <Link to="/logout">
                                    <span>
                                        ({user.user.first_name} {user.user.last_name})
                                    </span>
                                    Logout
                                </Link>     :
                                <Link to="/login">
                                    { user.message !== null && user.message.hasOwnProperty('text') && user.message.text !== undefined ? `(${user.message.text} | ${user.message.event})`: null }Login</Link>
                            }

                        </li>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}
function mapStateToProps(state) {

    const { user } = state;

    return {
        user,
    }
}

export default connect(
    mapStateToProps,
    dispatch => ({})
)(withRouter(Header));