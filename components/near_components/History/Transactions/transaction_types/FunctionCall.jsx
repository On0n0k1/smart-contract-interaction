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

    const hash = tx.transaction.hash;

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

    const signer = tx.transaction.signer_id;

    const method_name = tx.transaction.actions[0].FunctionCall.method_name;
    const target_account = tx.transaction.receiver_id;


    const topLeft = (<TopLeft default={true}>Called method {method_name} for account {target_account}</TopLeft>);
    const topRight = (<TopRight hash={hash}/>);
    const bottomLeft = <BottomLeft signer={signer}/>;
    const bottomRight = (<BottomRight timestamp={props.timestamp}/>);

    return (
        <Single
            topLeft={topLeft}
            topRight={topRight}
            bottomLeft={bottomLeft}
            bottomRight={bottomRight}
        />
    );
}
