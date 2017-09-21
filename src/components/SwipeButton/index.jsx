// @flow

import React from 'react';

import './SwipeButton.css';

const SwipeButton = ({ left, leftClickFunction, rightClickFunction }) => {
    if (left && leftClickFunction) {
        return (
            <div className='SwipeButtonContainer Left'>
                <div className='SwipeButton' onClick={leftClickFunction}>&lt;</div>
            </div>
        )
    } else {
        return (
            <div className='SwipeButtonContainer Right'>
                <div className='SwipeButton' onClick={rightClickFunction}>&gt;</div>
            </div>
        )
    }
}

export default SwipeButton;