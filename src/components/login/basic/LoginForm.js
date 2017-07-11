import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom';
import { Button, FormGroup} from 'react-bootstrap';
import './../../../public/scss/basic/loginForm/LoginForm.scss'

class LoginForm extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        return(
            <div className="login-box login-wrapper">
                <div className="login-logo">
                    <Link to='/'>
                        <b>Ownhome</b> admin panel
                    </Link>
                </div>
                <div className="login-box-body">
                    <p className="login-box-msg">Sign in to start your session</p>

                    <form action="/" method="post">

                        <div className="form-group has-feedback">
                            <input type="email" className="form-control" placeholder="Email"/>
                                <span className="glyphicon glyphicon-envelope form-control-feedback"></span>
                        </div>
                        <div className="form-group has-feedback">
                            <input type="password" className="form-control" placeholder="Password"/>
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

export default withRouter(connect(
    state => ({
        token : state.token
    }),
    dispatch => ({
        onAddJWTToken: (token) => {
            const payload = {
                token
            };
            dispatch({ type: 'ADD_TOKEN', payload })
        }
    })
)(LoginForm));