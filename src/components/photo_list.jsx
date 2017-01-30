import React, {Component} from 'react'
import Photo from './photo'
import getPhotoList from '../api/database_api'

export default class PhotoList extends Component {
	constructor(props){
		super(props)

		this.state= {
			photos = []
		}

		this.setPhotoFeed()
	}

	setPhotoFeed(){
		var photoList = getPhotoList()
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

		if(this.state.posts.length === 0){
			return (
				<p>Loading...</p>
			)
		}

		var photoArray = photos.map((photo)=>{
			return <Photo photo={photo} />
		})

		return photoArray

	}

	render(){
		return (
			<div>
				<p>This is the photo feed component</p>
				{this.renderPhotos()}
			</div>
		)
	}
}
