import React, {Component} from 'react';
import ApiCalls from '../api/database_api'
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import TimeAgo from 'react-timeago';
import Time from 'react-time';
import Chip from 'material-ui/Chip';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
import Dialog from 'material-ui/Dialog';

const style = {
  marginRight: 20,
};


export default class Photo extends Component {
	constructor(props){
		super(props)

		this.state = {
      		expanded: false,
			chipData: [],
			deletedCat: '',
			open: false,
    	}

		this.styles = {
	      chip: {
	        margin: 4,
	      },
	      wrapper: {
	        display: 'flex',
	        flexWrap: 'wrap',
	      },
	    };

	}

	componentWillMount(){
		var cats = this.props.category
		var newArr = []

		if(cats.length > 0 ){
			// console.log(cats, 'in if')
			for (var i = 0; i < cats.length; i++) {
				var obj ={
					'key': i,
					'label': cats[i]
				}
				newArr.push(obj)
			}
		}
		this.setState({chipData: newArr});
	}

	handleRequestDelete = (key) => {

		  this.chipData = this.state.chipData;
		  const chipToDelete = this.chipData.map((chip) => chip.key).indexOf(key);
		//   console.log(chipToDelete, 'deleted')
		  const removeCat = this.chipData[chipToDelete].label
		  console.log(removeCat, 'here')
		  this.chipData.splice(chipToDelete, 1);
		  this.setState({
			  chipData: this.chipData,
			  deletedCat: removeCat
		  });

		  console.log(removeCat, this.props.id, 'state of fdelered')
		var obj = {
			category: removeCat,
			id: this.props.id
		}

		var photoList = ApiCalls.deleteCatFromPhoto(obj)
			.then((data)=>{
				console.log(data, 'from api call in Component')
			}).catch((err)=> {
				console.log(err)
			})

	};

	renderChip(data) {
	    return (
	      <Chip
	        key={data.key}
	        onRequestDelete={() => this.handleRequestDelete(data.key)}
	        style={this.styles.chip}
	      >
	        {data.label}
	      </Chip>
	    );
	  }

	handleNewCatRequest(){

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
			return <div className="overlay-bad overlay"></div>
		} else if (this.props.preMealBdgs < 180 && this.props.postMealBdgs < 180){
			return <div className="overlay-good overlay"></div>
		} else if (this.props.preMealBdgs > 180 && this.props.postMealBdgs < 180){
			return <div className="overlay-bad-good overlay"></div>
		} else if (this.props.preMealBdgs < 180 && this.props.postMealBdgs > 180){
			return <div className="overlay-good-bad overlay"></div>
		} else if (this.props.preMealBdgs > 180 && !this.props.postMealBdgs){
			return <div className="overlay-bad-unknown overlay"></div>
		} else if (this.props.preMealBdgs < 180 && !this.props.postMealBdgs){
			return <div className="overlay-good-unknown overlay"></div>
		}
	}
	handleOpen = () => {
  this.setState({open: true});
};

handleClose = () => {
  this.setState({open: false});
};


	render(){
		const actions = [
		      <FlatButton
		        label="Ok"
		        primary={true}
		        keyboardFocused={true}
		        onTouchTap={this.handleClose}
		      />,
		    ];


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

						<li><span className="photo-details-title"><span style={this.styles.wrapper}>Categories:
					        {this.state.chipData.map(this.renderChip, this)}
							<FloatingActionButton onTouchTap={this.handleOpen} onClick={this.handleNewCatRequest} mini={true} secondary={true} style={style}>
								 <ContentAdd />
							</FloatingActionButton>

								<Dialog
						          actions={actions}
						          modal={false}
						          open={this.state.open}
						          onRequestClose={this.handleClose}
						        >
						          Add a new category
						          <DatePicker hintText="Date Picker" />
						        </Dialog>

						</span></span></li>
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
