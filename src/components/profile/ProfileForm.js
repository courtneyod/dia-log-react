import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import IconLocationOn from 'material-ui/svg-icons/action/done';

const nearbyIcon = <IconLocationOn />;

const style = {
  margin: 12,
};

export default class ProfileForm extends Component {
	constructor(props){
		super(props)

        this.state = {

        };

    this.onFormSubmit = this.onFormSubmit.bind(this)
	}

    componentWillMount(){
        this.setState({
            categories: this.props.categories
        })
    }

    onFormSubmit(e){
        this.props.onFormSubmit(this.state)
    }

	render(){

		return (
				<div className="form-container">
					<form className="form">
					    <TextField
						    disabled={true}
							className="profile-input"
						    id="text-field-default"
						    defaultValue="Default Value"
							floatingLabelText="First Name"
						/>
					    <TextField
						    disabled={true}
						    className="profile-input"
						    id="text-field-default"
						    defaultValue="Default Value"
							floatingLabelText="Bdg Range (low)"
						/>
					    <TextField
						    disabled={true}
						    className="profile-input"
						    id="text-field-default"
						    defaultValue="Default Value"
							floatingLabelText="Bdg Range (high)"
						/>
						<RaisedButton
                            className="form-btn btn"
							icon={nearbyIcon}
							onClick={this.onFormSubmit}
                            backgroundColor={'#9575CD'}
                            primary={true}
                            style={style} >
						</RaisedButton>
				    </form>
				</div>
		)
	}
}
