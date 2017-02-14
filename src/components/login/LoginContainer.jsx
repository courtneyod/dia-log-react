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
			'textClass': 'false-show'
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
				if (data === 'bad password or email'){
					console.log('bad password or email')
					that.setState({
						'textClass': 'show-error'
					})
				}

				if(data.authentication.authenticated){
					console.log('authenticated')
					localStorage.setItem("jwt", data.authentication.jwt+'&id='+data.user.id+'&email='+data.user.email);

					dispatch(actions.getUser(data))

					that.context.router.push('/feed')
				} else {

				}
			})
			.catch((err)=> {
				console.log(err)
			})
	}

	handleGoogleAuth(){
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
					//add to state, failure to login error message
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
					<div className={this.state.textClass}>Bad password or email</div>
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
