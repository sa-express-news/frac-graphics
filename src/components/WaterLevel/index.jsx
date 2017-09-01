// @flow

import React, { Component } from 'react';

import './WaterLevel.css';

export default class WaterLevel extends Component{
	props: {
		height: number
	};

	static defaultProps = {
    	height: 0
  	};

  	state = {
  		height: 0
  	}

  	componentDidMount(){
  		setTimeout(this.updateHeight, 100);
  	}

  	updateHeight = () =>{
		this.setState(() => ({
	  		height: this.props.height
		}));  	
  	}

	render(){

		const waterLevelStyle = {
			height: `${this.state.height}%`
		};

		return(
			<div className='WaterLevel' style={waterLevelStyle}/>
		)
	}
}