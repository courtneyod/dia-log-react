import React, {Component} from 'react'
var {Link} = require('react-router')
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';

const style = {
  margin: 12,
};

export default class LoginForm extends Component {
	constructor(props){
		super(props)

		this.state = {
            email: '',
            password: '',
            confirmPassword: '',
			firstName: ''
        }


        this._handleEmailFieldChange = this._handleEmailFieldChange.bind(this)
        this._handlePasswordFieldChange = this._handlePasswordFieldChange.bind(this)
        this._handleConfirmPasswordFieldChange = this._handleConfirmPasswordFieldChange.bind(this)
        this._handleFirstNameFieldChange = this._handleFirstNameFieldChange.bind(this)

		this.onFormSubmit = this.onFormSubmit.bind(this)
	}

	onFormSubmit(e) {
	    e.preventDefault();

	    var email = this.state.email;
	    var password = this.state.password;
	    var confirmPassword = this.state.confirmPassword;
	    var firstName = this.state.firstName;

		var loginObj = {
			'email': email,
			'password': password,
			'confirmPassword': confirmPassword,
			'firstName': firstName
		}
		console.log(loginObj, 'this is the login obj')

	    if (password.length > 5 && confirmPassword === password) {
	      this.props.onSignUp(loginObj);
	    } else {
	      this.refs.password.focus();
	    }
  }

	_handleEmailFieldChange(e) {
		  this.setState({
			  email: e.target.value
		  });
	}

	_handlePasswordFieldChange(e) {
		  this.setState({
			  password: e.target.value
		  });
	}

	_handleFirstNameFieldChange(e) {
        this.setState({
            firstName: e.target.value
        });
    }

	_handleConfirmPasswordFieldChange(e) {
		  this.setState({
			  confirmPassword: e.target.value
		  });
	}

	render(){

		return (
				<div className="login-form-container">
					<form className="form">
			          <TextField
                          floatingLabelText="First Name"
                          id="name-sign-up"
                          onChange={this._handleFirstNameFieldChange}
                          className="login-input"
                          type="text"
                          ref="name"/>
			          <TextField
                          id="email-sign-up"
                          onChange={this._handleEmailFieldChange}
                          className="login-input"
                          type="email"
                          floatingLabelText="Email"
                          ref="email"
                          />
                      <TextField
                          hintText="Password"
                          floatingLabelText="Password"
                          type="password"
                          id="names" className="login-input" ref="password"
                          id="password-sign-up"
                          onChange={this._handlePasswordFieldChange}
                          className="login-input"
                          ref="password"
                        />
                      <TextField
                          hintText="Confirm Password"
                          floatingLabelText="Confirm Password"
                          type="password"
                          id="names" className="login-input" ref="password"
                          id="password-sign-up"
                          onChange={this._handleConfirmPasswordFieldChange}
                          className="login-input"
                          ref="password"
                        />
					  <RaisedButton onClick={this.onFormSubmit} label="Submit" primary={true} style={style} ></RaisedButton>
			        </form>
				</div>
		)
	}
}
