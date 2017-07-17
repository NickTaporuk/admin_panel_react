import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import Sidebar from './Sidebar'
import { loadLocalStorage } from './../../../storages/localStorage';
import { SET_CURRENT_USER } from './../../../reducers/types/user'

export default (ComposedComponent) => {
    class Dashboard extends Component {
        constructor(props) {
            super(props);
            this.state = {
                additionalClasses : ["skin-blue", "sidebar-mini", "sidebar-open"]
            };
        }

        componentWillMount() {
            this.state.additionalClasses.forEach((item)=> {
                document.body.classList.add(item);
            })
        }

        componentDidMount() {
            const lastUserData = loadLocalStorage('user');

            if(
                !!lastUserData &&
                lastUserData.token !== null
            )
            {
                this.props.onAuthUser(lastUserData);
            }
        }
        render() {
            return this.props.authenticated ?
                <div>
                    <Header/>
                    <Sidebar/>
                    <ComposedComponent {...this.props} />
                    <Footer/>
                </div> : <Redirect to="/login"/>;
        }

        componentWillUnmount() {
            this.state.additionalClasses.forEach((item)=> {
                document.body.classList.remove(item);
            })
        }
    }

    const mapStateToProps = state => {
        return {
            authenticated: state.user.isAuthenticated
        };
    };

    const mapDispatchToProps = dispatch => ({
        onAuthUser: (user) => {
            dispatch({ type: SET_CURRENT_USER , payload : user })
        }
    });

    return connect(mapStateToProps, mapDispatchToProps)(Dashboard);
}