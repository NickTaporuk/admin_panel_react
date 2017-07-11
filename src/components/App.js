import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'

import { Button, ButtonGroup, Modal, Glyphicon, ButtonToolbar} from 'react-bootstrap';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {

        return(
            <div>
                Hello world admin panel 2
            </div>
        )
    }
}

export default withRouter(connect(
    state => ({}),
    dispatch => ({})
)(App));