import React from 'react';
import {Route, IndexRoute} from 'react-router'

import App from './components/App';
// import PostsIndex from './components/posts_index'
import PhotoList from './components/photo_list.jsx';

export default (
	<Router history={hashHistory}>
		<Route path="/" component={App}>
			<Route path="/feed" component={PhotoList} />
		</Route>
	</Router>
)
