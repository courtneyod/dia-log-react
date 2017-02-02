import React, {Component} from 'react'
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import ActionBackUp from 'material-ui/svg-icons/file/file-upload';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import uploadcare from 'uploadcare-widget';


import request from 'superagent';

window.UPLOADCARE_PUBLIC_KEY = "ca793afb2fedc93a3c57"

const style = {
  margin: 12
};


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

        this.state = {
            avatarImagePreview: null,
            avatarImage: null
        }

        this.handleChange = this.handleChange.bind(this)
	}

    handleChange(e){
        console.log('here?', e)
        uploadcare.openDialog().done((file) => {
            console.log(file, 'now?')
          file.promise().done((fileInfo)=>{
              console.log('working?')
              console.log('ehrjerhejh', fileInfo)
            this.setState({
              avatarImagePreview: this.refs.avatarImagePreview,
              avatarImage: this.refs.avatarImage
            });
            console.log(this.state, 'state')
          }).fail(function(error, fileInfo) {
              console.log(error)
            });
        });

    }

    renderImage(e){
        console.log(e.target.files[0], 'filesss')
        var myImage = new Image(100, 200);
        var source = e.target.files[0].name

        var textType = /text.*/
        myImage.src = e.target.files[0].name
        console.log(myImage);
        this.setState({
            imageSrc: source
        })
        console.log(this.state.imageSrc, 'here')
        return myImage
    }

	render(){
		return (
				<div className="photo-upload-container">
					<div className="upload-btn-container">
                        <input onChange={this.handleChange} type="hidden" role="uploadcare-uploader" />
                            <div className="container">
                              <img src={this.state.avatarImagePreview} />
                              <img src={this.state.avatarImage} />
                            </div>

					</div>

				</div>
		)
	}
}
