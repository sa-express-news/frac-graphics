// @flow

import React, { Component } from 'react';

import './WaterLevel.css';

export default class WaterLevel extends Component {
	props: {
		fillPercent: number
	};

	static defaultProps = {
		fillPercent: 0
	};

	state = {
		fillPercent: 0
	}

	componentDidMount() {
		setTimeout(this.updatefillPercent, 1000);
	}

	updatefillPercent = () => {
		this.setState(() => ({
			fillPercent: this.props.fillPercent
		}));
	}

	render() {

		const waterLevelStyle = {
			height: `${this.state.fillPercent}%`
		};

		return (
			<div className='WaterLevel' style={waterLevelStyle}>
				<div className='PoolLine' />
				<div className='PoolLine' />
			</div>
		)
	}
}