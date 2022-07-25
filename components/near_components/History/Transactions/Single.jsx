import { useState, useEffect } from 'react';

import BottomLeft from './micro/BottomLeft';
import BottomRight from './micro/BottomRight';
import TopLeft from './micro/TopLeft';
import TopRight from './micro/TopRight';

export default function Single(props){
    const action = props.action? props.action : (<TopLeft default={true}>"Action Type"</TopLeft>);
    const detail = props.detail? props.detail : (<BottomLeft default={true}>"Details"</BottomLeft>);
    const transfer = props.transfer? props.transfer : (<TopRight default={true}>"NEAR Transfer"</TopRight>);
    const target = props.target? props.target : (<BottomRight default={true}>"Target Account</BottomRight>);


    return (
        <div className='p-4 m-2
            w-auto rounded-lg shadow-lg
            flex flex-row
        '>
            <div className='
                w-20 h-20 bg-red-700
            '></div>
            <div className='
                p-2 w-full
                grid grid-cols-2 gap-2 justify-between
            '>
                {action}
                {transfer}
                {detail}
                {target}
            </div>
        </div>
    );
}
