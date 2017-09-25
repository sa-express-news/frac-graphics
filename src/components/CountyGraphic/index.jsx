// @flow

import React, { Component } from 'react';
import { VictoryChart, VictoryBar, VictoryAxis } from 'victory';

import SearchBar from '../SearchBar';
import SearchResults from '../SearchResults';

import fracData from './avg-water-per-job.json';
import './CountyGraphic.css';

class CountyGraphic extends Component {

	state = {
		currentCounty: {
			county: 'Andrews',
			field: 'Permian Basin',
			data: [
				{ x: 2011, y: 11912.07, width: 40 },
				{ x: 2012, y: 143652.6, width: 40 },
				{ x: 2013, y: 700725.2131, width: 40 },
				{ x: 2014, y: 900312.8612, width: 40 },
				{ x: 2015, y: 1894438.489, width: 40 },
				{ x: 2016, y: 4277758.182, width: 40 },
				{ x: 2017, y: 2810132.542, width: 40 }]
		},
		searchResults: [],
		isDesktopScreen: false
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
			{ x: 2011, y: object[2011], width: 40 },
			{ x: 2012, y: object[2012], width: 40 },
			{ x: 2013, y: object[2013], width: 40 },
			{ x: 2014, y: object[2014], width: 40 },
			{ x: 2015, y: object[2015], width: 40 },
			{ x: 2016, y: object[2016], width: 40 },
			{ x: 2017, y: object[2017], width: 40 }
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

			if (searchInput.length > 1) {
				this.searchForCounty(searchInput);
			}
		}

	}

	clearSearchResults = () => {
		this.setState(({
			searchResults: []
		}));
	}

	setIsDesktop = () => {
		//We check height because iPad Pros are 1024x1366, and our desktop story top looks awful on them.
		const isDesktopScreen = window.innerWidth > 1023 && window.innerHeight !== 1366;
		if (isDesktopScreen !== this.state.isDesktopScreen) {
			this.setState({ isDesktopScreen });
		}
	}

	componentDidMount() {
		this.setIsDesktop();
		window.addEventListener('resize', this.setIsDesktop);
	}

	render() {

		let axisStyle = {
			tickLabels: {
				fontSize: this.state.isDesktopScreen ? 14 : 21
			},
			label: {
				fontSize: this.state.isDesktopScreen ? 14 : 21
			}
		};

		return (
			<div className='CountyGraphic'>
				<h3 className="graphic-title">Average water use per frac job in Texas</h3>
				<div className='Search'>
					<SearchBar placeholder={'Search Texas counties'} onFocus={this.handleSearchBarFocus} keyUpCallback={this.handleSearchInput} />
					<SearchResults results={this.state.searchResults} handleClick={this.handleSearchResultClick} />
				</div>
				<h3 className="County">{this.state.currentCounty.county} County</h3>
				<VictoryChart domainPadding={10} animate={{ duration: 500 }} style={axisStyle}>
					<VictoryAxis label={'Year'} tickValues={[2011, 2012, 2013, 2014, 2015, 2016, 2017]} style={axisStyle} />
					<VictoryAxis dependentAxis label={'Millions of gallons'} tickFormat={(data) => (`${Math.floor(data) / 1000000}`)} style={axisStyle} />
					<VictoryBar data={this.state.currentCounty.data} style={{ data: { fill: '#379D92' } }} />
				</VictoryChart>
				<p className="graphic-source">Source: FracFocus Chemical Disclosure Registry. Data was not available for all counties in all years. 2017 data calculated through July 15.</p>
			</div >

		)
	}
}

export default CountyGraphic;