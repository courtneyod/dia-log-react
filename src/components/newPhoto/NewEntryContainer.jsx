import React, {Component, PropTypes} from 'react'
import NewEntryForm from './NewEntryForm'
import UploadPhoto from './UploadPhoto'
import NewEntryNav from './NewEntryNav'
import ApiCalls from '../../api/database_api'
import cookie from 'react-cookie';

export default class NewEntryContainer extends Component {
	constructor(props, context){
		super(props, context)

		this.state = {
			categoriesArray: []
		}

		this.handleFormEntry = this.handleFormEntry.bind(this)
		this.handleCatergiesName = this.handleCatergiesName.bind(this)
		this.handleCatergiesName()
		this.handleBackToFeed = this.handleBackToFeed.bind(this)
	}

	static contextTypes = {
		router: PropTypes.object
	}

	handleCatergiesName(){
		var names = ApiCalls.getAllCatergies()
			.then((results)=>{
				// console.log('alll the cats', results)
				var catsArray = results.data.map(obj=>{
					// console.log(obj.category, 'here are the objs')
					return obj.category
				})

				this.setState({
					categoriesArray: catsArray
				})

			}).catch((err)=>{
				console.log(err, 'error fetching categories')
			})
	}


  	handlePhotoEntry (obj){
	}

	handleFormEntry(obj){
		// console.log(obj, 'returned in obj')

		var postObj ={}
		postObj.photo_url = obj.url
		postObj.pre_meal_bdgs = obj.preBdgs
		postObj.insulin_units = obj.unitsValue
		postObj.customer_id = 1
		var cat = obj.searchText.toLowerCase()
		postObj.category = cat

		ApiCalls.postNewPhoto(postObj)
			.then((results)=>{
				console.log(results)
				this.context.router.push('/feed')
			}).catch(err=>{
				console.log(err)
			})

	}

	handleBackToFeed(){
		this.context.router.push('/feed')
	}

	render(){

		return (
				<div >
					<NewEntryNav goBackToFeed={this.handleBackToFeed}/>
					<UploadPhoto onAddPhoto={this.handlePhotoEntry}/>
					<NewEntryForm categories={this.state.categoriesArray} onFormSubmit={this.handleFormEntry} />
				</div>
		)
	}
}
