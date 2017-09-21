// @flow

import React, { Component } from 'react';

// import BarGraph from '../BarGraph';
import SwimmingPoolGraphic from '../SwimmingPoolGraphic';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <SwimmingPoolGraphic />
      </div>
    );
  }
}

export default App;