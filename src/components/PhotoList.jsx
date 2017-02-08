import React, {Component, PropTypes} from 'react'
import Photo from './Photo'
import AddPhotoBtn from './AddPhotoBtn'
import Nav from './Nav'
import ApiCalls from '../api/database_api'
import CircularProgress from 'material-ui/CircularProgress';
import cookie from 'react-cookie';
import {connect} from 'react-redux'
var actions =require('../actions/actions')


var newSet = new Set()

class PhotoList extends Component {
	constructor(props, context){
		super(props, context)

		this.state= {
			photos: [],
			categoryNames: [],
			fitered: false
		}

		this.renderPhotos = this.renderPhotos.bind(this)
		this.handleNewUpload = this.handleNewUpload.bind(this)
		this.getAllCatergies = this.getAllCatergies.bind(this)
		this.updateFilteredState = this.updateFilteredState.bind(this)

	}

	static contextTypes = {
		router: PropTypes.object
	}

	componentWillMount(){
		var dispatch = this.props.dispatch;

		var photoList = ApiCalls.getPhotoList()
			.then((data)=>{
				var photoArray = data.data
				dispatch(actions.getPhotoList(photoArray))

				if(this.props.photos.length > 0){
					this.getAllCatergies()
				}
				return data.photo
			}).catch((err)=> {
				console.log(err)
			})
	}

	renderPhotos(){
		var {photos} = this.props
		if(this.props.photos.length === 0){
			return (
				<CircularProgress className="modal-waiting" size={100} thickness={5} />
			)
		} else {

			var photoArray = photos.map((photo)=>{
				let {photo_url, pre_meal_bdgs, post_meal_bdgs, insulin_units, pre_meal_bdgs_time_stamp, customer_id, id, category} = photo
				var filteredState = this.state.filtered

				if(!filteredState || filteredState === ''){
					return (
						<Photo
							category={category}
							photoUrl={photo_url}
							id={id}
							preMealBdgs={pre_meal_bdgs}
							postMealBdgs={post_meal_bdgs}
							insulinUnits = {insulin_units}
							preMealBdgsTimeStamp = {pre_meal_bdgs_time_stamp}
							customerId = {customer_id}
					/>)
				} else {
					if(category.indexOf(filteredState) !== -1 ){
						return (
						<Photo
							category={category}
							photoUrl={photo_url}
							id={id}
							preMealBdgs={pre_meal_bdgs}
							postMealBdgs={post_meal_bdgs}
							insulinUnits = {insulin_units}
							preMealBdgsTimeStamp = {pre_meal_bdgs_time_stamp}
							customerId = {customer_id}
							/>)
					}
				}
			})
			return photoArray
		}
	}


	getAllCatergies(){
		var photosArray = this.props.photos

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
				var items = values.map((results)=>{
					results.data.forEach(objs=>{
					newSet.add(objs.category)
				})
				this.setState({
					categoryNames: Array.from(newSet)
				})
			})
			}).catch((err)=>{
				console.log(err)
			})
}

	handleNewUpload(){
		this.context.router.push('/upload')
	}

	updateFilteredState(text){
		console.log(text, 'filetered')
		this.setState({
			filtered: text
		})
		console.log(this.state.filtered, 'sate of filtered text')
	}

	render(){
		// console.log(this.state, 'ere')
		return (
			<div>
				<Nav handleNewFilter={this.updateFilteredState} categories={this.state.categoryNames}/>
				<div className="photolist-container">
					{this.renderPhotos()}
				</div>
				<AddPhotoBtn clickNewPhoto={this.handleNewUpload}/>
			</div>
		)
	}
}

//use matstate to prop when you need acces to store, if you only need to put in to the store you only need to dispatch
function mapStateToProps(store){
	return {
		photos: store.photos
	}
}

export default connect(mapStateToProps)(PhotoList)
