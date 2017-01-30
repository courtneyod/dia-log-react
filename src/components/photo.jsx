import React, {Component} from 'react'

export default class Photo extends Component {
	constructor(props){
		super(props)
	}

	render(){
		let {photoUrl, id, preMealBdgs, postMealBdgs, insulinUnits, preMealBdgsTimeStamp, customerId} = this.props
		return (
				<div className="photo-container">
					<div className="date-container">
						<div className="date">{preMealBdgsTimeStamp}</div>
					</div>
					<div className="photo">
						<img src={photo} alt=""/>
					</div>
					<div className="stats-container">
						<ul>
							<li>Categories: {preMealBdgs}</li>
							<li>Pre Meal Bdgs: {preMealBdgs}</li>
							<li>Post Meal Bdgs: {postMealBdgs}</li>
							<li>Units: {insulinUnits}</li>
						</ul>
					</div>

				</div>
		)
	}
}
