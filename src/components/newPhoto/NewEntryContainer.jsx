import React, {Component} from 'react'
import NewEntryForm from './NewEntryForm'
import UploadPhoto from './UploadPhoto'
import NewEntryNav from './NewEntryNav'
import ApiCalls from '../../api/database_api'

export default class NewEntryContainer extends Component {
	constructor(props){
		super(props)

		this.state = {
			categoriesArray: []
		}

		this.handleCatergiesName = this.handleCatergiesName.bind(this)
		this.handleCatergiesName()
	}

	handleCatergiesName(){
		var names = ApiCalls.getAllCatergies()
			.then((data)=>{

				this.setState({
					categoriesArray: data
				})

			}).catch((err)=>{
				console.log(err, 'error fetching categories')
			})
	}


  	handlePhotoEntry (obj){

	}

	handleFormEntry(obj){

	}

	handleGoBack(){

	}

	render(){
		return (
				<div >
					<NewEntryNav categories={this.state.categoriesArray} onGoBack={this.handleGoBack}/>
					<UploadPhoto onAddPhoto={this.handlePhotoEntry}/>
					<NewEntryForm onFormSubmit={this.handleFormEntry} />
				</div>
		)
	}
}
