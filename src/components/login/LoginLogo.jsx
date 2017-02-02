import React, {Component} from 'react'
import LoginContainer from './LoginContainer'

export default class LoginLogo extends Component {
	constructor(props){
		super(props)


	}

	render(){

		return (
				<div className="logo-container">
					<img className="icon-logo" src="../../styles/logo.png" alt=""/>
					<div className="logo" >Dialog</div>
				</div>
		)
	}
}
