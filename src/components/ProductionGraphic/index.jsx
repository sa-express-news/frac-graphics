// @flow

import React, { Component } from 'react';

import { VictoryChart, VictoryLine, VictoryAxis } from 'victory';

import SwipeContainer from '../SwipeContainer';

export default class ProductionGraphic extends Component {

    state = {

        fields: [
            {
                field: 'Permian Basin',
                data: [
                    { x: 2010, y: 11078996.85 },
                    { x: 2011, y: 12202967.4 },
                    { x: 2012, y: 14253900.44 },
                    { x: 2013, y: 16251732.18 },
                    { x: 2014, y: 19569752.18 },
                    { x: 2015, y: 22506903.17 },
                    { x: 2016, y: 24345271.6 }]
            },
            {
                field: 'Eagle Ford',
                data: [
                    { x: 2010, y: 1008209.478 },
                    { x: 2011, y: 3171278.303 },
                    { x: 2012, y: 7561274.117 },
                    { x: 2013, y: 12545536.4 },
                    { x: 2014, y: 17441264.65 },
                    { x: 2015, y: 19053539.3 },
                    { x: 2016, y: 15136979.52 }]
            }
        ],
        currentFieldIndex: 0
    }

    updateIndex = (newIndex: number) => {
        if (newIndex > this.state.fields.length - 1) {
            this.setState(() => ({
                currentFieldIndex: 0
            }));
        } else if (newIndex < 0) {
            this.setState(() => ({
                currentFieldIndex: this.state.fields.length - 1
            }));
        } else {
            this.setState(() => ({
                currentFieldIndex: newIndex
            }));
        }
    }

    moveForward = () => {
        this.updateIndex(this.state.currentFieldIndex + 1);
    }

    moveBackward = () => {
        this.updateIndex(this.state.currentFieldIndex - 1);
    }


    render() {

        const currentFieldIndex = this.state.currentFieldIndex;
        return (
            <div className='Production'>
                <h2>Total oil production</h2>
                <h3>{this.state.fields[currentFieldIndex].field} region</h3>
                <SwipeContainer swipeLeftFunction={this.moveBackward} swipeRightFunction={this.moveForward}>
                    <VictoryChart domainPadding={10} animate={{ duration: 500 }}>
                        <VictoryAxis label={'Year'} tickValues={[2010, 2011, 2012, 2013, 2014, 2015, 2016]} />
                        <VictoryAxis dependentAxis label={'Barrels of oil'} />
                        <VictoryLine data={this.state.fields[currentFieldIndex].data} />
                    </VictoryChart>
                </SwipeContainer>
            </div>
        )
    }
}