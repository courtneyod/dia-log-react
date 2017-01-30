import React, {Component} from 'react'
var {Link} = require('react-router')

export default class LoginForm extends Component {
	constructor(props){
		super(props)

		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleSubmit (e) {
	    e.preventDefault();
	    var email = this.refs.email.value;
	    var password = this.refs.password.value;
	    var confirmPassword = this.refs.confirmPassword.value;
		var loginObj = {
			'email': email,
			'password': password,
			'confirmPassword': confirmPassword
		}
		
	    if (password.length > 5) {
	      this.props.onSignUp(loginObj);
	    } else {
	      this.refs.password.focus();
	    }
  }

	render(){
		return (
				<div>
					<form onSubmit={this.handleSubmit}>
			          <input type="text" ref="email" placeholder="Email"/>
			          <input type="text" ref="password" placeholder="Password"/>
			          <input type="text" ref="confirmPassword" placeholder="Confirm Password"/>
			          <button className="button expanded">Submit</button>
			        </form>
				</div>
		)
	}
}
