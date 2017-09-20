// @flow

import React, { Component } from 'react';

import SwimmingPool from '../SwimmingPool';
import SwipeContainer from '../SwipeContainer';

import './SwimmingPoolGraphic.css';

export default class SwimmingPoolGraphic extends Component {

	state = {
		fields: [
			{
				name: 'Permian Basin',
				avgWater: 10496987.86
			},
			{
				name: 'Eagle Ford',
				avgWater: 9733680.749
			},
			{
				name: 'Barnett Shale',
				avgWater: 1846268
			}

		],
		currentFieldIndex: 0
	}

	calculateNumberOfPools = (basin: Object) => {
		//There are 660,000 gallons of water in a standard Olympic swimming pool
		// https://en.wikipedia.org/wiki/Olympic-size_swimming_pool
		return basin.avgWater / 660000;
	}

	generatePoolComponents = (num: number) => {
		const numberOfFullPools = Math.floor(num);
		const finalPoolFillLevel = (num - numberOfFullPools) / 10;

		let pools = Array(numberOfFullPools).fill(0).map((el, index) => {
			return <SwimmingPool opacity={1} key={index} />
		});

		pools.push(<SwimmingPool opacity={finalPoolFillLevel} key={Math.random()} />);

		return pools;
	}

	updateIndex = (newIndex: number) => {
		if (newIndex > this.state.fields.length - 1) {
			this.setState(() => ({
				currentFieldIndex: 0
			}));
		} else if (newIndex < 0) {
			this.setState(() => ({
				currentFieldIndex: this.state.fields.length - 1
			}));
		} else {
			this.setState(() => ({
				currentFieldIndex: newIndex
			}));
		}
	}

	moveForward = () => {
		this.updateIndex(this.state.currentFieldIndex + 1);
	}

	moveBackward = () => {
		this.updateIndex(this.state.currentFieldIndex - 1);
	}


	render() {

		let currentCounty = this.state.fields[this.state.currentFieldIndex];

		const numberOfPools = this.calculateNumberOfPools(currentCounty);

		const pools = this.generatePoolComponents(numberOfPools);

		return (
			<SwipeContainer swipeLeftFunction={this.moveBackward} swipeRightFunction={this.moveForward}>
				<h3>{currentCounty.name}</h3>
				<p>The average frac job used {currentCounty.avgWater} gallons of water.</p>
				<p>That's enough to fill {numberOfPools.toFixed(2)} Olympic swimming pools.</p>
				<div className='PoolContainer'>
					{pools}
				</div>
			</SwipeContainer>
		)
	}
}