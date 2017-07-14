import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'

class PageUsers extends Component {
    constructor(props) {
        super(props);
    }


    render() {

        return(
            <div>Hello from page Users</div>
        )
    }
}
function mapStateToProps(state) {

    const { user } = state;

    return {
        user : user,
    }
}

export default connect(
    mapStateToProps,
    dispatch => ({})
)(withRouter(PageUsers));