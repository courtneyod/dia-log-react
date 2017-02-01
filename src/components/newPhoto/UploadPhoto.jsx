import React, {Component} from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import ActionBackUp from 'material-ui/svg-icons/file/file-upload';
import Dropzone from 'react-dropzone';

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
            imageSrc: '',
            files: []
        }

        this.renderImage = this.renderImage.bind(this)
	}

    onDrop(acceptedFiles, rejectedFiles) {
      console.log('Accepted files: ', acceptedFiles);
      console.log('Rejected files: ', rejectedFiles);
      this.setState({
        files: acceptedFiles
      });

      console.log(this.state.files, 'fileds')
    }

    onOpenClick () {
      Dropzone.open();
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
        return myImage
    }

	render(){
		return (
				<div className="photo-upload-container">
					<div className="upload-btn-container">
                        <div>
               <Dropzone ref={(node) => { this.dropzone = node; }} onDrop={this.onDrop}>
                   <div>Try dropping some files here, or click to select files to upload.</div>
               </Dropzone>
               <button type="button" onClick={this.onOpenClick}>
                   Open Dropzone
               </button>
               {this.state.files.length > 0 ? <div>
               <h2>Uploading {this.state.files.length} files...</h2>
               <div>{this.state.files.map((file) => <img src={file.preview} /> )}</div>
               </div> : null}
           </div>


					</div>
				</div>
		)
	}
}
