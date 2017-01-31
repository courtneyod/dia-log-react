import React, {Component} from 'react'
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import IconLocationOn from 'material-ui/svg-icons/action/done';

const style = {
  margin: 12,
};

const nearbyIcon = <IconLocationOn />;

export default class NewEntryForm extends Component {
	constructor(props){
		super(props)
	}
	handleSubmit (e) {
	    e.preventDefault();
	    // var photoUrl = this.refs.photo.value;
	    // var categories = this.refs.categories.value;
	    // var preMealBdgs = this.refs.preMealBdgs.value;
	    // var units = this.refs.units.value;

		// var photoObj = {
		// 	'url': photoUrl,
		// 	'categories': categories,
		// 	'preMealBdgs': preMealBdgs,
		// 	'units': units
		// }
		//
	    // if (photoUrl.length > 0) {
	    //   this.props.onFormSubmit(photoObj);
	    // } else {
	    //   this.refs.photoUrl.focus();
	    // }
  }

	render(){
		return (
				<div className="form-container">
					<form className="form" onSubmit={this.handleSubmit}>
				          <TextField onChange={this._handlePhotoChange} id="photo" className="login-input" type="text" placeholder="Photo Url"/>
				          <TextField onChange={this._handlecategoriesFieldChange} id="categories" className="login-input" type="text" placeholder="Categories"/>
				          <TextField onChange={this._handlePreMealBdgsFieldChange} id="pre_meal_bdgs" className="login-input" type="text" placeholder="Pre Meal Bdgs"/>
				          <TextField onChange={this._handleUnitsFieldChange} id="units" className="login-input" type="text" placeholder="Units"/>
						  <RaisedButton
							  icon={nearbyIcon}
							  onClick={this.onFormSubmit} backgroundColor={'#9575CD'} className="btn" primary={true} style={style} ></RaisedButton>
				        </form>
				</div>
		)
	}
}
