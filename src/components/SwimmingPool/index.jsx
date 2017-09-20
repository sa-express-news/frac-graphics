// @flow

import React, { Component } from 'react';

import WaterLevel from '../WaterLevel';

import './SwimmingPool.css';

export default class SwimmingPool extends Component {
	props: {
		opacity: number,
	};

	static defaultProps = {
		opacity: 0,
	};


	render() {

		return (
			<div className='SwimmingPool'>
				<WaterLevel opacity={this.props.opacity} />
			</div>

		)
	}
}