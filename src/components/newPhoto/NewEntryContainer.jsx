import React, {Component} from 'react'
import NewEntryForm from './NewEntryForm'
import UploadPhoto from './UploadPhoto'
import NewEntryNav from './NewEntryNav'

export default class NewEntryContainer extends Component {
	constructor(props){
		super(props)
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
					<NewEntryNav onGoBack={this.handleGoBack}/>
					<UploadPhoto onAddPhoto={this.handlePhotoEntry}/>
					<NewEntryForm onFormSubmit={this.handleFormEntry} />
				</div>
		)
	}
}
