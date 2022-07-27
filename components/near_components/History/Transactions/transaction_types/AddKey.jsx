import { useEffect, useState } from 'react';
import Link from 'next/link';

import Single from '../Single';
import Batch from '../Batch';

import BottomLeft from '../micro/BottomLeft';
import BottomRight from '../micro/BottomRight';
import TopLeft from '../micro/TopLeft';
import TopRight from '../micro/TopRight';


export default function AddKey(props){
    const tx = props.transaction;

    console.log("AddKey called");
    console.log(tx);

    if (props.batch){

        if (props.transaction === undefined) {
            console.log("Batch transaction undefined");

            return (<Batch />);
        }

        return (
            <Batch
                action={"Add Key"}
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
    const hash = tx.transaction.hash;

    const action = tx.transaction.actions[0].AddKey;
    const public_key = ("" + action.public_key).substring(0, 12) + "...";
    const permission = action.access_key.permission;

    // If this is still shown as Unknown in the webpage.
    // It means we need to implement the new type here.
    var receiver_id = "Unknown";
    var permission_text = "Unknown permissions";

    // Need to know how all types of access keys are represented in this json.
    // Currently only know "FullAccess" and "FunctionCall"
    if (permission.FunctionCall) {
        receiver_id = permission.FunctionCall.receiver_id;

        // Method names length
        let mn_length = permission.FunctionCall.method_names.length;

        if (mn_length == 0){
            permission_text = "Permission to call any method";
        } else {
            permission_text = "Permission to call " + mn_length + " methods";
        }


    } else if (permission === "FullAccess"){
        receiver_id = tx.transaction.receiver_id;
        permission_text = "Full Access permission"
    }


    const topLeft = (<TopLeft default={true}>Add access Key for {receiver_id}: {public_key}  with {permission_text}</TopLeft>);
    const topRight = (<TopRight hash={hash}/>);
    const bottomLeft = (<BottomLeft signer={signer}/>);
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
