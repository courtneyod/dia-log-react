import React, {Component} from 'react'
import NewEntryForm from './NewEntryForm'

export default class NewEntryContainer extends Component {
	constructor(props){
		super(props)
	}

  	handlePhotoEntry (obj){
		
	}

	render(){
		return (
				<div>
					<NewEntryForm onAddPhoto={this.handlePhotoEntry}
				</div>
		)
	}
}
