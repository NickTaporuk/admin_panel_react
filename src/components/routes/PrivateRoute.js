import React, { Component, PropTypes } from 'react'

import {
    Redirect,
} from 'react-router-dom';

import { connect } from 'react-redux'

export default function requireAuthentication(Component) {

    class AuthenticatedComponent extends Component {
        render() {
            console.log('this.props.user:',this.props.user);
            return (
                <div>
                    {this.props.user.isAuthenticated === true
                        ? <Component {...this.props} />
                        : <Redirect to='/login'/>
                    }
                </div>
            )
        }
    }

    function mapStateToProps(state) {
        return {
            user: state.user
        }
    }

    return connect(mapStateToProps)(AuthenticatedComponent)
}