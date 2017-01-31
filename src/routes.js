import React from 'react';
import {Route, Router, IndexRoute, hashHistory}  from 'react-router';

import App from './App';
// import PostsIndex from './components/posts_index'
import PhotoList from "./components/PhotoList";
import LoginContainer from "./components/login/LoginContainer";
import Auth from './components/login/Auth';

export default (
	<Router history={hashHistory}>
		<Route path="/" component={App}>
			<IndexRoute component={PhotoList} />
			<Route path="/login" component={LoginContainer} />
			<Route path="/feed" component={PhotoList} />
		</Route>
	</Router>
)
