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
            component = <LineGraph data={productionData} title={'Total oil production'} yearValues={[2010, 2011, 2012, 2013, 2014, 2015, 2016]} dependentAxisLabel={'Barrels of oil'} />
        } else {
            component = <LineGraph data={waterUseData} title={'Total water use'} yearValues={[2011, 2012, 2013, 2014, 2015, 2016]} dependentAxisLabel={'Gallons of water'} />
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