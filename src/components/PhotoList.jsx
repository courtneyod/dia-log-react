import React, {Component} from 'react'
import Photo from './Photo'
import AddPhotoBtn from './AddPhotoBtn'
import Nav from './Nav'
import ApiCalls from '../api/database_api'

export default class PhotoList extends Component {
	constructor(props){
		super(props)

		this.state= {
			photos: []
		}

		this.setPhotoFeed()
	}

	setPhotoFeed(){
		var photoList = ApiCalls.getPhotoList()
			.then((data)=>{
				console.log(data, 'this is the photo lists')
				this.setState({
					photos: data
				})
			}).catch((err)=> {
				console.log(err)
			})
	}

	renderPhotos(){
		var {photos} = this.state

		if(this.state.photos.length === 0){
			return (
				<p>Loading...</p>
			)
		}

		var photoArray = photos.map((photo)=>{
			let {photo_url, pre_meal_bdgs, post_meal_bdgs, insulin_units, pre_meal_bdgs_time_stamp, customer_id, id} = photo.data
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

	render(){
		return (
			<div>
				<Nav />
				<p>This is the photo feed component</p>
				{this.renderPhotos()}
				<AddPhotoBtn/>
			</div>
		)
	}
}
