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

        this.state = {
            imageSrc: ''
        }

        this.renderImage = this.renderImage.bind(this)
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

						    <input onChange={this.renderImage} type="file" />
                            <img className="image" src={this.state.imageSrc} alt="" height="100"/>
					</div>
				</div>
		)
	}
}
