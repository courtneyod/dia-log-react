import React, {Component} from 'react'
var {Link} = require('react-router')

export default class LoginForm extends Component {
	constructor(props){
		super(props)

		this.handleClick = this.handleClick.bind(this)
		this.onFormSubmit = this.onFormSubmit.bind(this)
	}
	onFormSubmit(e) {
	    e.preventDefault();
		
	    var email = this.refs.email.value;
	    var password = this.refs.password.value;
		var loginObj = {
			'email': email,
			'password': password
		}
	    if (password.length > 5) {
	      this.props.onLogIn(loginObj);
	    } else {
	      this.refs.password.focus();
	    }
    }

	handleClick(){
		this.props.updateMember()
	}

	render(){
		console.log(this.props, 'this is the loginform propr')
		return (
				<div>
					<div onClick={this.handleClick}>Not a member yet? Sign up!</div>
					<form onSubmit={this.onFormSubmit}>
			          <input type="text" ref="email" placeholder="Email"/>
			          <input type="text" ref="password" placeholder="Password"/>
			          <button className="button expanded">Submit</button>
			        </form>
				</div>
		)
	}
}
