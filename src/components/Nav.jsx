import React, {Component} from 'react'
var {Link, IndexLink} = require('react-router')
import ActionHome from 'material-ui/svg-icons/content/sort';
import ActionLogOut from 'material-ui/svg-icons/content/sort';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import AutoComplete from 'material-ui/AutoComplete';
import FlatButton from 'material-ui/FlatButton';

const styles = {
  imageInput: {
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    opacity: 0,
  },
};

const iconStyles = {
  marginRight: 24,
};

export default class Nav extends Component {
	constructor(props){
		super(props)

        this.state={
            categoriesArray: [],
            searchText: ''
        }
    this.renderAutoComplete = this.renderAutoComplete.bind(this)
    this.renderAutoComplete()
    this.handleUpdateInput = this.handleUpdateInput.bind(this)
    this.handleNewRequest = this.handleNewRequest .bind(this)
	}

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
        console.log(text, 'skdjfksdjfkdj')
        this.props.handleNewFilter(this.state.searchText)

      };

    renderAutoComplete(){
        // console.log(this.props.categories, 'props')
    }

	render(){
		return (
			<div className="top-bar">
				<Toolbar>
			        <ToolbarGroup firstChild={true}>
						<FlatButton
							  className="nav-text nav-logo"
						      target="_blank"
						      label="Dialog"
						      secondary={true}
						    />
			        </ToolbarGroup>
			        <ToolbarGroup>
						<AutoComplete
							className="auto-complete"
					        floatingLabelText="Filter By Categories"
					        filter={AutoComplete.caseInsensitiveFilter}
					        dataSource={this.props.categories}
                            maxSearchResults={5}
                            searchText={this.state.searchText}
                            onUpdateInput={this.handleUpdateInput}
                            onNewRequest={this.handleNewRequest}
					      />
			        </ToolbarGroup>
			        <ToolbarGroup>
						<FlatButton
							  className="nav-text"
						      href="https://github.com/callemall/material-ui"
						      target="_blank"
						      label="Settings"
						      secondary={true}
						      icon={<ActionLogOut />}
						    />
			        </ToolbarGroup>
			      </Toolbar>
	  </div>
		)
	}
}
