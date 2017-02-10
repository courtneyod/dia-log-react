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
			categoriesArray: [],
			awsName: '',
			awsType: ''
		}

		this.handlePhotoEntry = this.handlePhotoEntry.bind(this)
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


  	handlePhotoEntry (file){
		var url = ApiCalls.aws(file)
		    .then((data)=>{
		        var name = data.jsonObj.key
		        var type = data.jsonObj.mimetype

				console.log(name, type, 'results from aws')
				this.setState({
					awsName: name,
					awsType: type
				})
		    }).catch((err)=> {
		        console.log(err)
		    })
	}

	handleFormEntry(obj){
		console.log(obj, 'returned in obj')

		var postObj ={}
		var name = this.state.awsName
		console.log(name, 'name that will be added to aws')
		postObj.aws_name = name
		postObj.aws_type = this.state.awsType
		postObj.photo_url = `https://s3.amazonaws.com/dialog-courtney/${name}`
		postObj.pre_meal_bdgs = obj.preBdgs
		postObj.insulin_units = obj.unitsValue
		postObj.category = obj.newChips[0].toLowerCase()

		ApiCalls.postNewPhoto(postObj)
			.then((results)=>{
				console.log(results, 'new post!!!!')
				setTimeout(()=>{
		                    this.context.router.push('/feed')
		                }, 400);
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
