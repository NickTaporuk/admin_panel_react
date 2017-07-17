import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom';
import axios from 'axios';
import cn from 'classnames'

import { SET_CURRENT_USER, USER_NOT_AUTHORIZED } from './../../../../reducers/types/user'
import { SPINNER_STATE } from './../../../../reducers/types/spinner'
import { VALIDATE_EMAIL_INPUT_LOGIN_FORM } from './../../../../reducers/types/form'
import { BASE_URL, API_V1_GET_TOKEN } from './../../../constants/server';
import './../../../../public/scss/basic/loginForm/LoginForm.scss'
import { loadLocalStorage, saveStateToLocalStorage } from './../../../../storages/localStorage';

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            additionalClasses: ['hold-transition', 'login-page']
        };

        this.onCheckInput = this.onCheckInput.bind(this)
    }

    componentWillMount() {
        this.state.additionalClasses.forEach((item)=> {
            document.body.classList.add(item);
        })
    }


    componentWillUnmount() {
        this.state.additionalClasses.forEach((item)=> {
            document.body.classList.remove(item);
        })
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

    onCheckInput(e) {
        console.log(e.target.type, e.target.value);
        switch (e.target.type) {
            case 'email' : return !!e.target.value && e.target.value.test(/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/);
            default : return false;
        }
    }

    onFormSubmit(e) {
        e.preventDefault();
        let self = this;
        let data = {
            email: this.inputEmail.value,
            password: this.inputPassword.value
        };

        self.props.onSpinnerState(true);
        axios.post(`${BASE_URL}${API_V1_GET_TOKEN}`, data )
            .then(function (response) {

                const { onAuthUser, onSpinnerState, history } = self.props;

                onAuthUser(response.data);
                saveStateToLocalStorage('user', response.data);
                onSpinnerState(false);

                if(typeof history === "object") history.push("/");
            })
            .catch(function (error) {
                const { onSpinnerState, onUserNotAuthorized } = self.props;

                onSpinnerState(false);
                onUserNotAuthorized(error);
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

                    <form method="post" onSubmit={this.onFormSubmit.bind(this)}>
                        <div className={ cn({"form-group" : true, "has-feedback" : true, "has-success": false }) }>
                            <input type="email" onChange={this.onCheckInput} ref={(input) => { this.inputEmail = input;} } className="form-control" placeholder="Email"/>
                            <span className="glyphicon glyphicon-envelope form-control-feedback"></span>
                        </div>
                        <div className="form-group has-feedback">
                            <input type="password" onChange={this.onCheckInput} ref={ (input) => { this.inputPassword = input; }}  className="form-control" placeholder="Password"/>
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

    const { user, form } = state;

    return {
        user,
        email : form.email
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
        },
        onSpinnerState : (toogle) => {
            const payload = {
                toogle
            };
            dispatch({ type: SPINNER_STATE , payload})
        },
        onChangeValidateInputEmailLoginForm: (emailData) => {
            const payload = {
                email : emailData
            };

            dispatch({ type: VALIDATE_EMAIL_INPUT_LOGIN_FORM , payload})
        }
    })
)(LoginForm));