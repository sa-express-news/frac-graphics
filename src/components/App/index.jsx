// @flow

import React, { Component } from 'react';

// import BarGraph from '../BarGraph';
import CountyGraphic from '../CountyGraphic';


import './App.css';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <CountyGraphic />
      </div>
    );
  }
}

export default App;