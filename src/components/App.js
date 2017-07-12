import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { token } = this.props;
        console.log('token',token);
        return(
            <div>
                Hello world admin panel { token }
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

export default withRouter(connect(
    mapStateToProps,
    dispatch => ({})
)(App));