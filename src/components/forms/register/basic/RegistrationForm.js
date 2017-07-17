import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router'
import {Link} from 'react-router-dom';
import {SET_CURRENT_USER, USER_NOT_AUTHORIZED} from './../../../reducers/types/user'
import {SPINNER_STATE} from './../../../reducers/types/spinner'
import {BASE_URL, API_V1_GET_TOKEN} from './../../constants/server';
import './../../../public/scss/basic/loginForm/LoginForm.scss'
import axios from 'axios';
import {loadLocalStorage, saveStateToLocalStorage} from './../../../storages/localStorage';

class RegistrationForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            additionalClasses: ['hold-transition', 'register-page']
        }
    }

    componentWillMount() {
        this.state.additionalClasses.forEach((item) => {
            document.body.classList.add(item);
        })
    }


    componentWillUnmount() {
        this.state.additionalClasses.forEach((item) => {
            document.body.classList.remove(item);
        })
    }

    componentDidMount() {
        const lastUserData = loadLocalStorage('user');

        if (
            !!lastUserData &&
            this.props.user.token === null &&
            lastUserData.token !== null
        ) {
            this.props.onAuthUser(lastUserData);
            const {history} = this.props;
            if (typeof history === "object") history.push("/");
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
        axios.post(`${BASE_URL}${API_V1_GET_TOKEN}`, data)
            .then(function (response) {

                const {onAuthUser, onSpinnerState, history} = self.props;

                onAuthUser(response.data);
                saveStateToLocalStorage('user', response.data);
                onSpinnerState(false);

                if (typeof history === "object") history.push("/");
            })
            .catch(function (error) {
                const {onSpinnerState, onUserNotAuthorized} = self.props;

                onSpinnerState(false);
                onUserNotAuthorized(error);
            });

    }

    render() {

        return (
            <div className="register-box">
                <div className="register-logo">
                    <a href="../../index2.html"><b>O</b>wnhome admin</a>
                </div>

                <div className="register-box-body">
                    <p className="login-box-msg">Register a new membership</p>

                    <form action="../../index.html" method="post">
                        <div className="form-group has-feedback">
                            <input type="text" className="form-control" placeholder="Full name"/>
                            <span className="glyphicon glyphicon-user form-control-feedback"></span>
                        </div>
                        <div className="form-group has-feedback">
                            <input type="email" className="form-control" placeholder="Email"/>
                                <span className="glyphicon glyphicon-envelope form-control-feedback"></span>
                        </div>
                        <div className="form-group has-feedback">
                            <input type="password" className="form-control" placeholder="Password"/>
                                <span className="glyphicon glyphicon-lock form-control-feedback"></span>
                        </div>
                        <div className="form-group has-feedback">
                            <input type="password" className="form-control" placeholder="Retype password"/>
                                <span className="glyphicon glyphicon-log-in form-control-feedback"></span>
                        </div>
                        <div className="row">
                            <div className="col-xs-8">
                                <div className="checkbox icheck">
                                    <label>
                                        <input type="checkbox"/> I agree to the <a href="#">terms</a>
                                    </label>
                                </div>
                            </div>
                            <div className="col-xs-4">
                                <button type="submit" className="btn btn-primary btn-block btn-flat">Register</button>
                            </div>
                        </div>
                    </form>

                    <div className="social-auth-links text-center">
                        <p>- OR -</p>
                        <a href="#" className="btn btn-block btn-social btn-facebook btn-flat"><i
                            className="fa fa-facebook"></i> Sign up using
                            Facebook</a>
                        <a href="#" className="btn btn-block btn-social btn-google btn-flat"><i
                            className="fa fa-google-plus"></i> Sign up using
                            Google+</a>
                    </div>

                    <a href="login.html" className="text-center">I already have a membership</a>
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
    },
        onSpinnerState : (toogle) => {
        const payload = {
        toogle
    }
        dispatch({ type: SPINNER_STATE , payload})
    }
    })
    )(RegistrationForm));