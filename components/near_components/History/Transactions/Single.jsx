import { useState, useEffect } from 'react';

import BottomLeft from './micro/BottomLeft';
import BottomRight from './micro/BottomRight';
import TopLeft from './micro/TopLeft';
import TopRight from './micro/TopRight';

export default function Single(props){
    const topLeft = props.topLeft? props.topLeft : (<TopLeft default={true}>"Action Type"</TopLeft>);
    const bottomLeft = props.bottomLeft? props.bottomLeft : (<BottomLeft default={true}>"Details"</BottomLeft>);
    const topRight = props.topRight? props.topRight : (<TopRight default={true}>"NEAR Transfer"</TopRight>);
    const bottomRight = props.bottomRight? props.bottomRight : (<BottomRight default={true}>"Target Account</BottomRight>);


    return (
        <div className='px-4 py-2 m-2
            w-auto rounded-lg shadow-lg
            flex flex-row bg-white
        '>
            <div className='
                w-20 h-20 bg-white
            '></div>
            <div className='
                p-2 w-full
                grid grid-cols-2 gap-2 justify-between
            '>
                {topLeft}
                {topRight}
                {bottomLeft}
                {bottomRight}
            </div>
        </div>
    );
}
