// @flow

import React, { Component } from 'react';

import './SearchBar.css'

class SearchBar extends Component{
	props: {
		placeholder: string,
		keyUpCallback?: Function,
		onFocus?: Function,
	};

	render(){
		return(
			<input className='SearchBar' type="text" onFocus={this.props.onFocus} onKeyUp={this.props.keyUpCallback} placeholder={this.props.placeholder}></input>
		)
	}


}

export default SearchBar;