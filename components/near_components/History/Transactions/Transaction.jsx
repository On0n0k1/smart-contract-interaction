import { useState, useEffect } from 'react';

import Single from './Single';

import AddKey from './transaction_types/AddKey';
import CreateAccount from './transaction_types/CreateAccount';
import FunctionCall from './transaction_types/FunctionCall';
import Transfer from './transaction_types/Transfer';


// Represents which component is shown when loading
function Loading(){
    // Replace it with a "loading..." component later
    console.log("Loading Called");
    return (<Single />);
}


// Represents which component is shown when an error in loading happens.
function ErrorTransaction(props){
    // There might be a transaction type I forgot to consider.
    // In that case, make the component invisible and log transaction.
    console.log("Failed to detect transaction. Transaction:");
    console.log(props.transaction);

    return (<div className="hidden"/>);
}


// Look at transaction and returns
export default function Transaction(props){
    const [tx, set_tx] = useState(undefined);
    // console.log("Transaction called");

    useEffect(()=> {
        // The initial state of the transactions is a promise.
        // Update the state of the transaction when it is complete.

        props.tx.then(value => {
            console.log(value);
            set_tx(value);
        });
    }, []);

    // console.log("Selector called");
    // console.log(props.tx);

    if (tx === undefined){
        // console.log("Transaction is undefined");
        return (<Loading />);
    }

    // console.log("Transaction is not undefined");
    // console.log(tx);
    if (tx.transaction.actions[0].FunctionCall !== undefined){
        return (<FunctionCall transaction={tx} />);
    }

    if (tx.transaction.actions[0].Transfer !== undefined) {
        return (<Transfer transaction={tx} />);
    }

    // For some reason, when it's CreateAccount, the value is a String.
    if (tx.transaction.actions[0] === "CreateAccount") {
        return (<CreateAccount transaction={tx} />);
    }

    if (tx.transaction.actions[0].AddKey !== undefined) {
        return (<AddKey transaction={tx}  />);
    }

    return (<ErrorTransaction />);
}
