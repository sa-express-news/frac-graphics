// @flow

import React, { Component } from 'react';

export default class SwipeContainer extends Component {
	props: {
		swipeLeftFunction: Function,
		swipeRightFunction: Function,
		timeThreshold: number,
		children: any,
	}

	static defaultProps = {
		timeThreshold: 400,
	};

	state = {
		touchStartX: null,
		touchStartY: null,
		lastChange: new Date()
	};

	handleTouchStart = (event: TouchEvent) => {

		const theTouch = event.touches[0];

		this.setState(prevState => ({
			touchStartX: theTouch.screenX,
			touchStartY: theTouch.screenY
		}));
	}

	handleTouchEnd = (event: TouchEvent) => {
		const theTouch = event.changedTouches[0];

		if (this.state.touchStartX === null || this.state.touchStartY === null) return;

		if (this.state.touchStartX - theTouch.screenX >= 75) {
			this.props.swipeLeftFunction();
		}

		if (theTouch.screenX - this.state.touchStartX >= 75) {
			this.props.swipeRightFunction();
		}

	}

	shouldComponentUpdate = (nextProps: any, nextState: any) => {
		const millisecondsSinceLastChange = new Date().getTime() - this.state.lastChange.getTime();

		if (millisecondsSinceLastChange < this.props.timeThreshold) {
			return false;
		}

		return true;
	}

	render() {
		return (
			<div className='SwipeContainer' onTouchStart={this.handleTouchStart} onTouchEnd={this.handleTouchEnd}>
				{this.props.children}
			</div>
		)
	}


}