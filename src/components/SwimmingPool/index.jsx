// @flow

import React, { Component } from 'react';

import WaterLevel from '../WaterLevel';

import './SwimmingPool.css';

export default class SwimmingPool extends Component{
	props: {
		fillPercent: number,
	};

	static defaultProps = {
    	fillPercent: 0,
  	};
  	

	render(){

		return(
			<div className='SwimmingPool'>
				<WaterLevel height={this.props.fillPercent}/>
			</div>

		)
	}
}