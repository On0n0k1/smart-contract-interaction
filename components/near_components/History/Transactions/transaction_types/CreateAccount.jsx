import { useEffect, useState } from 'react';

import Single from '../Single';
import Batch from '../Batch';


import BottomLeft from '../micro/BottomLeft';
import BottomRight from '../micro/BottomRight';
import TopLeft from '../micro/TopLeft';
import TopRight from '../micro/TopRight';


export default function CreateAccount(props){
    const tx = props.transaction;

    console.log("CreateAccount called");
    console.log(tx);

    const hash = tx.transaction.hash;
    const receiver_id = tx.transaction.receiver_id;

    if (props.batch){

        if (props.transaction === undefined) {
            console.log("Batch transaction undefined");

            return (<Batch />);
        }

        return (
            <Batch
                action={"Create Account"}
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

    const topLeft = (<TopLeft default={true}>Create Account {tx.transaction.receiver_id}</TopLeft>);
    const topRight = <TopRight hash={hash}/>;
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