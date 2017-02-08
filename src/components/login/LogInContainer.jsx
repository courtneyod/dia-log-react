import React, {Component, PropTypes} from 'react'
import Auth from './Auth'
import LoginLogo from './LoginLogo'
import LoginForm from './LoginForm'
import GoogleAuth from './GoogleAuth'
import SignUp from './SignUp'
import ApiCalls from '../../api/database_api'
import cookie from 'react-cookie';
import {connect} from 'react-redux'
var actions =require('../../actions/actions')
// import {Route, Router, IndexRoute, hashHistory}  from 'react-router';

class LoginContainer extends Component {

	constructor(props, context){
		super(props, context)

		this.state = {
			'member': true,
			'userId': cookie.load('userId')
		}

		this.renderForm = this.renderForm.bind(this)
		this.handleLogin = this.handleLogin.bind(this)
		this.handleUpdateMember = this.handleUpdateMember.bind(this)
		this.handleSignUp = this.handleSignUp.bind(this)
		this.handleGoogleAuth = this.handleGoogleAuth.bind(this)
	}
	static contextTypes = {
		router: PropTypes.object
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
		const email = obj.email
		const password = obj.password
		var that = this
		var dispatch = this.props.dispatch;

		ApiCalls.login(obj)
			.then(function(data){
				console.log(data, 'user logined in')

				if(data.authenticated.authenticated){
					localStorage.setItem("jwt", data.authenticated.jwt);

					dispatch(actions.getUser(data))

					that.context.router.push('/feed')
				}
			})
			.catch((err)=> {
				console.log(err)
			})
	}

	handleGoogleAuth(){
		console.log('here in gogle auth log ni contianere')
		var googleAuth = ApiCalls.googleAuth()
			.then((data)=>{
				console.log(data, 'made it!')
			})
			.catch((err)=> {
				console.log(err)
			})
	}

	handleSignUp(obj){
		const email = obj.email
		const password = obj.password
		const confirmPassword = obj.confirmPassword
		const firstName = obj.firstName
		var that = this

		var signUp = ApiCalls.signUp(obj)
			.then(function(data){

				if(data.authenticated){
					console.log(data)
					localStorage.setItem("jwt", data.jwt);
					that.context.router.push('/feed')
				} else {
					that.context.router.push('/login')
				}
			})
			.catch((err)=> {
				console.log(err)
			})

	}

	render(){

		return (
				<div className="LoginContainer">
					<LoginLogo />
					{this.renderForm()}
					<GoogleAuth clickGoogleAuth={this.handleGoogleAuth}/>
				</div>
		)
	}
}

//use matstate to prop when you need acces to store, if you only need to put in to the store you only need to dispatch
function mapStateToProps(store){
	return {
		user: store.user
	}
}

export default connect(mapStateToProps)(LoginContainer)
