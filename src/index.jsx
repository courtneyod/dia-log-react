// Application entrypoint.

// Load up the application styles
require("../styles/application.scss");
require('../styles/styles')


// Render the top-level React component
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';

var {Route, Router, IndexRoute, hashHistory} = require('react-router');


ReactDOM.render(
	<Router history={browserHistory} routes={routes}/>,
	document.getElementById('react-root')
);
