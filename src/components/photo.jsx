import React, {Component} from 'react';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import TimeAgo from 'react-timeago'

export default class Photo extends Component {
	constructor(props){
		super(props)

		this.state = {
      		expanded: false,
    	}
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

	render(){
		let {photoUrl, id, preMealBdgs, postMealBdgs, insulinUnits, preMealBdgsTimeStamp, customerId} = this.props
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
						<li>Categories: {preMealBdgs}</li>
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
