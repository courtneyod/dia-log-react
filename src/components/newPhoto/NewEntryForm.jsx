import React, {Component} from 'react'
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import IconLocationOn from 'material-ui/svg-icons/action/done';
import AutoComplete from 'material-ui/AutoComplete';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Slider from 'material-ui/Slider';
import ChipInput from 'material-ui-chip-input';

import {connect} from 'react-redux'
var actions =require('../../actions/actions')

const style = {
  margin: 12,
};

const styles = {
  customWidth: {
    width: 150,
  },
};

const nearbyIcon = <IconLocationOn />;

class NewEntryForm extends Component {
	constructor(props){
		super(props)

        this.state = {
            categories: [],
            searchText: '',
            unitsValue: 0,
            preBdgs: 150,
            url: '',
            chipData: [],
            newChips: []
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
    this.handlePreMealBdgsFieldChange = this.handlePreMealBdgsFieldChange.bind(this)
    this.handleUnitsChange = this.handleUnitsChange.bind(this)
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.handleAddChip = this.handleAddChip.bind(this)
	}

    componentWillMount(){
        this.setState({
            categories: this.props.categories
        })
    }

    handlePreMealBdgsFieldChange = (event, value) => {
        this.setState({preBdgs: value});
      };


    handleUnitsChange = (event, index, unitsValue) => {
        this.setState({
            unitsValue: unitsValue
        })
        console.log(this.state.unitsValue, 'units')
    };

    onFormSubmit(e){
        this.props.onFormSubmit(this.state)
    }

    handleAddChip(chip){
		this.setState({newChips: chip});
	}

	handleDeleteChip(chip, index){
		console.log('deleted chips', chip)
	}


	render(){

		return (
				<div className="form-container">
					<form className="form">
                        <div className="form-new-cat">Add Categories:</div>
                        <ChipInput
                            className="select-field"
                            onChange={this.handleAddChip}
                            onRequestAdd={(chip) => handleAddChip(chip)}
                            onRequestDelete={(chip, index) => handleDeleteChip(chip, index)}
                        />
                        <span className="slider-text-container">
                            <span className="slider-text">{'Pre Meal Bdgs: '}</span>
                            <span>{this.state.preBdgs}</span>
                        </span>
                        <Slider
                            className="form-slider"
                            min={40}
                            max={500}
                            step={1}
                            defaultValue={150}
                            value={this.state.preBdgs}
                            onChange={this.handlePreMealBdgsFieldChange}
                        />
                        <SelectField
                            className="select-field"
                            labelStyle={{ color: '#757575' }}
                            floatingLabelText="Units"
                            value={this.state.unitsValue}
                            onChange={this.handleUnitsChange}
                            style={styles.customWidth}
                        >
                                  <MenuItem value={0} primaryText="0 units" />
                                  <MenuItem value={1} primaryText="1 units" />
                                  <MenuItem value={2} primaryText="2 units" />
                                  <MenuItem value={3} primaryText="3 units" />
                                  <MenuItem value={4} primaryText="4 units" />
                                  <MenuItem value={5} primaryText="5 units" />
                                  <MenuItem value={6} primaryText="6 units" />
                                  <MenuItem value={7} primaryText="7 units" />
                                  <MenuItem value={8} primaryText="8 units" />
                                  <MenuItem value={9} primaryText="9 units" />
                                  <MenuItem value={10} primaryText="10 units" />
                            </SelectField>
						  <RaisedButton
                              className="form-btn btn"
							  icon={nearbyIcon}
							  onClick={this.onFormSubmit}
                              backgroundColor={'#9575CD'}
                              primary={true}
                              style={style} ></RaisedButton>
				        </form>
				</div>
		)
	}
}

//use matstate to prop when you need acces to store, if you only need to put in to the store you only need to dispatch
function mapStateToProps(store){
	return {
		photos: store.photos
	}
}
//add mapstate to props when you need to access data
// when you dont need to change the store nothing goes in the first argument
export default connect(mapStateToProps)(NewEntryForm)
