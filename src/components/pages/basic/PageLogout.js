import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'
import { Redirect } from 'react-router-dom';
import { UNSET_CURRENT_USER } from './../../../reducers/types/user';
import { resetStateToLocalStorage } from './../../../storages/localStorage';

class PageLogout extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        resetStateToLocalStorage();
        this.props.onLogout();
        return (
            <Redirect to='/login'/>
        );
    }
}

export default connect(
    state => ({}),
    dispatch => ({
        onLogout: () => {

            dispatch({ type: UNSET_CURRENT_USER })
        }
    })
)(withRouter(PageLogout));