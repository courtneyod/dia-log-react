import React, {Component} from 'react'
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import ActionBackUp from 'material-ui/svg-icons/file/file-upload';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ApiCalls from '../../api/database_api'

import request from 'superagent';

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
            file: '',
            imagePreviewUrl: '',
            awsLocation: '',
            awsType: ''
        }

        this._handleSubmit = this._handleSubmit.bind(this)
        this._handleImageChange = this._handleImageChange.bind(this)
	}

    _handleSubmit(e) {
    e.preventDefault();
    // TODO: do something with -> this.state.file
    console.log('handle uploading-', this.state.file);
    if(this.state.imagePreviewUrl.length > 0){

        var url = ApiCalls.aws(this.state.file)
            .then((data)=>{
                var location = data.jsonObj.key
                var type = data.jsonObj.mimetype

                this.props.onAddPhoto(location, type)
                console.log(location, type, 'results from aws')
            }).catch((err)=> {
                console.log(err)
            })
    }
  }

    _handleImageChange(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
          this.setState({
            file: file,
            imagePreviewUrl: reader.result
          });
        }
        console.log(this.state, 'this is the state')

        reader.readAsDataURL(file)
    }

	render(){
        console.log(this.state, 'state')
        let {imagePreviewUrl} = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
          $imagePreview = (<img width="442px" height="265px" src={imagePreviewUrl} />);
        } else {
          $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
        }
		return (
              <div className="photo-upload-container previewComponent">
                <form onSubmit={(e)=>this._handleSubmit(e)}>
                  <input className="fileInput" type="file" onChange={(e)=>this._handleImageChange(e)} />
                  <button className="submitButton" type="submit" onClick={(e)=>this._handleSubmit(e)}>Upload Image</button>
                </form>
                <div className="imgPreview">
                  {$imagePreview}
                </div>
              </div>
		)
	}
}
