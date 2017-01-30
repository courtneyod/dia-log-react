import React, {Component} from 'react'

export default class AddPhotoBtn extends Component {
	constructor(props){
		super(props)
	}

	render(){
		return (
				<div>
					<input type="submit" className="button" value="Add Photo"/>
				</div>
		)
	}
}
