// @flow

import React, { Component } from 'react';

import { VictoryChart, VictoryLine, VictoryAxis } from 'victory';

export default class ProductionGraphic extends Component {

    state = {
        field: 'Permian Basin',
        data: [
            { x: 2010, y: 11078996.85 },
            { x: 2011, y: 12202967.4 },
            { x: 2012, y: 14253900.44 },
            { x: 2013, y: 16251732.18 },
            { x: 2014, y: 19569752.18 },
            { x: 2015, y: 22506903.17 },
            { x: 2016, y: 24345271.6 }]
    }

    parseData = (object: Object) => {
        let { field } = object;

        let data = [
            { x: 2010, y: object[2010] },
            { x: 2011, y: object[2011] },
            { x: 2012, y: object[2012] },
            { x: 2013, y: object[2013] },
            { x: 2014, y: object[2014] },
            { x: 2015, y: object[2015] },
            { x: 2016, y: object[2016] }
        ];

        return {
            field: field,
            data: data
        };
    }

    render() {
        return (
            <div className='Production'>
                <VictoryChart domainPadding={10} animate={{ duration: 500 }}>
                    <VictoryAxis label={'Year'} tickValues={[2010, 2011, 2012, 2013, 2014, 2015, 2016]} />
                    <VictoryAxis dependentAxis label={'Millions of gallons'} />
                    <VictoryLine data={this.state.data} />
                </VictoryChart>
            </div>
        )
    }
}