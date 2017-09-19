// @flow

import React, { Component } from 'react';

// import BarGraph from '../BarGraph';
import CountyGraphic from '../CountyGraphic';
import SwimmingPoolGraphic from '../SwimmingPoolGraphic';
import ProductionGraphic from '../ProductionGraphic';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <CountyGraphic />
        <SwimmingPoolGraphic />
        <ProductionGraphic />
      </div>
    );
  }
}

export default App;