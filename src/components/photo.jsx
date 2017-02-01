import React, {Component} from 'react';
import ApiCalls from '../api/database_api'
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import TimeAgo from 'react-timeago';

export default class Photo extends Component {
	constructor(props){
		super(props)

		this.state = {
      		expanded: false
    	}

		// this.getCatergiesNames = this.getCatergiesNames.bind(this)
		// this.getCatergiesNames(this.props.id)
		// this.getCatergiesNames(this.props.id)
	}

	handleExpandChange = (expanded) => {
    	this.setState({expanded: expanded});
    };

	handleToggle = (event, toggle) => {
    	this.setState({expanded: toggle});
	};

    handleExpand = () => {
    	this.setState({expanded: true});
    };

    handleReduce = () => {
    	this.setState({expanded: false});
    };

	// getCatergiesNames(photoId){
	// 	// console.log(photoId)
	// // console.log('here')
	// var promiseCat = ApiCalls.getCatergiesNames(photoId)
	// 			.then((data)=>{
	// 				console.log(data.data, 'photos')
	// 				return data.data;
	// 			}).catch((err)=>{
	// 				console.log(err)
	// 			})
	// // console.log(promiseCat, 'promises')
	// promiseCat
	// 	.then(values=>{
	// 		if(values.length>0){
	// 			var seting = new Set()
	// 			values.forEach((data)=>{
	// 				if(data.category !== undefined){
	// 					seting.add(data.category)
	// 					return seting
	// 					// return string += data.category + " "
	// 				}
	// 			})
	// 			this.setState({
	// 				category: Array.from(seting)
	// 			})
	// 		}
	//
	// 	})
	//
	// }


	render(){
		let {photoUrl, id, preMealBdgs, postMealBdgs, insulinUnits, preMealBdgsTimeStamp, customerId, category} = this.props
		var time=<TimeAgo className="time-ago" date={preMealBdgsTimeStamp} />
		return (
			<Card className="photo-card" expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
		        <CardHeader
				  className="title-container"
		          title={time} />
		          actAsExpander={true}
		          showExpandableButton={true}
		        />
		        <CardMedia className="photo photo-container">
				  <div className="photo-overlay">
		          	<img src={photoUrl} />
				  </div>
		        </CardMedia>
				<CardText>
		          <Toggle
		            toggled={this.state.expanded}
		            onToggle={this.handleToggle}
		            labelPosition="right"
		            label="Details"
		          />
		        </CardText>
		        <CardText className="photo-details-container" expandable={true}>
					<ul className="photo-details">
						<li>Categories: {category.join(' ')}</li>
						<li>Pre Meal Bdgs: {preMealBdgs}</li>
						<li>Post Meal Bdgs: {postMealBdgs}</li>
						<li>Units: {insulinUnits}</li>
						<li>Date: {preMealBdgsTimeStamp}</li>
    				</ul>
		        </CardText>
		    </Card>
		)
	}
}
