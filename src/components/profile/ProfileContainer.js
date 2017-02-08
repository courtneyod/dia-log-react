import React, {Component, PropTypes} from 'react'
import ProfileForm from './ProfileForm'
import ProfileImage from './ProfileImage'
import EditProfile from './EditProfile'
import Nav from '../newPhoto/NewEntryNav'
import ApiCalls from '../../api/database_api'

export default class ProfileContainer extends Component {

	constructor(props, context){
		super(props, context)

		this.state = {

		}
	}

	static contextTypes = {
		router: PropTypes.object
	}

	handleFormEntry(obj){
		// console.log(obj, 'returned in obj')

		var postObj ={}
		var name = this.state.awsName
		console.log(name, 'name that will be added to aws')
		postObj.aws_name = this.state.awsName
		postObj.aws_type = this.state.awsType
		postObj.photo_url = `https://s3.amazonaws.com/dialog-courtney/${name}`
		postObj.pre_meal_bdgs = obj.preBdgs
		postObj.insulin_units = obj.unitsValue
		postObj.customer_id = 1
		var cat = obj.searchText.toLowerCase()
		postObj.category = cat

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


	render(){
		return (
				<div >
					<Nav />
					<ProfileImage />
					<EditProfile />
					<ProfileForm onFormSubmit={this.handleFormEntry} />
				</div>
		)
	}
}
