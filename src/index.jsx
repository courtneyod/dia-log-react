// Application entrypoint.

// Load up the application styles
require("../styles/application.scss");
// require('../styles/style.css')

// Render the top-level React component
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import Routes from './routes.js';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {Route, Router, IndexRoute, hashHistory} from 'react-router';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

ReactDOM.render(
	<Router history={hashHistory} routes={Routes}/>,
	document.getElementById('app')
);
