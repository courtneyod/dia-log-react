import React, {Component, PropTypes} from 'react';
import ApiCalls from '../../api/database_api';
import Person from 'material-ui/svg-icons/action/account-circle';
import {connect} from 'react-redux';
var actions =require('../../actions/actions');

class ProfileImage extends Component {

	constructor(props, context){
		super(props, context)

		this.state = {
			photo: ''
		}
		this.renderImage = this.renderImage.bind(this)
	}

	componentWillMount(){
		var dispatch = this.props.dispatch;
		console.log(this.props.user, 'props for image')

		// dispatch(actions.getUser(user))
	}

	renderImage(){
		if (this.props.user.user) {
			var photoUrl = this.props.user.user.photo
		} else {
			var photoUrl = "";
		}
		if (photoUrl.length === 0){
			return (
			<div className="svg-container">
				<Person className="profile-image-svg"/>
			</div>
			)

		} else {
			return (
				<div className="image-container">
					<img className="profile-image" src={photoUrl} height="150px" width="150px"/>
				</div>
			)
		}
	}

	render(){


		return (
				<div className="form-container">
						{this.renderImage()}
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
//add mapstate to props when you need to access data
// when you dont need to change the store nothing goes in the first argument
export default connect(mapStateToProps)(ProfileImage)
