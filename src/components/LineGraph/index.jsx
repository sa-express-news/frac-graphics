// @flow

import React, { Component } from 'react';

import { VictoryChart, VictoryLine, VictoryAxis } from 'victory';

import SwipeContainer from '../SwipeContainer';

export default class LineGraph extends Component {
    props: {
        data: Object[],
        title: string,
        yearValues: number[],
        dependentAxisLabel: string
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

    render() {

        const currentFieldIndex = this.state.currentFieldIndex;
        return (
            <div className='LineGraph'>
                <h3 className='graphic-title'>{this.props.title}</h3>
                <h3>{this.props.data[currentFieldIndex].field} region</h3>
                <SwipeContainer swipeLeftFunction={this.moveBackward} swipeRightFunction={this.moveForward}>
                    <VictoryChart domainPadding={10} animate={{ duration: 500 }}>
                        <VictoryAxis label={'Year'} tickValues={this.props.yearValues} />
                        <VictoryAxis dependentAxis label={this.props.dependentAxisLabel} />
                        <VictoryLine data={this.props.data[currentFieldIndex].data} />
                    </VictoryChart>
                </SwipeContainer>
            </div>
        )
    }
}