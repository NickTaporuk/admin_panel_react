import React from 'react';
import { render } from 'react-dom';
import { renderToString } from 'react-dom/server';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'
class Html extends React.Component {
    render() {
        return <html lang="en">
        <head>
            <meta charSet="utf-8"/>
            <link rel="stylesheet" href="../../../node_modules/bootstrap/dist/css/bootstrap.css"/>
        </head>
        <body>
        <div id="root">
        </div>
        <script async defer src="app.bundle.js"></script>
        </body>
        </html>
    }
}
function mapStateToProps(state) {

    const { user } = state;

    return {
        user,
    }
}

withRouter(connect(
    mapStateToProps,
    dispatch => ({})
)(Html));
// Client render (optional):
if (typeof document !== 'undefined') {
    render(<Html/>, document);
}

// Exported static site renderer:
export default (locals, callback) => {
    const html = '<!DOCTYPE html>'+ renderToString(<Html {...locals} />);

    //server side rendering
    if ('function' === typeof callback) {
        callback(null, html);
    } else {
        //html-webpack-plugin
        return html;
    }
};