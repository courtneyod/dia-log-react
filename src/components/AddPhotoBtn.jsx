import React, {Component} from 'react'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import FontIcon from 'material-ui/FontIcon';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import IconLocationOn from 'material-ui/svg-icons/content/add-circle';

const nearbyIcon = <IconLocationOn />;

const style = {
  marginRight: 20,
};

export default class AddPhotoBtn extends Component {
	constructor(props){
		super(props)

		this.state = {
    		selectedIndex: 0,
  		}
	}
	select = (index) => this.setState({selectedIndex: index});

	render(){
		return (
			<Paper className="add-btn-container" zDepth={1}>
		        <BottomNavigation selectedIndex={this.state.selectedIndex}>
		          <BottomNavigationItem
		            icon={nearbyIcon}
		            onTouchTap={() => this.select(2)}
		          />
		        </BottomNavigation>
		    </Paper>
				// <div>
				// 	<div className="add-btn-container">
				// 	    <FloatingActionButton style={style}>
				// 	      <ContentAdd />
				// 	    </FloatingActionButton>
				// 	</div>
				// </div>
		)
	}
}
