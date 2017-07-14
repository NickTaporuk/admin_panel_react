import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import Sidebar from './Sidebar'

export default (ComposedComponent) => {
    class Dashboard extends Component {
        constructor(props) {
            super(props);
            this.state = {
                skin : 'skin-blue',
                sidebar :  {
                    mini : "sidebar-mini",
                    open : "sidebar-open"
                }
            };
        }

        componentDidMount() {
            document.body.classList.add(this.state.skin);
            document.body.classList.add(this.state.sidebar.mini);
            document.body.classList.add(this.state.sidebar.open);
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
            document.body.classList.remove(this.state.skin);
            document.body.classList.remove(this.state.sidebar.mini);
            document.body.classList.remove(this.state.sidebar.open)
        }
    }

    const mapStateToProps = state => {
        return {
            authenticated: state.user.isAuthenticated
        };
    };

    return connect(mapStateToProps)(Dashboard);
}