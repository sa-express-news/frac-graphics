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
        currentFieldIndex: 0,
        isDesktopScreen: false
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

    setIsDesktop = () => {
        //We check height because iPad Pros are 1024x1366, and our desktop story top looks awful on them.
        const isDesktopScreen = window.innerWidth > 1023 && window.innerHeight !== 1366;
        if (isDesktopScreen !== this.state.isDesktopScreen) {
            this.setState({ isDesktopScreen });
        }
    }

    componentDidMount() {
        this.setIsDesktop();
        window.addEventListener('resize', this.setIsDesktop);
    }

    render() {

        let axisStyle = {
            tickLabels: {
                fontSize: this.state.isDesktopScreen ? 14 : 17
            },
            label: {
                fontSize: this.state.isDesktopScreen ? 14 : 17
            }
        };

        const currentFieldIndex = this.state.currentFieldIndex;
        if (!this.props.data[currentFieldIndex]) {
            this.resetFieldIndex();
        }

        let selectors = this.props.data.map((field, index) => {
            return <p className={`${index === this.state.currentFieldIndex ? 'active' : ''}`} onClick={() => this.updateIndex(index)} key={index}>{field.field}</p>
        });

        return (
            <div className='LineGraph'>
                <div className='graphic-toggle'>
                    {selectors}
                </div>
                <p className='region'>{this.props.data[currentFieldIndex].field} region</p>
                <SwipeContainer arrows={false} swipeLeftFunction={this.moveBackward} swipeRightFunction={this.moveForward}>
                    <VictoryChart domainPadding={10} style={{ data: { fill: 'tomato' } }} >
                        <VictoryAxis label={'Year'} tickValues={this.props.yearValues} style={axisStyle} />
                        <VictoryAxis dependentAxis label={this.props.dependentAxisLabel} tickFormat={this.props.dependentAxisFormat} style={axisStyle} />
                        <VictoryLine data={this.props.data[currentFieldIndex].data} style={{ data: { stroke: '#379D92' } }} />
                    </VictoryChart>
                </SwipeContainer>
            </div>
        )
    }
}