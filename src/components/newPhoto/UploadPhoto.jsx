import React, {Component} from 'react'
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import ActionBackUp from 'material-ui/svg-icons/file/file-upload';
import Dropzone from 'react-dropzone';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

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
            imageSrc: '',
            files: []
        }

        this.renderImage = this.renderImage.bind(this)
        this.onDrop = this.onDrop.bind(this)
        this.onOpenClick = this.onOpenClick.bind(this)
	}

    onDrop(acceptedFiles, rejectedFiles) {
      console.log('Accepted files: ', acceptedFiles);
      console.log('Rejected files: ', rejectedFiles);
      this.setState({
        files: acceptedFiles
      });

    //   var req = request.post('/upload');
    //     acceptedFiles.forEach((file)=> {
    //         req.attach(file.name, file);
    //     });
    //     req.end(callback);

      console.log(this.state.files, 'fileds')
    }

    onOpenClick () {
      this.dropzone.open();
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
                        <div className='dropzone-container'>
                            <Dropzone  ref={(node) => { this.dropzone = node; }} onDrop={this.onDrop} accept="image/*">
                               <div>Try dropping some files here, or click to select files to upload.</div>
                            </Dropzone>
                            <RaisedButton onClick={this.onOpenClick} backgroundColor={'#9575CD'} className="btn" label="Upload File" primary={true} style={style} ></RaisedButton>

                            {this.state.files.length > 0 ?
                            <div className="dropzone-image-container">
                               <h2>Uploading {this.state.files.length} files...</h2>
                               <div>{this.state.files.map((file) => <img src={file.preview} /> )}</div>
                            </div> : null}
                       </div>
					</div>
				</div>
		)
	}
}
