import React, {Component} from 'react';
import ApiCalls from '../api/database_api'
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import TimeAgo from 'react-timeago';
import Time from 'react-time';

export default class Photo extends Component {
	constructor(props){
		super(props)

		this.state = {
      		expanded: false
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

	renderOverlay(){
		if(this.props.preMealBdgs > 180 && this.props.postMealBdgs > 180){
			return <div className="overlay-bad overlay">this is the overlays</div>
		} else if (this.props.preMealBdgs < 180 && this.props.postMealBdgs < 180){
			return <div className="overlay-good overlay">this is the overlays</div>
		} else if (this.props.preMealBdgs > 180 && this.props.postMealBdgs < 180){
			return <div className="overlay-bad-good overlay">this is the overlays</div>
		} else if (this.props.preMealBdgs < 180 && this.props.postMealBdgs > 180){
			return <div className="overlay-good-bad overlay">this is the overlays</div>
		} else if (this.props.preMealBdgs > 180 && !this.props.postMealBdgs){
			return <div className="overlay-bad-unknown overlay">this is the overlays</div>
		} else if (this.props.preMealBdgs < 180 && !this.props.postMealBdgs){
			return <div className="overlay-good-unknown overlay">this is the overlays</div>
		}
	}


	render(){
		console.log(this.props.postMealBdgs, 'here')

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
					{this.renderOverlay()}
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
						<li><span className="photo-details-title">Categories:</span> {category.join(' ')}</li>
						<li><span className="photo-details-title">Pre Meal Bdgs:</span> {preMealBdgs}</li>
						<li><span className="photo-details-title">Post Meal Bdgs:</span>{postMealBdgs}</li>
						<li><span className="photo-details-title">Units:</span> {insulinUnits}</li>
						<li><span className="photo-details-title">Date:</span> <Time value={preMealBdgsTimeStamp} titleFormat="YYYY/MM/DD HH:mm" relative /></li>
    				</ul>
		        </CardText>
		    </Card>
		)
	}
}
