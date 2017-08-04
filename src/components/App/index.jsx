// @flow

import React, { Component } from 'react';

// import BarGraph from '../BarGraph';
import LineGraph from '../LineGraph';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className='App'>
          <LineGraph/>
      </div>
    );
  }
}

export default App;