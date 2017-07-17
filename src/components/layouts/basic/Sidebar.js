import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router'
import Img from './../../../img/defaults/default_avatar.jpg';
import {Link} from 'react-router-dom'


const addEvent = function (object, type, callback) {
    if (object == null || typeof(object) == 'undefined') return;
    if (object.addEventListener) {
        object.addEventListener(type, callback, false);
    } else if (object.attachEvent) {
        object.attachEvent("on" + type, callback);
    } else {
        object["on" + type] = callback;
    }
};


const removeEvent = function (object, type, callback) {
    if (object == null || typeof(object) == 'undefined') return;
    if (object.removeEventListener) {
        object.removeEventListener(type, callback, false);
    } else if (object.detachEvent) {
        object.detachEvent("on" + type, callback);
    } else {
        object["on" + type] = callback;
    }
};

class Sidebar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            sidebar: {
                additionalClass: 'sidebar-collapse'
            },
            collapseScreenSize: 767,
            searchClass: 'sidebar-open'
        }
        this.onDetectSidebarWidth = this.onDetectSidebarWidth.bind(this);
    }

    componentWillMount() {
        addEvent(window, "resize", this.onDetectSidebarWidth);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.sidebar !== nextProps.sidebar) {
            this.onSidebarToogle(nextProps.sidebar);
        }
    }

    render() {
        const {user} = this.props;
        return (
            <aside className="main-sidebar">
                <section className="sidebar">
                    <div className="user-panel">
                        <div className="pull-left image">
                            <img src={ Img } className="img-circle" alt="User Image"/>
                        </div>
                        <div className="pull-left info">
                            <p>{user.user.first_name} { user.user.last_name}</p>
                            <a><i className="fa fa-circle text-success"></i> Online</a>
                        </div>
                    </div>
                    <form action="#" method="get" className="sidebar-form">
                        <div className="input-group">
                            <input type="text" name="q" className="form-control" placeholder="Search..." defaultValue=""/>
                            <span className="input-group-btn">
                                <button type="submit" name="search" id="search-btn" className="btn btn-flat"><i
                                    className="fa fa-search"></i>
                                </button>
                            </span>
                        </div>
                    </form>
                    <ul className="sidebar-menu" data-widget="tree">
                        <li className="header">MAIN NAVIGATION</li>
                        <li>
                            <Link to="users">
                                <i className="fa fa-th"></i> <span>Users</span>
                                <span className="pull-right-container">
                                    <small className="label pull-right bg-green">new</small>
                                </span>
                            </Link>
                        </li>
                    </ul>
                </section>
            </aside>
        )
    }

    componentWillUnmount() {
        removeEvent(window, "resize", this.onDetectSidebarWidth);
    }

    onDetectSidebarWidth() {
        var width = window.innerWidth
            || document.documentElement.clientWidth
            || document.body.clientWidth;

        if (width <= this.state.collapseScreenSize && document.body.className.indexOf(this.state.searchClass) > -1) {
            document.body.classList.remove(this.state.searchClass);
        } else {
            document.body.classList.add(this.state.searchClass);
        }
    }

    onSidebarToogle(nextSidebarState) {
        var width = window.innerWidth
            || document.documentElement.clientWidth
            || document.body.clientWidth;

        if (width <= this.state.collapseScreenSize && document.body.className.indexOf(this.state.searchClass) > -1 && nextSidebarState) {
            document.body.classList.remove(this.state.searchClass);
        } else {
            document.body.classList.add(this.state.searchClass);
        }
        document.body.classList.toggle(this.state.sidebar.additionalClass);
    }
}

function mapStateToProps(state) {

    const {user, sidebar} = state;

    return {
        user,
        sidebar
    }
}

export default connect(
    mapStateToProps,
    dispatch => ({})
)(withRouter(Sidebar));