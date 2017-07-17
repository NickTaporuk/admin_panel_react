import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'
import cn from 'classnames';
import { Link } from 'react-router-dom';
import { SIDEBAR_STATE } from './../../../reducers/types/sidebar';
import Img from './../../../img/defaults/default_avatar.jpg';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userMenu : false
        };

        this.showUserMenu = this.showUserMenu.bind(this);
        this.hideUserMenu = this.hideUserMenu.bind(this);
        this.onSidebarState = this.onSidebarState.bind(this);
    }
    onSidebarState(e) {
        e.preventDefault();
        const { sidebar, onSidebarReduxState } = this.props;

        onSidebarReduxState(!sidebar)
    }

    showUserMenu() {
        this.setState({ userMenu: true });
        document.addEventListener("click", this.hideUserMenu);
    }

    hideUserMenu() {
        this.setState({ userMenu: false });
        document.removeEventListener("click", this.hideUserMenu);
    }

    headerMarkup(user) {

        return user.isAuthenticated ?
            <header className="main-header">
            <Link to="/" className="logo">
                <span className="logo-mini"><b>O</b>WH</span>
                <span className="logo-lg"><b>O</b>wnhome admin</span>
            </Link>
            <nav className="navbar navbar-static-top">
                <a className="sidebar-toggle" onClick={this.onSidebarState}>
                    <span className="sr-only">Toggle navigation</span>
                </a>

                <div className="navbar-custom-menu">
                    <ul className="nav navbar-nav">
                        <li className="dropdown messages-menu">
                            <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                <i className="fa fa-envelope-o"></i>
                                <span className="label label-success">4</span>
                            </a>
                            <ul className="dropdown-menu">
                                <li className="header">You have 4 messages</li>
                                <li>
                                    <ul className="menu">
                                        <li>
                                            <a href="#">
                                                <div className="pull-left">
                                                    <img src="dist/img/user2-160x160.jpg" className="img-circle" alt="User Image"/>
                                                </div>
                                                <h4>
                                                    Support Team
                                                    <small><i className="fa fa-clock-o"></i> 5 mins</small>
                                                </h4>
                                                <p>Why not buy a new awesome theme?</p>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <div className="pull-left">
                                                    <img src="dist/img/user3-128x128.jpg" className="img-circle" alt="User Image"/>
                                                </div>
                                                <h4>
                                                    AdminLTE Design Team
                                                    <small><i className="fa fa-clock-o"></i> 2 hours</small>
                                                </h4>
                                                <p>Why not buy a new awesome theme?</p>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <div className="pull-left">
                                                    <img src="dist/img/user4-128x128.jpg" className="img-circle" alt="User Image"/>
                                                </div>
                                                <h4>
                                                    Developers
                                                    <small><i className="fa fa-clock-o"></i> Today</small>
                                                </h4>
                                                <p>Why not buy a new awesome theme?</p>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <div className="pull-left">
                                                    <img src="dist/img/user3-128x128.jpg" className="img-circle" alt="User Image"/>
                                                </div>
                                                <h4>
                                                    Sales Department
                                                    <small><i className="fa fa-clock-o"></i> Yesterday</small>
                                                </h4>
                                                <p>Why not buy a new awesome theme?</p>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <div className="pull-left">
                                                    <img src="dist/img/user4-128x128.jpg" className="img-circle" alt="User Image"/>
                                                </div>
                                                <h4>
                                                    Reviewers
                                                    <small><i className="fa fa-clock-o"></i> 2 days</small>
                                                </h4>
                                                <p>Why not buy a new awesome theme?</p>
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li className="footer"><a href="#">See All Messages</a></li>
                            </ul>
                        </li>
                        <li className="dropdown notifications-menu">
                            <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                <i className="fa fa-bell-o"></i>
                                <span className="label label-warning">10</span>
                            </a>
                            <ul className="dropdown-menu">
                                <li className="header">You have 10 notifications</li>
                                <li>
                                    <ul className="menu">
                                        <li>
                                            <a href="#">
                                                <i className="fa fa-users text-aqua"></i> 5 new members joined today
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <i className="fa fa-warning text-yellow"></i> Very long description here that may not fit into the
                                                page and may cause design problems
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <i className="fa fa-users text-red"></i> 5 new members joined
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <i className="fa fa-shopping-cart text-green"></i> 25 sales made
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <i className="fa fa-user text-red"></i> You changed your username
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li className="footer"><a href="#">View all</a></li>
                            </ul>
                        </li>
                        <li className="dropdown tasks-menu">
                            <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                <i className="fa fa-flag-o"></i>
                                <span className="label label-danger">9</span>
                            </a>
                            <ul className="dropdown-menu">
                                <li className="header">You have 9 tasks</li>
                                <li>
                                    <ul className="menu">
                                        <li>
                                            <a href="#">
                                                <h3>
                                                    Design some buttons
                                                    <small className="pull-right">20%</small>
                                                </h3>
                                                <div className="progress xs">
                                                    <div className="progress-bar progress-bar-aqua" style={ {"width": "20%"}} role="progressbar"
                                                         aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">
                                                        <span className="sr-only">20% Complete</span>
                                                    </div>
                                                </div>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <h3>
                                                    Create a nice theme
                                                    <small className="pull-right">40%</small>
                                                </h3>
                                                <div className="progress xs">
                                                    <div className="progress-bar progress-bar-green" style={ {"width" : "40%"}} role="progressbar"
                                                         aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">
                                                        <span className="sr-only">40% Complete</span>
                                                    </div>
                                                </div>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <h3>
                                                    Some task I need to do
                                                    <small className="pull-right">60%</small>
                                                </h3>
                                                <div className="progress xs">
                                                    <div className="progress-bar progress-bar-red" style={{ width: "60%" }} role="progressbar"
                                                         aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">
                                                        <span className="sr-only">60% Complete</span>
                                                    </div>
                                                </div>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <h3>
                                                    Make beautiful transitions
                                                    <small className="pull-right">80%</small>
                                                </h3>
                                                <div className="progress xs">
                                                    <div className="progress-bar progress-bar-yellow" style={{ width: "80%"}} role="progressbar"
                                                         aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">
                                                        <span className="sr-only">80% Complete</span>
                                                    </div>
                                                </div>
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li className="footer">
                                    <a href="#">View all tasks</a>
                                </li>
                            </ul>
                        </li>
                        <li className={cn({dropdown : true, user: true, "user-menu": true, open: this.state.userMenu }) } onClick={this.showUserMenu} >
                            <a className="dropdown-toggle" data-toggle="dropdown">
                                <img src={ Img } className="user-image" alt="User Image"/>
                                <span className="hidden-xs">{user.user.first_name} { user.user.last_name}</span>
                            </a>
                            <ul className="dropdown-menu">
                                <li className="user-header">
                                    <img src={ Img } className="img-circle" alt="User Image"/>

                                    <p>
                                        {user.user.first_name} { user.user.last_name} - {user.user.bio}
                                        <small>Member since Nov. 2012</small>
                                    </p>
                                </li>
                                <li className="user-body">
                                    <div className="row">
                                        <div className="col-xs-4 text-center">
                                            <a href="#">Followers</a>
                                        </div>
                                        <div className="col-xs-4 text-center">
                                            <a href="#">Sales</a>
                                        </div>
                                        <div className="col-xs-4 text-center">
                                            <a href="#">Friends</a>
                                        </div>
                                    </div>
                                </li>
                                <li className="user-footer">
                                    <div className="pull-left">
                                        <a href="#" className="btn btn-default btn-flat">Profile</a>
                                    </div>
                                    <div className="pull-right">
                                        <Link to="/logout" className="btn btn-default btn-flat">Sign out</Link>
                                    </div>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a href="#" data-toggle="control-sidebar"><i className="fa fa-gears"></i></a>
                        </li>
                    </ul>
                </div>
            </nav>
        </header> : null
    }

    render() {

        const { user } = this.props;

        return this.headerMarkup(user);
    }
}
function mapStateToProps(state) {

    const { user, sidebar } = state;

    return {
        user,
        sidebar
    }
}

export default connect(
    mapStateToProps,
    dispatch => ({
        onSidebarReduxState: (toogle) => {

            console.log('toogle:' , toogle );
            const payload = {
                toogle
            };
            dispatch({ type: SIDEBAR_STATE , payload })
        }
    })
)(withRouter(Header));