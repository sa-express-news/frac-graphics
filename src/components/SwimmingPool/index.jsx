// @flow

import React, { Component } from 'react';

import './SwimmingPool.css';

export default class SwimmingPool extends Component{
	props: {
		fillPercent: number,
	};

	static defaultProps = {
    	fillPercent: 0,
  	};
  	

	render(){

		const waterLevelStyle = {
			height: `${this.props.fillPercent}%`
		};

		return(
			<div className='SwimmingPool'>
				<div className='WaterLevel' style={waterLevelStyle}/>
			</div>

		)
	}
}