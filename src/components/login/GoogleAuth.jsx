import React, {Component} from 'react'
import LoginContainer from './LoginContainer'
import IconButton from 'material-ui/IconButton';

export default class GoogleAuth extends Component {
	constructor(props){
		super(props)

		this.handleClick = this.handleClick.bind(this)

	}

	handleClick(){
		this.props.clickGoogleAuth();
	}

	render(){
		return (
				<div className="login-form-container">
					<div className="center-elements google-text"><p>Or sign up with Google</p></div>
					<img onClick={this.handleClick} className="google-icon" src="../../styles/google.gif" alt=""/>
				</div>
		)
	}
}
