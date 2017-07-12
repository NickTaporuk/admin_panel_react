import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom';
import { SET_CURRENT_USER, USER_NOT_AUTHORIZED } from './../../../reducers/types/user'
import { BASE_URL } from './../../constants/server';
import './../../../public/scss/basic/loginForm/LoginForm.scss'
import axios from 'axios';

class LoginForm extends Component {
    constructor(props) {
        super(props);
    }

    onFormSubmit(e) {
        e.preventDefault();
        let self = this;
        axios.post(`${BASE_URL}/api/v1/en/authenticate/token`, {
            email: this.inputEmail.value,
            password: this.inputPassword.value
        })
            .then(function (response) {
                self.props.onAuthUser(response.data);
            })
            .catch(function (error) {
                self.props.onUserNotAuthorized(error);
            });
    }

    render() {

        const { token } = this.props;
        console.log('token',token);
        return(
            <div className="login-box login-wrapper">
                <div className="login-logo">
                    <Link to='/'>
                        <b>Ownhome</b> admin panel
                    </Link>
                </div>
                <div className="login-box-body">
                    <p className="login-box-msg">Sign in to start your session</p>

                    <form action="/" method="post" onSubmit={this.onFormSubmit.bind(this)}>

                        <div className="form-group has-feedback">
                            <input type="email" ref={(input) => { this.inputEmail = input;} } className="form-control" placeholder="Email"/>
                                <span className="glyphicon glyphicon-envelope form-control-feedback"></span>
                        </div>
                        <div className="form-group has-feedback">
                            <input type="password" ref={ (input) => { this.inputPassword = input; }}  className="form-control" placeholder="Password"/>
                                <span className="glyphicon glyphicon-lock form-control-feedback"></span>
                        </div>
                        <div className="row">
                            <div className="col-xs-8">
                                <div className="checkbox icheck">
                                    <label>
                                        <input type="checkbox"/> Remember Me
                                    </label>
                                </div>
                            </div>
                            <div className="col-xs-4">
                                <button type="submit" className="btn btn-primary btn-block btn-flat">Sign In</button>
                            </div>
                        </div>
                    </form>
                    <a href="#">I forgot my password</a><br/>
                    <a href="register.html" className="text-center">Register a new membership</a>

                </div>
            </div>
        )
    }
}



function mapStateToProps(state) {

    const { token } = state;

    return {
        token,
    }
}

export default connect(
    mapStateToProps,
    dispatch => ({
        onAuthUser: (user) => {
            dispatch({ type: SET_CURRENT_USER , payload : user })
        },
        onUserNotAuthorized: (error) => {
            dispatch({ type: USER_NOT_AUTHORIZED , payload: error})
        }
    })
)(withRouter(LoginForm));