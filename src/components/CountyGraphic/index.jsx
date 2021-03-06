// @flow

import React, { Component } from 'react';
import { VictoryChart, VictoryBar, VictoryAxis } from 'victory';

import SearchBar from '../SearchBar';
import SearchResults from '../SearchResults';

import fracData from './avg-water-per-job.json';
import './LineGraph.css';

class CountyGraphic extends Component {

	state = {
		currentCounty: {
			county: 'Andrews',
			field: 'Permian Basin',
			data: [
				{ x: 2011, y: 11912.07 },
				{ x: 2012, y: 143652.6 },
				{ x: 2013, y: 700725.2131 },
				{ x: 2014, y: 900312.8612 },
				{ x: 2015, y: 1894438.489 },
				{ x: 2016, y: 4277758.182 },
				{ x: 2017, y: 2810132.542 }]
		},
		searchResults: []
	}

	handleSearchResultClick = (event: Event) => {
		let target = event.target;

		if (target instanceof HTMLLIElement) {
			let selectedCounty = target.textContent;

			let newCounty = this.state.searchResults.filter(matchesCountyName)[0];

			this.setState(({
				currentCounty: this.parseData(newCounty),
				searchResults: []
			}));

			function matchesCountyName(countyData: Object) {
				return countyData.county === selectedCounty;
			}
		}



	}

	parseData = (object: Object) => {
		let { county, field } = object;

		let data = [
			{ x: 2011, y: object[2011] },
			{ x: 2012, y: object[2012] },
			{ x: 2013, y: object[2013] },
			{ x: 2014, y: object[2014] },
			{ x: 2015, y: object[2015] },
			{ x: 2016, y: object[2016] },
			{ x: 2017, y: object[2017] }
		];

		return {
			county: county,
			field: field,
			data: data
		};
	}

	handleSearchInput = (event: Event) => {
		let target = event.target;
		if (target instanceof HTMLInputElement) {
			let searchInput = target.value;

			this.searchForCounty(searchInput);
		}

	}

	searchForCounty = (county: string) => {
		let caseInsensitiveRegEx = new RegExp(county, 'i');

		let arrayOfCountyMatches = fracData.filter(matchesCountyName);

		function matchesCountyName(countyData: Object) {
			return countyData.county.search(caseInsensitiveRegEx) !== -1;
		}

		this.setState(({
			searchResults: arrayOfCountyMatches
		}));
	}

	renderAllCounties = () => {
		this.setState(({
			searchResults: fracData
		}));
	}

	handleSearchBarFocus = (event: Event) => {
		let target = event.target;
		if (target instanceof HTMLInputElement) {
			let searchInput = target.value;

			if (searchInput === '') {
				this.setState(({
					searchResults: fracData
				}));
			} else {
				this.searchForCounty(searchInput);
			}
		}

	}

	clearSearchResults = () => {
		this.setState(({
			searchResults: []
		}));
	}

	render() {

		// let axisStyle = {
		// 	axisLabel: {fontSize: 15, margin: 20},
		// };

		let chartStyle = {
			labels: { opacity: 0.5 }
		};

		return (
			<div className='LineGraph'>
				<h2 className="LineGraphTitle">Average water use per frac job in Texas</h2>
				<h3 className="County">{this.state.currentCounty.county} County</h3>
				<div className='Search'>
					<SearchBar placeholder={'Search by county'} onFocus={this.handleSearchBarFocus} keyUpCallback={this.handleSearchInput} />
					<SearchResults results={this.state.searchResults} handleClick={this.handleSearchResultClick} />
				</div>
				<VictoryChart domainPadding={10} animate={{ duration: 500 }} style={chartStyle}>
					<VictoryAxis label={'Year'} tickValues={[2011, 2012, 2013, 2014, 2015, 2016, 2017]} />
					<VictoryAxis dependentAxis label={'Millions of gallons'} tickFormat={(data) => (`${Math.floor(data) / 1000000}`)} />
					<VictoryBar data={this.state.currentCounty.data} />
				</VictoryChart>
				<p className="LineGraphChatter">Note: data was not available for all counties in all years. 2017 data calculated through July 15.</p>
				<p className="LineGraphChatter">Source: FracFocus Chemical Disclosure Registry</p>
			</div>

		)
	}
}

export default CountyGraphic;