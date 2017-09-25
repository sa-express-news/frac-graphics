// @flow

import React, { Component } from 'react';

import './WaterLevel.css';

export default class WaterLevel extends Component {
	props: {
		opacity: number
	};

	static defaultProps = {
		opacity: 0
	};

	state = {
		opacity: 0
	}

	componentDidMount() {
		setTimeout(this.updateOpacity, 1000);
	}

	updateOpacity = () => {
		this.setState(() => ({
			opacity: this.props.opacity
		}));
	}

	render() {

		const waterLevelStyle = {
			opacity: `${this.state.opacity}`
		};

		return (
			<div className='WaterLevel' style={waterLevelStyle}>
				<div className='PoolLine' />
				<div className='PoolLine' />
			</div>
		)
	}
}