import React, {Component} from 'react'

export default class NewEntryForm extends Component {
	constructor(props){
		super(props)
	}
	handleSubmit (e) {
	    e.preventDefault();
	    var photoUrl = this.refs.photo.value;
	    var categories = this.refs.categories.value;
	    var preMealBdgs = this.refs.preMealBdgs.value;
	    var units = this.refs.units.value;

		var photoObj = {
			'url': photoUrl,
			'categories': categories,
			'preMealBdgs': preMealBdgs,
			'units': units
		}

	    if (photoUrl.length > 0) {
	      this.props.onAddPhoto(photoObj);
	    } else {
	      this.refs.photoUrl.focus();
	    }
  }

	render(){
		return (
				<div>
					<form onSubmit={this.handleSubmit}>
			          <input type="text" ref="photo" placeholder="Photo Url"/>
			          <input type="text" ref="categories" placeholder="Categories"/>
			          <input type="text" ref="preMealBdgs" placeholder="Pre Meal Bdgs"/>
			          <input type="text" ref="units" placeholder="Number of Units"/>
			          <button className="button expanded">Add Todo</button>
			        </form>
				</div>
		)
	}
}
