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
import Dialog from 'material-ui/Dialog';
import ChipInput from 'material-ui-chip-input';
import Slider from 'material-ui/Slider';

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
			catOpen: false,
            bdgsOpen: false,
			newChips: [],
            postBdgs: this.props.postMealBdgs
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
	this.handleAddChip = this.handleAddChip.bind(this)
    this.handlePostMealBdgsFieldChange = this.handlePostMealBdgsFieldChange.bind(this)
    this.handleBdgsClose = this.handleBdgsClose.bind(this)
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
		  const removeCat = this.chipData[chipToDelete].label
		  console.log(removeCat, 'here')
		  this.chipData.splice(chipToDelete, 1);
		  this.setState({
			  chipData: this.chipData,
			  deletedCat: removeCat
		  });

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
		} else if (this.props.preMealBdgs > 180 && (!this.props.postMealBdgs)){
			return <div className="overlay-bad-unknown overlay"></div>
		} else if (this.props.preMealBdgs < 180 && (!this.props.postMealBdgs)){
			return <div className="overlay-good-unknown overlay"></div>
		}
	}
	handleCatOpen = () => {
  		this.setState({catOpen: true});
	};

	handleBdgsOpen = () => {
  		this.setState({bdgsOpen: true});
	};

	handleCatClose = () => {
	  this.setState({catOpen: false});
	  console.log(this.state.newChips, 'chips to add')
	  var addCats = this.state.newChips

	  if(addCats.length > 0){
		  for (var i = 0; i < addCats.length; i++) {
		  var obj = {
			  category: addCats[i],
			  id: this.props.id
		  }

		  var photoList = ApiCalls.addCatToPhoto(obj)
			  .then((data)=>{
				  console.log(data, 'from api call in adding cats Component')
			  }).catch((err)=> {
				  console.log(err)
			  })
	    }
	   }
	};

	handleBdgsClose = () => {
        // console.log(this.state.postBdgs, 'new postBdgs value')
	  this.setState({bdgsOpen: false});
	  var postBdgs = this.state.postBdgs
      var obj = {
          postBdgs: postBdgs,
          id: this.props.id
      }
      console.log(obj, 'reee')

		  var bdgs = ApiCalls.addPostBdgs(obj)
			  .then((data)=>{
				  console.log(data, 'from api call in adding postBdgs')
			  }).catch((err)=> {
				  console.log(err)
			  })
	};

	handleAddChip(chip){
		// console.log(e.tagert)
		console.log('added chips', chip)
		this.setState({newChips: chip});

	}

	handleDeleteChip(chip, index){
		console.log('deleted chips', chip)
	}

    handlePostMealBdgsFieldChange = (event, value) => {
        this.setState({postBdgs: value});
      };

	render(){
		const catActions = [
		      <FlatButton
		        label="Ok"
		        primary={true}
		        keyboardFocused={true}
		        onTouchTap={this.handleCatClose}
		      />,
		    ];
		const bdgsActions = [
		      <FlatButton
		        label="Ok"
		        primary={true}
		        keyboardFocused={true}
		        onTouchTap={this.handleBdgsClose}
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
							<FloatingActionButton onTouchTap={this.handleCatOpen} mini={true} secondary={true} style={style}>
								 <ContentAdd />
							</FloatingActionButton>

								<Dialog
						          actions={catActions}
						          modal={false}
						          open={this.state.catOpen}
						          onRequestClose={this.handleCatClose}
						        >
						          Add a new category
								  <ChipInput
									  onChange={this.handleAddChip}
									  onRequestAdd={(chip) => handleAddChip(chip)}
									  onRequestDelete={(chip, index) => handleDeleteChip(chip, index)}
									/>
						        </Dialog>
						</span></span></li>
						<li><span className="photo-details-title">Pre Meal Bdgs:</span> {preMealBdgs}</li>
						<li><span className="photo-details-title">Post Meal Bdgs:</span>{this.state.postBdgs}
                            <FloatingActionButton onTouchTap={this.handleBdgsOpen} mini={true} secondary={true} style={style}>
								 <ContentAdd />
							</FloatingActionButton>

								<Dialog
                                className="test"
						          actions={bdgsActions}
						          modal={false}
						          open={this.state.bdgsOpen}
						          onRequestClose={this.handleBdgsClose}
						        >
                                <p>
                                   <span>{'Update your post meal bdgs: '}</span>
                                   <span>{this.state.postBdgs}</span>
                                 </p>
                                  <Slider
                                    min={40}
                                    max={500}
                                    step={1}
                                    defaultValue={150}
                                    value={this.state.postBdgs}
                                    onChange={this.handlePostMealBdgsFieldChange}
                                  />
						        </Dialog>
                        </li>
						<li><span className="photo-details-title">Units:</span> {insulinUnits}</li>
						<li><span className="photo-details-title">Date:</span> <Time value={preMealBdgsTimeStamp} titleFormat="YYYY/MM/DD HH:mm" relative /></li>
    				</ul>
		        </CardText>
		    </Card>
		)
	}
}
