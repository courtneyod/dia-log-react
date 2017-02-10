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

        this._handleImageChange = this._handleImageChange.bind(this)
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
          if(this.state.imagePreviewUrl.length > 0){
              console.log('sendt', this.state.file)
              this.props.onAddPhoto(this.state.file)
          }
        }

        reader.readAsDataURL(file)

    }

	render(){
        // console.log(this.state, 'state')
        let {imagePreviewUrl} = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
          $imagePreview = (<img width="403px" height="314px" src={imagePreviewUrl} />);
        } else {
          $imagePreview = (<div className="previewText">Select an Image</div>);
        }
		return (
              <div className="photo-upload-container previewComponent">
                <div className="imgPreview">
                    <form onSubmit={(e)=>this._handleSubmit(e)}>
                      <input className="fileInput" name="file" type="file" onChange={(e)=>this._handleImageChange(e)} />
                    </form>
                  {$imagePreview}
                </div>
              </div>
		)
	}
}
