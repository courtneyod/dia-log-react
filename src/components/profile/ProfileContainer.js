import React, {Component, PropTypes} from 'react'
import ProfileForm from './ProfileForm'
import ProfileImage from './ProfileImage'
import EditProfile from './EditProfile'
import Nav from '../newPhoto/NewEntryNav'
import ApiCalls from '../../api/database_api'
import {connect} from 'react-redux'
var actions =require('../../actions/actions')

class ProfileContainer extends Component {

	constructor(props, context){
		super(props, context)

		this.state = {

		}

	this.handleBackToFeed = this.handleBackToFeed.bind(this)
	}

	static contextTypes = {
		router: PropTypes.object
	}

	componentWillMount(){
		
	}


	handleFormEntry(obj){
		// console.log(obj, 'returned in obj')

		var postObj ={}
		var name = this.state.awsName
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

	handleBackToFeed(){
		this.context.router.push('/feed')
	}


	render(){
		return (
				<div >
					<Nav goBackToFeed={this.handleBackToFeed}/>
					<ProfileImage />
					<EditProfile />
					<ProfileForm onFormSubmit={this.handleFormEntry} />
				</div>
		)
	}
}



//use matstate to prop when you need acces to store, if you only need to put in to the store you only need to dispatch
function mapStateToProps(store){
	return {
		user: store.user
	}
}

// when you dont need to change the store nothing goes in the first argument

export default connect(mapStateToProps)(ProfileContainer)
