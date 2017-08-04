// @flow

import React, { Component } from 'react';
import { VictoryChart, VictoryLine, VictoryAxis } from 'victory';

import fracData from './avg-water-per-job.json';
import './LineGraph.css';

class LineGraph extends Component{

	state = {
		currentCounty:{
			name: 'Andrews',
			field: 'Permian Basin',
			data:[
				{x: 2011, y: 11912.07},
				{x: 2012, y: 143652.6},
				{x: 2013, y: 700725.2131},
				{x: 2014, y: 900312.8612},
				{x: 2015, y: 1894438.489},
				{x: 2016, y: 4277758.182},
				{x: 2017, y: 2810132.542}]
		}
	}

	handleClick = () => {

		let data2 = [
			{x: 2011, y: 417808.6},
			{x: 2012, y: 1960882},
			{x: 2013, y: 5930028.88},
			{x: 2014, y: 7118517.709},
			{x: 2015, y: 8231260.94},
			{x: 2016, y: 8922795.442},
			{x: 2017, y: 11968081.93}
		];

		let newCounty = this.parseData(fracData[2]);

		this.setState(prevState => ({
      		currentCounty: newCounty
   		}));

	}

	parseData = (object) =>{
		let {county, field} = object;

		let data = [
			{x: 2011, y: object[2011]},
			{x: 2012, y: object[2012]},
			{x: 2013, y: object[2013]},
			{x: 2014, y: object[2014]},
			{x: 2015, y: object[2015]},
			{x: 2016, y: object[2016]},
			{x: 2017, y: object[2017]}
		];

		return {
			county: county,
			field: field,
			data: data
		};
	}

	render(){

		return(
			<div className='LineGraph'>
				<h1>Sick-ass chart</h1>
				<button onClick={this.handleClick}>Change</button>
				<VictoryChart domainPadding={10} animate={{duration: 500}}>
					<VictoryAxis tickValues={[2011,2012,2013,2014,2015,2016,2017]}/>
					<VictoryAxis dependentAxis tickFormat={(data) => (`${Math.floor(data) / 100000} gal`)}/>
					<VictoryLine data={this.state.currentCounty.data}/>
				</VictoryChart>
			</div>

		)
	}
}

export default LineGraph;