// Application entrypoint.

// Load up the application styles
require("../styles/application.scss");
require('../styles/style.css')


// Render the top-level React component
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import Routes from './routes.js';

import {Route, Router, IndexRoute, hashHistory} from 'react-router';


ReactDOM.render(
	<Router history={hashHistory} routes={Routes}/>,
	document.getElementById('react-root')
);
