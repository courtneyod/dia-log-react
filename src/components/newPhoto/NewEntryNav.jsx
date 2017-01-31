import React, {Component} from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Tabs, Tab} from 'material-ui/Tabs';
import Slider from 'material-ui/Slider';
import ActionFlightTakeoff from 'material-ui/svg-icons/hardware/keyboard-backspace';


const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
};

export default class NewEntryNav extends Component {
	constructor(props){
		super(props)
	}

    handleActive(tab) {
          alert(`A tab with this route property ${tab.props['data-route']} was activated.`);
    }

	render(){
		return (
				<div className="new-entry-nav">
                    <Tabs className="tab-container">
                       <Tab
                         className="tab-element"
                         icon={<ActionFlightTakeoff />}
                         data-route="/feed"
                         onActive={this.handleActive}
                       >
                       </Tab>
                     </Tabs>
				</div>
		)
	}
}
