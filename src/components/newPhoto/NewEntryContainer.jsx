import React, {Component, PropTypes} from 'react'
import NewEntryForm from './NewEntryForm'
import UploadPhoto from './UploadPhoto'
import NewEntryNav from './NewEntryNav'
import ApiCalls from '../../api/database_api'
import {connect} from 'react-redux'
var actions =require('../../actions/actions')

class NewEntryContainer extends Component {
	constructor(props, context){
		super(props, context)

		this.state = {}

		this.handlePhotoEntry = this.handlePhotoEntry.bind(this)
		this.handleFormEntry = this.handleFormEntry.bind(this)
		this.handleBackToFeed = this.handleBackToFeed.bind(this)
	}

	static contextTypes = {
		router: PropTypes.object
	}

  	handlePhotoEntry (file){
		var dispatch = this.props.dispatch;
		dispatch(actions.postFile(file))
		console.log(this.props.file, "FILE STORE")
	}

	handleFormEntry(obj){
		console.log(this.props.file, "FILE OBJ FROM STORE")
		var file = this.props.file
		ApiCalls.aws(file)
		    .then((data)=>{
				console.log(data, "FROM AWS CALL")

		        var name = data.jsonObj.location.split('s3.amazonaws.com/')[1]
		        var type = data.jsonObj.mimetype
// "https://dialog-courtney.s3.amazonaws.com/cheatdayeats%20clinton%20st%20baking%20chocolate%20chip%20pancakes.png"
				return name

		    }).then((name) => {

				var postObj ={}
				postObj.aws_name = name
				postObj.photo_url = `https://s3.amazonaws.com/dialog-courtney/${name}`
				postObj.pre_meal_bdgs = obj.preBdgs
				postObj.insulin_units = obj.unitsValue
				console.log(obj.newChips, "CHIPS")

				if(obj.newChips.length > 0){
					//need to figure out how to manage more than 1 category add
					postObj.categories = obj.newChips
				} else {
					postObj.categories = []
				}
				console.log(postObj, "POST OBJ")

				ApiCalls.postNewPhoto(postObj)
					.then((results)=>{
						setTimeout(()=>{
				                    this.context.router.push('/feed')
				                }, 100);
					}).catch(err=>{
						console.log(err)
					})

			})
			.catch((err)=> {
		        console.log(err)
		    })
	}

	handleBackToFeed(){
		this.context.router.push('/feed')
	}

	render(){

		return (
				<div >
					<NewEntryNav goBackToFeed={this.handleBackToFeed}/>
					<UploadPhoto onAddPhoto={this.handlePhotoEntry}/>
					<NewEntryForm categories={this.state.categoriesArray} onFormSubmit={this.handleFormEntry} />
				</div>
		)
	}
}


//use matstate to prop when you need acces to store, if you only need to put in to the store you only need to dispatch
function mapStateToProps(store){
	return {
		file: store.file
	}
}

// when you dont need to change the store nothing goes in the first argument
export default connect(mapStateToProps)(NewEntryContainer)
