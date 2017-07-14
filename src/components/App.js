import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'
import { Redirect } from 'react-router-dom';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            skin : 'skin-blue'
        };
    }
    componentDidMount() {
        document.body.classList.add(this.state.skin);
    }

    render() {
        const { user } = this.props;
        return(
            <div>
                Hello world admin panel { user.user.first_name }
            </div>
        )
    }

    componentWillUnmount() {
        document.body.classList.remove(this.state.skin)
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
    dispatch => ({})
)(App));