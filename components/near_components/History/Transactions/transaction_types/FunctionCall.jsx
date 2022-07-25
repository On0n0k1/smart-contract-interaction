import { useEffect, useState } from 'react';

import Single from '../Single';
import Batch from '../Batch';


import BottomLeft from '../micro/BottomLeft';
import BottomRight from '../micro/BottomRight';
import TopLeft from '../micro/TopLeft';
import TopRight from '../micro/TopRight';


export default function FunctionCall(props){
    const tx = props.transaction;

    console.log("FunctionCall called");
    console.log(tx);

    if (props.batch){

        if (props.transaction === undefined) {
            console.log("Batch transaction undefined");

            return (<Batch />);
        }

        return (
            <Batch
                action={"Function Call"}
                transfer={undefined}
                detail={undefined}
                target={tx.transaction.target}
            />
        );
    }

    if (props.transaction === undefined){
        console.log("Single transaction undefined");
        return (<Single/>);
    }


    const action = (<TopLeft default={true}>Function Call</TopLeft>);
    const transfer = undefined;
    const detail = undefined;
    const target = (<BottomRight default={true}>{tx.transaction.receiver_id}</BottomRight>)

    return (
        <Single
            action={action}
            transfer={transfer}
            detail={detail}
            target={target}
        />
    );
}
