import React, {Component} from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import ActionBackUp from 'material-ui/svg-icons/file/file-upload';

const styles = {
  imageInput: {
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    opacity: 0,
  },
};

export default class UploadPhoto extends Component {
	constructor(props){
		super(props)
	}

	handleUpload(e){
		console.log(e, 'hjsdjsdjs')
	}

	render(){
		return (
				<div className="photo-upload-container">
					<div className="upload-btn-container">
						<FlatButton
					      label="Upload Photo"
					      labelPosition="before"
					      primary={true}
					      style={styles.button}
						  rippleColor={'#0D47A1'}
						  containerElement='label'
					      icon={<ActionBackUp />}
					    >
						    <input onChange={this.handleUpload} ref="photo" type="file" />
					    </FlatButton>
					</div>
				</div>
		)
	}
}
