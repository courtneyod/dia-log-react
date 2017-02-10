import React, {Component} from 'react';
import ApiCalls from '../api/database_api'
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import TimeAgo from 'react-timeago';
import Chip from 'material-ui/Chip';
import ContentAdd from 'material-ui/svg-icons/content/add';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import ChipInput from 'material-ui-chip-input';
import Slider from 'material-ui/Slider';
import Editor from 'material-ui/svg-icons/editor/mode-edit';
import {connect} from 'react-redux'
var actions =require('../actions/actions')

const style = {
  marginLeft: 20,
};


class Photo extends Component {
	constructor(props){
		super(props)

		this.state = {
      		expanded: false,
			chipData: [],
			deletedCat: '',
            Open: false,
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
    this.handleClose = this.handleClose.bind(this)
    this.handleTimeStamp = this.handleTimeStamp.bind(this)
	}

	componentWillMount(){
        console.log(this.props.photos, "PHOTOS")
        var photoId = this.props.id
		var newArr = []
        // console.log(getPhotoIndex, "PROPS")
        var index = getPhotoIndex(photoId, this)
        console.log(index, "INDEX")
        var cats = this.props.photos[index].category

		if(cats.length > 0 ){
			for (var i = 0; i < cats.length; i++) {
				var obj = {
					'key': i,
					'label': cats[i]
				}
				newArr.push(obj)
			}
		}
		this.setState({chipData: newArr});

        var dispatch = this.props.dispatch;

		var user = ApiCalls.getUser()
			.then((user)=>{
				dispatch(actions.getUser(user.user))
			}).catch((err)=> {
				console.log(err)
			})
	}
    handleAddChip(chip){
		this.setState({newChips: chip});

        var photoId = this.props.id

        console.log(this.props.id, "PROPS")
        for (var i = 0; i < this.props.photos.length; i++) {
            if(this.props.photos[i].id === photoId){
                cats = this.props.photos[i].category
            }

        }
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

		var catList = ApiCalls.deleteCatFromPhoto(obj)
			.then((data)=>{
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

//add user max and min
	renderOverlay(){
        var high = this.props.user.bdgs_high_range || 180;
        var low = this.props.user.bdgs_low_range || 80;
        var preMealBdgs = this.props.preMealBdgs;
        var postMealBdgs = this.state.postBdgs;
        // console.log(this.props.user, "USER")
		if(preMealBdgs > high && postMealBdgs > high){
			return <div className="overlay-bad overlay"></div>

        } else if (preMealBdgs > high && postMealBdgs < high && postMealBdgs > low  && postMealBdgs !== null){
			return <div className="overlay-bad-good overlay"></div>

        } else if (preMealBdgs > high && postMealBdgs < low && postMealBdgs !== null){
			return <div className="overlay-bad overlay"></div>

        } else if (preMealBdgs > high && postMealBdgs === null){
            return <div className="overlay-bad-unknown overlay"></div>

		} else if (preMealBdgs < high && preMealBdgs > low && postMealBdgs < high && postMealBdgs > low && postMealBdgs !== null){
			return <div className="overlay-good overlay"></div>

		} else if (preMealBdgs < high && preMealBdgs > low && postMealBdgs < low && postMealBdgs !== null){
			return <div className="overlay-good-bad overlay"></div>

		} else if (preMealBdgs < high && preMealBdgs > low && postMealBdgs > high){
			return <div className="overlay-good-bad overlay"></div>

		} else if (preMealBdgs < high && preMealBdgs > low && postMealBdgs === null){
			return <div className="overlay-good-unknown overlay"></div>
		}
	}

	handleOpen = () => {
  		this.setState({Open: true});
	};

	handleClose = () => {
	    this.setState({Open: false});
	    var postBdgs = this.state.postBdgs
        var obj = {
            postBdgs: postBdgs,
            id: this.props.id
        }

        var bdgs = ApiCalls.addPostBdgs(obj)
    	    .then((data)=>{
    		    console.log(data, 'from api call in adding postBdgs')
    	    }).catch((err)=> {
    		    console.log(err)
    	    })

    	var addCats = this.state.newChips

    	if(addCats.length > 0){
    		for (var i = 0; i < addCats.length; i++) {
    		var obj = {
    		    category: addCats[i],
    			id: this.props.id
    		}

    		var photoList = ApiCalls.addCatToPhoto(obj)
    			.then((data)=>{
    				console.log(data, 'ADDED CATS')
    			}).catch((err)=> {
    				console.log(err)
    			})
    	    }
    	}
	};

	handleDeleteChip(chip, index){
		console.log('deleted chips', chip)
	}

    handlePostMealBdgsFieldChange = (event, value) => {
        this.setState({postBdgs: value});
    };

    handleTimeStamp(time){
        if(!time){
            return '';
        }
        var newTime = time.split('T')[1]
        var hours = newTime.split(':')[0]
        var minutes = newTime.split(':')[1]
        var timeConvention = 'am';
        if (hours > 12) {
              timeConvention = 'pm';
              hours -= 12;
          } else if (hours == 12) {
              timeConvention = 'pm';
          } else if (hours == 0) {
              hours = 12;
           }
        return ` @ ${hours}:${minutes} ${timeConvention}`

    }

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
		        onTouchTap={this.handleClose}
		      />,
		    ];


		let {photoUrl, id, preMealBdgs, postMealBdgs, postMealBdgsTimeStamp, insulinUnits, preMealBdgsTimeStamp, customerId, category} = this.props
		var time=<TimeAgo className="time-ago" date={preMealBdgsTimeStamp} />

		return (
			<Card className="photo-card" expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
		        <CardHeader
				  className="title-container"
		          title={time}
		        />
		        <CardMedia className="photo photo-container">
				  <div className="photo-overlay">
		          	<img src={photoUrl} />
					{this.renderOverlay()}
				  </div>
		        </CardMedia>
				<CardText
                    className="photo-toggle"
                    >
		          <Toggle
		            toggled={this.state.expanded}
		            onToggle={this.handleToggle}
		            labelPosition="right"
		            label="Meal Stats"
		          />
		        </CardText>
		        <CardText className="photo-details-container" expandable={true}>

					<ul className="photo-details">
                        <li className="photo-edit">
                            <Editor
    						    onTouchTap={this.handleOpen}
    							color={'#9E9E9E'} hoverColor={'#757575'}
    							/>

                           <Dialog
                           className="test"
                             actions={bdgsActions}
                             modal={false}
                             open={this.state.Open}
                             onRequestClose={this.handleClose}
                           >
                           <div>
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
                     </div>
                     <div>
                         <div>Add a new category</div>
                         <ChipInput
                             onChange={this.handleAddChip}
                             onRequestAdd={(chip) => handleAddChip(chip)}
                             onRequestDelete={(chip, index) => handleDeleteChip(chip, index)}
                           />
                     </div>
                           </Dialog>
                        </li>
                        <li className="bdgs-photo-container">
                            <div className="bdgs-div-container">
                                <div >
                                    <div>
                                        <span className="photo-details-title-bdgs">Pre Meal Bdgs {this.handleTimeStamp(this.props.preMealBdgsTimeStamp)}</span>
                                    </div>
                                    <div className="photo-details-bdgs">
                                        {preMealBdgs}
                                    </div>
                                </div>
                            </div>
                            <div className="bdgs-div-container">
                                <div>
                                    <div>
                                        <span className="photo-details-title-bdgs">Post Meal Bdgs {this.handleTimeStamp(this.props.postMealBdgsTimeStamp)}</span>
                                    </div>
                                    <div className="photo-details-bdgs">
                                        {this.state.postBdgs || "?"}
                                    </div>
                                </div>
                            </div>
                        </li>

						<li className="photo-li">
                            <span className="photo-details-title">Units: </span> <span className="photo-insulin">{insulinUnits}</span>
                        </li>
                        <li className="photo-li">
                            <span className="photo-details-title"><span style={this.styles.wrapper}>Categories:
    					        {this.state.chipData.map(this.renderChip, this)}
    						</span></span></li>
    				</ul>
		        </CardText>
		    </Card>
		)
	}
}

function getPhotoIndex(photoId, that){
    console.log(that.props, "HERE")
    for (var i = 0; i < that.props.photos.length; i++) {
        if(that.props.photos[i].id === photoId){
            console.log(i, 'YES')
            return i;
        }
    }
}
//use matstate to prop when you need acces to store, if you only need to put in to the store you only need to dispatch
function mapStateToProps(store){
	return {
		photos: store.photos,
        user: store.user
	}
}

export default connect(mapStateToProps)(Photo)
