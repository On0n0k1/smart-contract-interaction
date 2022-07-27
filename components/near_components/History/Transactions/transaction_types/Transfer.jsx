import { useEffect, useState } from 'react';

import Single from '../Single';
import Batch from '../Batch';


import BottomLeft from '../micro/BottomLeft';
import BottomRight from '../micro/BottomRight';
import TopLeft from '../micro/TopLeft';
import TopRight from '../micro/TopRight';

// n at the end means it's a big int that supports big int operations.
// It equals to the integer of said value, but it's not the same type as a regular integer.
//
// One Near is 1 * 10²⁴ yocto Near
const ONE_NEAR = 1_000_000_000_000_000_000_000_000n;


export default function Transfer(props){
    const tx = props.transaction;



    console.log("Transfer called");
    console.log(tx);


    const hash = tx.transaction.hash;

    if (props.batch){

        if (props.transaction === undefined) {
            console.log("Batch transaction undefined");

            return (<Batch />);
        }

        return (
            <Batch
                action={"Transfer"}
                transfer={undefined}
                detail={undefined}
                target={tx.target}
            />
        );
    }

    if (props.transaction === undefined){
        console.log("Single transaction undefined");
        return (<Single/>);
    }
    
    const signer = tx.transaction.signer_id;
    const receiver = tx.transaction.receiver_id;

    

    // deposit is in yoctoNEAR
    console.log(tx);
    let deposit = BigInt(tx.transaction.actions[0].Transfer.deposit);
    let deposit_string = "";
    if (deposit >= ONE_NEAR) {
        deposit = deposit / ONE_NEAR;

        // String + number = String
        deposit_string += deposit + " NEAR";
    } else {
        deposit_string += deposit + " Yocto NEAR";
    }

    

    const topLeft = (<TopLeft default={true}>Transferred {deposit_string} to {receiver}</TopLeft>);
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
