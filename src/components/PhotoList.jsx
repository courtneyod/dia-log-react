import React, {Component, PropTypes} from 'react'
import Photo from './Photo'
import AddPhotoBtn from './AddPhotoBtn'
import Nav from './Nav'
import ApiCalls from '../api/database_api'
import CircularProgress from 'material-ui/CircularProgress';

var newSet = new Set()

export default class PhotoList extends Component {
	constructor(props, context){
		super(props, context)

		this.state= {
			photos: [],
			categoryNames: [],
			fitered: false
		}

		this.setPhotoFeed()
		this.renderPhotos = this.renderPhotos.bind(this)
		this.handleNewUpload = this.handleNewUpload.bind(this)
		this.getCatergiesNames = this.getCatergiesNames.bind(this)
		this.updateFilteredState = this.updateFilteredState.bind(this)

	}

	static contextTypes = {
		router: PropTypes.object
	}

	setPhotoFeed(){
		var photoList = ApiCalls.getPhotoList()
			.then((data)=>{
				var photoArray = data.photo
				this.setState({
					photos: photoArray
				})
				if(this.state.photos.length > 0){
					this.getCatergiesNames()
				}
			}).catch((err)=> {
				console.log(err)
			})
	}

	renderPhotos(){
		var {photos} = this.state
		if(this.state.photos.length === 0){
			return (
				<CircularProgress className="modal-waiting" size={100} thickness={5} />
			)
		} else {

			var photoArray = photos.map((photo)=>{
				let {photo_url, pre_meal_bdgs, post_meal_bdgs, insulin_units, pre_meal_bdgs_time_stamp, customer_id, id} = photo

				return <Photo
					photoUrl={photo_url}
					id={id}
					preMealBdgs={pre_meal_bdgs}
					postMealBdgs={post_meal_bdgs}
					insulinUnits = {insulin_units}
					preMealBdgsTimeStamp = {pre_meal_bdgs_time_stamp}
					customerId = {customer_id}
					/>
			})
			return photoArray

		}
	}

	getCatergiesNames(){
		var photosArray = this.state.photos

		var photoPromises = photosArray.map((photo)=>{

			var photoId = photo.id

			return ApiCalls.getCatergiesNames(photoId)
				.then((data)=>{
					return data;
				}).catch((err)=>{
					console.log(err)
				})
		})

		Promise.all(photoPromises)
			.then(values => {
				console.log(values, 'confused')
				var items = values[0].data.map((data)=>{
					newSet.add(data.category)

					// var obj = {}
					// obj[data.category] = true
					return newSet
				})
				this.setState({
					categoryNames: Array.from(newSet)
				})
				console.log(this.state.categoryNames, 'blaaaahhh')
			}).catch((err)=>{
				console.log(err)
			})
	}

	handleNewUpload(){
		this.context.router.push('/upload')
	}

	updateFilteredState(text){
		this.setState({
			filtered: text
		})
		console.log(this.state.filtered)
	}

	render(){
		return (
			<div>
				<Nav handleNewFilter={this.updateFilteredState} categories={this.state.categoryNames}/>
				<div className="photo-container">
					{this.renderPhotos()}
				</div>
				<AddPhotoBtn clickNewPhoto={this.handleNewUpload}/>
			</div>
		)
	}
}
