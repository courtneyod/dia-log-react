import React, {Component} from 'react'
import LoginContainer from './LoginContainer'

export default class GoogleAuth extends Component {
	constructor(props){
		super(props)


	}

	render(){
		return (
				<div>
					<img className="google-icon" src="../../styles/google.gif" alt=""/>
				</div>
		)
	}
}
