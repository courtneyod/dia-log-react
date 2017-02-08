import React, {Component, PropTypes} from 'react'
import ApiCalls from '../../api/database_api'
import Person from 'material-ui/svg-icons/action/account-circle';

export default class ProfileImage extends Component {

	constructor(props, context){
		super(props, context)

		this.state = {

		}
	}

	render(){
		return (
				<div className="form-container">
					<Person className="profile-image-svg"/>
					<img className="profile-image" src='' width="100px"/>
				</div>
		)
	}
}
