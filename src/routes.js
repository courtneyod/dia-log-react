import React from 'react';
import {Route, Router, IndexRoute, hashHistory}  from 'react-router';

import App from './App';
// import PostsIndex from './components/posts_index'
import PhotoList from "./components/PhotoList";
import NewEntryContainer from "./components/newPhoto/NewEntryContainer";
import ProfileContainer from "./components/profile/ProfileContainer";
import LoginContainer from "./components/login/LoginContainer";

export default (
	<Router history={hashHistory}>
		<Route path="/" component={App}>
			<IndexRoute component={PhotoList} />
			<Route path="/login" component={LoginContainer} />
			<Route path="/feed" component={PhotoList} />
			<Route path="/upload" component={NewEntryContainer} />
			<Route path="/profile" component={ProfileContainer} />
		</Route>
	</Router>
)
