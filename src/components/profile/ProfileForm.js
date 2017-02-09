import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn}
  from 'material-ui/Table';
import ApiCalls from '../../api/database_api'
import IconLocationOn from 'material-ui/svg-icons/action/done';
import {connect} from 'react-redux'
var actions =require('../../actions/actions')

const nearbyIcon = <IconLocationOn />;

const style = {
  margin: 12,
};


class ProfileForm extends Component {
	constructor(props){
		super(props)

        this.state = {
            firstName: '',
            maxBdgs: '',
            minBdgs: '',
            photo: '',
            showCheckboxes: false,
            fixedHeader: true,
            fixedFooter: true,
            stripedRows: false,
            showRowHover: false,
            height: '100%',
        };

    this.onFormSubmit = this.onFormSubmit.bind(this)
	}

    componentWillMount(){
        var dispatch = this.props.dispatch;

		var user = ApiCalls.getUser()
			.then((user)=>{
				dispatch(actions.getUser(user))
				// return user
                this.setState({
                    maxBdgs: user.user.bdgs_high_range,
                    minBdgs: user.user.bdgs_low_range,
                    firstName: user.user.first_name,
                    photo: user.user.photo
                })
                console.log(this.state, 'state in form')
			}).catch((err)=> {
				console.log(err)
			})


    }

    onFormSubmit(e){
        this.props.onFormSubmit(this.state)
    }

	render(){
        var name  = this.state.firstName

		return (
				<div className="form-container">
					<form className="form">
                        <Table
                             height={this.state.height}
                             fixedHeader={this.state.fixedHeader}
                             fixedFooter={this.state.fixedFooter}
                           >

                             <TableBody
                                 displayRowCheckbox={false}
                             >
                                 <TableRow >
                                   <TableRowColumn className="table-header">First Name</TableRowColumn>
                                   <TableRowColumn>{this.state.firstName}</TableRowColumn>
                                 </TableRow>
                                 <TableRow >
                                   <TableRowColumn className="table-header">Bdg Range (low)</TableRowColumn>
                                   <TableRowColumn>{this.state.minBdgs}</TableRowColumn>
                                 </TableRow>
                                 <TableRow >
                                   <TableRowColumn className="table-header">Bdg Range (high)</TableRowColumn>
                                   <TableRowColumn>{this.state.maxBdgs}</TableRowColumn>
                                 </TableRow>
                             </TableBody>
                           </Table>

						<RaisedButton
                            className="form-btn btn"
							icon={nearbyIcon}
							onClick={this.onFormSubmit}
                            backgroundColor={'#9575CD'}
                            primary={true}
                            style={style} >
						</RaisedButton>
				    </form>
				</div>
		)
	}
}

//use matstate to prop when you need acces to store, if you only need to put in to the store you only need to dispatch
function mapStateToProps(store){
	return {
		user: store.user
	}
}
//add mapstate to props when you need to access data
// when you dont need to change the store nothing goes in the first argument
export default connect(mapStateToProps)(ProfileForm)
