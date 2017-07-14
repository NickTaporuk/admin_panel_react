import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom';

class Footer extends Component {
    constructor(props) {
        super(props);
    }


    render() {

        return(
            <footer className="main-footer">
                <div className="pull-right hidden-xs">
                    <b>Version</b> 1.0.0
                </div>
                <strong>Copyright &copy; 2016-{ new Date().getFullYear() } <a href="https://ownhome.com.ua">SoftOcean Group</a>.</strong> All rights
            reserved.
        </footer>)
    }
}
function mapStateToProps(state) {

    const { user } = state;

    return {
        user : user,
    }
}

export default connect(
    mapStateToProps,
    dispatch => ({})
)(withRouter(Footer));