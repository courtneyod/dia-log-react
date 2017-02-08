import React, {Component} from 'react'
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import IconLocationOn from 'material-ui/svg-icons/action/done';
import AutoComplete from 'material-ui/AutoComplete';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Slider from 'material-ui/Slider';


const style = {
  margin: 12,
};

const styles = {
  customWidth: {
    width: 150,
  },
};

const nearbyIcon = <IconLocationOn />;

export default class NewEntryForm extends Component {
	constructor(props){
		super(props)

        this.state = {
            categories: [],
            searchText: '',
            unitsValue: 0,
            preBdgs: 150,
            url: ''
        }
    this.handlePreMealBdgsFieldChange = this.handlePreMealBdgsFieldChange.bind(this)
    this.handleUnitsChange = this.handleUnitsChange.bind(this)
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.handleUpdateInput = this.handleUpdateInput.bind(this)
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

    handleUpdateInput(text){
        // console.log(text, 'what is the fiter?')
        if(text.length === 0){
            text = false
        }
        this.setState({
          searchText: text,
        });
    }

    handleNewRequest = (text) => {
        // console.log(text, 'skdjfksdjfkdj')
        // this.setState({
        //   searchText: false,
        // });
        // this.props.handleNewFilter(this.state.searchText)

      };

    onFormSubmit(e){
        // console.log('here')
        // console.log(this.state, 'this is the sats')
        this.props.onFormSubmit(this.state)

    }

	render(){

		return (
				<div className="form-container">
					<form className="form">
                                <AutoComplete
        							className="auto-complete-form"
        					        floatingLabelText="Add categories"
        					        filter={AutoComplete.caseInsensitiveFilter}
        					        dataSource={this.props.categories}
                                    maxSearchResults={10}
                                    searchText={this.state.searchText}
                                    onUpdateInput={this.handleUpdateInput}
                                    onNewRequest={this.handleNewRequest}
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
                                  <MenuItem value={1} primaryText="0 units" />
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