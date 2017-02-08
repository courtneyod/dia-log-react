import React, {Component, PropTypes} from 'react'
import ApiCalls from '../../api/database_api'
import Editor from 'material-ui/svg-icons/editor/mode-edit';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

export default class EditProfile extends Component {

	constructor(props, context){
		super(props, context)

		this.state = {
            open: false,
		}
	}

	handleOpen = () => {
    	this.setState({open: true});
    };

	handleClose = () => {
	    this.setState({open: false});
	};

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
						          title="Dialog With Date Picker"
						          actions={actions}
						          modal={false}
						          open={this.state.open}
						          onRequestClose={this.handleClose}
						          >
						          Open a Date Picker dialog from within a dialog.
						        </Dialog>
					</div>
				</div>
		)
	}
}
