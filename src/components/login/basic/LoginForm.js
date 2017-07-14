import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom';
import { SET_CURRENT_USER, USER_NOT_AUTHORIZED } from './../../../reducers/types/user'
import { BASE_URL, API_V1_GET_TOKEN } from './../../constants/server';
import './../../../public/scss/basic/loginForm/LoginForm.scss'
import axios from 'axios';
import { loadLocalStorage, saveStateToLocalStorage } from './../../../storages/localStorage';

class LoginForm extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const lastUserData = loadLocalStorage('user');

        if(
            !!lastUserData &&
            this.props.user.token === null &&
            lastUserData.token !== null
        )
        {
            this.props.onAuthUser(lastUserData);
            const { history } = this.props;
            if(typeof history === "object") history.push("/");
        }
    }

    onFormSubmit(e) {
        e.preventDefault();
        let self = this;
        let data = {
            email: this.inputEmail.value,
            password: this.inputPassword.value
        };

        axios.post(`${BASE_URL}${API_V1_GET_TOKEN}`, data )
            .then(function (response) {
                self.props.onAuthUser(response.data);
                saveStateToLocalStorage('user', response.data);
                const { history } = self.props;

                if(typeof history === "object") history.push("/");
            })
            .catch(function (error) {
                self.props.onUserNotAuthorized(error);
            });

    }

    render() {

        return(
            <div className="login-box login-wrapper">

                <div className="login-logo">
                    <b>Ownhome</b>
                    <div>
                        admin panel
                    </div>
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

    const { user } = state;

    return {
        user,
    }
}

export default withRouter(connect(
    mapStateToProps,
    dispatch => ({
        onAuthUser: (user) => {
            dispatch({ type: SET_CURRENT_USER , payload : user })
        },
        onUserNotAuthorized: (error) => {
            dispatch({ type: USER_NOT_AUTHORIZED , payload: error})
        }
    })
)(LoginForm));