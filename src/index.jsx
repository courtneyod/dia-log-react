// Application entrypoint.

// Render the top-level React component
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";

import App from './App.jsx';
import Routes from './routes.js';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {Route, Router, IndexRoute, hashHistory} from 'react-router';
var actions = require("./actions/actions");
var store = require("./store/configureStore").configure();

// console.log(store, 'store')
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

//state of entire store every time dispatch runs
store.subscribe(() => {
    var state = store.getState();
    // console.log("New state from redux store:", state);
});

ReactDOM.render(
	<Provider store={store}>
		<Router history={hashHistory} routes={Routes}/>
	</Provider>,
	document.getElementById('app')
);
