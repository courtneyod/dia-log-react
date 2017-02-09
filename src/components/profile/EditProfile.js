import React, {Component, PropTypes} from 'react';
import ApiCalls from '../../api/database_api';
import UploadPhoto from '../newPhoto/UploadPhoto';
import Editor from 'material-ui/svg-icons/editor/mode-edit';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

export default class EditProfile extends Component {

	constructor(props, context){
		super(props, context)

		this.state = {
            open: false,
			firstName: '',
			minBdgs: '',
			maxBdgs: ''
		}
	}

	handleNameChange = (event, value) => {
		this.setState({firstName: value});
	  };

	handleMinBdgsChange = (event, value) => {
		this.setState({minBdgs: value});
	  };
	handleMaxBdgsChange = (event, value) => {
		this.setState({maxBdgs: value});
	  };

	handleOpen = () => {
    	this.setState({open: true});
    };

	handleClose = () => {
	    this.setState({open: false});
	};

	handlePhotoEntry (file){
		var url = ApiCalls.aws(file)
			.then((data)=>{
				var name = data.jsonObj.key
				var type = data.jsonObj.mimetype

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
		  						    defaultValue={this.state.firstName}
		  							floatingLabelText="First Name"
		  						/>
		  					    <TextField
		  						    className="profile-input"
									onChange={this.handleMinBdgsChange}
		  						    id="text-field-default"
		  						    defaultValue={this.state.minBdgs}
		  							floatingLabelText="Bdg Range (low)"
		  						/>
		  					    <TextField
		  						    className="profile-input"
									onChange={this.handleMaxBdgsChange}
		  						    id="text-field-default"
		  						    defaultValue={this.state.maxBdgs}
		  							floatingLabelText="Bdg Range (high)"
		  						/>
						        </Dialog>
					</div>
				</div>
		)
	}
}
