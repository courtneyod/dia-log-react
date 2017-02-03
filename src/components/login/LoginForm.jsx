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
            password: ''
        }

		this.handleClick = this.handleClick.bind(this)
		this.onFormSubmit = this.onFormSubmit.bind(this)
        this._handleEmailFieldChange = this._handleEmailFieldChange.bind(this)
        this._handlePasswordFieldChange = this._handlePasswordFieldChange.bind(this)
	}


	onFormSubmit(e) {
	    e.preventDefault();
        console.log(this.state, 'this is the state in on form')
	    var email = this.state.email;
	    var password = this.state.password;

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

	handleClick(){
		this.props.updateMember()
	}

	render(){

		return (
				<div className="login-form-container">
					<div className="center-elements">
                        <p className="inline-element"> Not a member yet? </p>
                        <p className="sign-up-link" onClick={this.handleClick}>Sign up!</p>
                    </div>
					<form className="form">
			          <TextField floatingLabelText="Email" onChange={this._handleEmailFieldChange} id="email" className="login-input" type="text" ref="email" />
                      <TextField
                          hintText="Password Field"
                          floatingLabelText="Password"
                          type="password"
                          id="names" className="login-input" ref="password"
                          onChange={this._handlePasswordFieldChange}
                        />
					  <RaisedButton onClick={this.onFormSubmit} backgroundColor={'#9575CD'} className="btn" label="Submit" primary={true} style={style} ></RaisedButton>
			        </form>
				</div>
		)
	}
}
