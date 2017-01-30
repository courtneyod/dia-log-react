import React, {Component} from 'react'
var {Link, IndexLink} = require('react-router')


export default class Nav extends Component {
	constructor(props){
		super(props)
	}

	render(){
		return (
			<div className="top-bar">
			  <div className="top-bar-left">
				  <ul className="menu">
					  <li>
						  <IndexLink activeClassName="active" activeStyle={{fontWeight: 'bold'}} to="/categories"> Categories</IndexLink>
					  </li>
				  </ul>
			  </div>
		  <div className="top-bar-right">
			  <div className="top-bar-left">
				  <ul className="menu">
					  <li>
						  <Link activeClassName="active" activeStyle={{fontWeight: 'bold'}} to="/settings">Settings</Link>
					  </li>
				  </ul>
			  </div>
		  </div>

	  </div>
		)
	}
}
