// @flow

import React, { Component } from 'react';

import './SearchResults.css';



class SearchResults extends Component {
	props: {
		results: Array<any>,
		handleClick: Function
	};

	render() {
		let results = this.props.results.map((result, index) => {
			return <li onClick={this.props.handleClick} key={index} className='SearchResult' tabIndex={index}>{result.county}</li>
		})
		return (
			<ul className='SearchResults'>
				{results}
			</ul>
		)
	}


}

export default SearchResults;