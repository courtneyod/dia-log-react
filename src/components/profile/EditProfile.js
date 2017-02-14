import React, {Component, PropTypes} from 'react';
import ApiCalls from '../../api/database_api';
import UploadPhoto from '../newPhoto/UploadPhoto';
import Editor from 'material-ui/svg-icons/editor/mode-edit';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {connect} from 'react-redux'
var actions =require('../../actions/actions')

class EditProfile extends Component {

	constructor(props, context){
		super(props, context)

		this.state = {
            open: false,
			firstName: this.props.user.first_name,
			lowBdgs: this.props.user.bdgs_low_range,
			maxBdgs: this.props.user.bdgs_high_range,
			photo: this.props.user.photo
		}

		this.handlePhotoEntry = this.handlePhotoEntry.bind(this)
	}

	handleNameChange = (event, value) => {
		if(value.length> 0){
			var dispatch = this.props.dispatch;
			dispatch(actions.editUserFirstName({value}))
		}
	  };

	handleMinBdgsChange = (event, value) => {
		if(value.length> 0){
			var dispatch = this.props.dispatch;
			dispatch(actions.editMinBdgRange({value}))
		}
	  };
	handleMaxBdgsChange = (event, value) => {
		if(value.length> 0){
			var dispatch = this.props.dispatch;
			dispatch(actions.editMaxBdgRange({value}))
		}
	  };

	handleOpen = () => {
    	this.setState({open: true});
    };

	handleClose = () => {
	    this.setState({open: false});
		// console.log(this.props.user.photo, 'photo url')
		var dispatch = this.props.dispatch;
		var value = this.props.user.first_name;

		var value = {
			'first_name': this.props.user.first_name,
			'bdgs_high_range': this.props.user.bdgs_high_range,
			'bdgs_low_range': this.props.user.bdgs_low_range,
			'photo': this.props.user.photo
		}
		// dispatch(actions.editUser(value))
		// console.log(value, 'what im sending ')
		var user = ApiCalls.updateUser(value)
			.then((data)=>{
				// console.log('data back about new user', data)
				return data

			}).catch((err)=> {
				console.log(err)
			})
	};

	handlePhotoEntry (file){
		var that = this
		var url = ApiCalls.aws(file)
			.then((data)=>{
				var name = data.jsonObj.key
				var type = data.jsonObj.mimetype

				var value = `https://s3.amazonaws.com/dialog-courtney/${name}`
				var dispatch = this.props.dispatch;
				dispatch(actions.editPhoto({value}))


			}).catch((err)=> {
				console.log(err)
			})
	}

	render(){
		const actions = [
	      <FlatButton
	        label="Ok"
	        primary={true}
	        keyboardFocused={true}
	        onTouchTap={this.handleClose}
	      />,
	    ];

		return (
				<div className="form-container">
					<div className="svg-container">
						<Editor
						    onTouchTap={this.handleOpen}
							color={'#9E9E9E'} hoverColor={'#757575'}
							/>
							<Dialog
								  className="dialog-container"
						          title="Update Your Profile"
						          actions={actions}
						          modal={false}
						          open={this.state.open}
						          onRequestClose={this.handleClose}
								  autoScrollBodyContent={true}
						          >
								  <UploadPhoto
									  onAddPhoto={this.handlePhotoEntry}
								 />
								  <TextField
		  							className="profile-input"
									onChange={this.handleNameChange}
		  						    id="text-field-default"
		  						    defaultValue={this.props.user.first_name || ''}
		  							floatingLabelText="First Name"
		  						/>
		  					    <TextField
		  						    className="profile-input"
									onChange={this.handleMinBdgsChange}
		  						    id="text-field-default"
		  						    defaultValue={this.props.user.bdgs_low_range || ''}
		  							floatingLabelText="Bdg Range (low)"
		  						/>
		  					    <TextField
		  						    className="profile-input"
									onChange={this.handleMaxBdgsChange}
		  						    id="text-field-default"
		  						    defaultValue={this.props.user.bdgs_high_range || ''}
		  							floatingLabelText="Bdg Range (high)"
		  						/>
						        </Dialog>
					</div>
				</div>
		)
	}
}


//use matstate to prop when you need acces to store, if you only need to put in to the store you only need to dispatch
function mapStateToProps(store){
	return {
		user: store.user,
	}
}

// when you dont need to change the store nothing goes in the first argument

export default connect(mapStateToProps)(EditProfile)
