import React, {Component} from 'react'
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import IconLocationOn from 'material-ui/svg-icons/action/done';
import AutoComplete from 'material-ui/AutoComplete';


const style = {
  margin: 12,
};

const categoriesNames = [
  'Red',
  'Orange',
  'Yellow',
  'Green',
  'Blue',
  'Purple',
  'Black',
  'White',
];


const nearbyIcon = <IconLocationOn />;

export default class NewEntryForm extends Component {
	constructor(props){
		super(props)

        this.state = {
            categories: []
        }

	}

    renderNames(){
        console.log(this.props.categories, 'woroks')
            var cats = this.props.categories
            console.log(cats)
            // var nameArray = cats.map((name)=>{
            //     return name.category
            // })
            // console.log(nameArray
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
                              <AutoComplete
                                  className="login-input"
                                  floatingLabelText="Categories"
                                  filter={AutoComplete.caseInsensitiveFilter}
                                  onChange={this._handlecategoriesFieldChange}
                                  dataSource={categoriesNames}
                                  maxSearchResults={5}
                                />
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
