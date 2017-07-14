import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

export default (ComposedComponent) => {
    class Authentication extends Component {

        render() {

            return this.props.authenticated ? <ComposedComponent {...this.props} /> : <Redirect to="/login"/>;
        }
    }

    const mapStateToProps = state => {
        return {
            authenticated: state.user.isAuthenticated
        };
    };

    return connect(mapStateToProps)(Authentication);
}