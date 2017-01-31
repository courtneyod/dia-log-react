import React, {Component, PropTypes} from 'react'
import Photo from './Photo'
import AddPhotoBtn from './AddPhotoBtn'
import Nav from './Nav'
import ApiCalls from '../api/database_api'
import CircularProgress from 'material-ui/CircularProgress';

export default class PhotoList extends Component {
	constructor(props, context){
		super(props, context)

		this.state= {
			photos: []
		}

		this.setPhotoFeed()
		this.renderPhotos = this.renderPhotos.bind(this)
		this.handleNewUpload = this.handleNewUpload.bind(this)
	}

	static contextTypes = {
		router: PropTypes.object
	}

	setPhotoFeed(){
		var photoList = ApiCalls.getPhotoList()
			.then((data)=>{
				var photoArray = data.photo
				// console.log(data, 'skdhfjsdf')
				this.setState({
					photos: photoArray
				})
			}).catch((err)=> {
				console.log(err)
			})
	}

	renderPhotos(){
		var {photos} = this.state
		console.log(photos, 'this is athe data returned in container')
		if(this.state.photos.length === 0){
			return (
				<CircularProgress className="modal-waiting" size={100} thickness={5} />
			)
		} else {
			var photoArray = photos.map((photo)=>{
				console.log(photos.length)
				console.log(photo)
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

	handleNewUpload(){
		this.context.router.push('/upload')
	}

	render(){
		return (
			<div>
				<Nav />
				<div className="photo-container">
					{this.renderPhotos()}
				</div>
				<AddPhotoBtn clickNewPhoto={this.handleNewUpload}/>
			</div>
		)
	}
}
