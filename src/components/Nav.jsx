import React, {Component, PropTypes} from 'react'
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
import Drawer from 'material-ui/Drawer';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import ExitApp from 'material-ui/svg-icons/action/exit-to-app';



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
	constructor(props, context){
		super(props, context)

        this.state={
            categoriesArray: [],
            searchText: '',
            open: false
        }

        this.renderAutoComplete = this.renderAutoComplete.bind(this)
        this.renderAutoComplete()
        this.handleUpdateInput = this.handleUpdateInput.bind(this)
        this.handleNewRequest = this.handleNewRequest.bind(this)
        this.handleLogOut = this.handleLogOut.bind(this)
	}

    static contextTypes = {
		router: PropTypes.object
	}

    handleToggle = () => this.setState({open: !this.state.open});

    handleLogOut = () =>{
       this.setState({open: false});
       const JWT = localStorage.removeItem("jwt");
       this.context.router.push('/login')
    }

    handleProfile = () =>{
       this.setState({open: false});
       this.context.router.push('/profile')
    }

    handleUpdateInput(text){
        this.setState({
            searchText: text,
        });
        if(text.length === 0){
            console.log(text, 'sarch text is nothing ')
            this.props.handleNewFilter('')

        }
    }

    handleNewRequest = (text) => {
        this.props.handleNewFilter(this.state.searchText)
        setTimeout(()=>{
                    this.refs[`autocomplete`].focus();
                }, 700);

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
                            ref={`autocomplete`}
							className="auto-complete"
					        floatingLabelText="Filter By Categories"
					        filter={AutoComplete.caseInsensitiveFilter}
					        dataSource={this.props.categories}
                            maxSearchResults={10}
                            searchText={this.state.searchText}
                            onUpdateInput={this.handleUpdateInput}
                            onNewRequest={this.handleNewRequest}
                            animated={true}
					      />
			        </ToolbarGroup>
			        <ToolbarGroup>
						<FlatButton
                              onTouchTap={this.handleToggle}
							  className="nav-text"
						      target="_blank"
						      label="Settings"
						      secondary={true}
						      icon={<ActionLogOut />}
						    />
                            <Drawer
                              docked={false}
                              width={200}
                              open={this.state.open}
                              onRequestChange={(open) => this.setState({open})}
                            >
                              <MenuItem
                                  onTouchTap={this.handleProfile}
                                  leftIcon={<PersonAdd />}
                                  >Profile
                              </MenuItem>
                              <MenuItem
                                  leftIcon={<ExitApp />}
                                  onTouchTap={this.handleLogOut}>Logout</MenuItem>
                            </Drawer>
			        </ToolbarGroup>
			      </Toolbar>
	  </div>
		)
	}
}
