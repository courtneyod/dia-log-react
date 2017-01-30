import React, {Component} from 'react'
import Auth from './Auth'
import LoginLogo from './LoginLogo'
import LoginForm from './LoginForm'
import GoogleAuth from './GoogleAuth'
import SignUp from './SignUp'
import ApiCalls from '../../api/database_api'


export default class LoginContainer extends Component {
	constructor(props){
		super(props)

		this.state = {
			'member': true
		}

		this.renderForm = this.renderForm.bind(this)
		this.handleLogin = this.handleLogin.bind(this)
		this.handleUpdateMember = this.handleUpdateMember.bind(this)
	}

	handleUpdateMember(){
		this.setState({
			'member': false
		})
	}

	renderForm(){
		if(this.state.member){
			return <LoginForm updateMember={this.handleUpdateMember} onLogIn={this.handleLogin}/>
		} else {
			return <SignUp onSignUp={this.handleSignUp}/>
		}
	}

	handleLogin(obj){
		console.log(obj, 'handleLogin from FormContainer')
	}

	handleSignUp(obj){
		console.log(obj, 'handleSignup from FormContainer')
	}

	render(){
		return (
				<div>
					<LoginLogo />
					{this.renderForm()}
					<GoogleAuth />
				</div>
		)
	}
}
