// @flow

import React, { Component } from 'react';

import LineGraph from '../LineGraph';

import productionData from './production-by-field.json';
import waterUseData from './total-field-water-use.json';

export default class ProductionWaterUseContainer extends Component {

    state = {
        production: true
    }

    showProduction = () => {
        this.setState(() => ({
            production: true
        }));
    }

    showWaterUse = () => {
        this.setState(() => ({
            production: false
        }));
    }

    render() {
        let component = null;

        if (this.state.production) {
            component =
                <div>
                    <p className='graphic-chatter'>Oil production continues to rise in the Permian Basin, though it dropped in the Eagle Ford area last year.</p>
                    <LineGraph data={productionData} title={'Total oil production'} yearValues={[2010, 2011, 2012, 2013, 2014, 2015, 2016]} dependentAxisLabel={'Millions of barrels/day'} dependentAxisFormat={(data) => (`${Math.floor(data) / 1000000}`)} />
                </div>
        } else {
            component =
                <div>
                    <p className='graphic-chatter'>Though the average frac job in Texas uses more water than it used to, many parts of the state are seeing less overall water use in fracking.</p>
                    <LineGraph data={waterUseData} title={'Total water use'} yearValues={[2011, 2012, 2013, 2014, 2015, 2016]} dependentAxisLabel={'Billions of gallons/year'} dependentAxisFormat={(data) => (`${Math.floor(data) / 1000000000}`)} />
                </div>
        }
        return (
            <div className='ProductionContainer'>
                <div>
                    <p onClick={this.showProduction}>Production</p>
                    <p onClick={this.showWaterUse}>Water Use</p>
                </div>
                {component}
            </div>
        )
    }
}