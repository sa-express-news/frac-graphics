// @flow

import React, { Component } from 'react';

import { VictoryChart, VictoryLine, VictoryAxis } from 'victory';

import SwipeContainer from '../SwipeContainer';

export default class LineGraph extends Component {
    props: {
        data: Object[],
        yearValues: number[],
        dependentAxisLabel: string,
        dependentAxisFormat: Function
    };

    state = {
        fields: this.props.data,
        currentFieldIndex: 0
    };

    updateIndex = (newIndex: number) => {
        if (newIndex > this.props.data.length - 1) {
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

    resetFieldIndex = () => {
        this.setState(() => ({
            currentFieldIndex: 0
        }));
    }

    render() {

        const currentFieldIndex = this.state.currentFieldIndex;
        if (!this.props.data[currentFieldIndex]) {
            this.resetFieldIndex();
        }
        return (
            <div className='LineGraph'>
                <h3>{this.props.data[currentFieldIndex].field} region</h3>
                <SwipeContainer arrows={false} swipeLeftFunction={this.moveBackward} swipeRightFunction={this.moveForward}>
                    <VictoryChart domainPadding={10} animate={{ duration: 500 }}>
                        <VictoryAxis label={'Year'} tickValues={this.props.yearValues} />
                        <VictoryAxis dependentAxis label={this.props.dependentAxisLabel} tickFormat={this.props.dependentAxisFormat} />
                        <VictoryLine data={this.props.data[currentFieldIndex].data} style={{ fill: '#379d92' }} />
                    </VictoryChart>
                </SwipeContainer>
            </div>
        )
    }
}