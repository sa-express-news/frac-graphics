// @flow

import React, { Component } from 'react';

import { VictoryChart, VictoryLine, VictoryAxis } from 'victory';

import SwipeContainer from '../SwipeContainer';

export default class WaterUseGraphic extends Component {

    state = {

        fields: [
            {
                field: 'Permian Basin',
                data: [
                    { x: 2011, y: 80275085.6527185 },
                    { x: 2012, y: 3110654483.49269 },
                    { x: 2013, y: 10992988145.479 },
                    { x: 2014, y: 19013412060.4265 },
                    { x: 2015, y: 19618187490.3037 },
                    { x: 2016, y: 24507724904.9625 }]
            },
            {
                field: 'Eagle Ford',
                data: [
                    { x: 2011, y: 158731787 },
                    { x: 2012, y: 4221653746.465857 },
                    { x: 2013, y: 18686007918.3614 },
                    { x: 2014, y: 25742945623.4168 },
                    { x: 2015, y: 17959466915.624 },
                    { x: 2016, y: 11223065773.082 }]
            },
            {
                field: 'Barnett Shale',
                data: [
                    { x: 2011, y: 75819518.4 },
                    { x: 2012, y: 1115478643 },
                    { x: 2013, y: 3759558434.7 },
                    { x: 2014, y: 2604469407.64 },
                    { x: 2015, y: 1475602021.4 },
                    { x: 2016, y: 234880098.47 }]
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
                <h2>Total water use</h2>
                <h3>{this.state.fields[currentFieldIndex].field} region</h3>
                <SwipeContainer swipeLeftFunction={this.moveBackward} swipeRightFunction={this.moveForward}>
                    <VictoryChart domainPadding={10} animate={{ duration: 500 }}>
                        <VictoryAxis label={'Year'} tickValues={[2011, 2011, 2012, 2013, 2014, 2015, 2016]} />
                        <VictoryAxis dependentAxis label={'Gallons of water'} />
                        <VictoryLine data={this.state.fields[currentFieldIndex].data} />
                    </VictoryChart>
                </SwipeContainer>
            </div>
        )
    }
}