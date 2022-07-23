import { useEffect, useState } from 'react';

import get_transactions from '../../lib/near_functions/get_transactions.js';
import get_transaction_from_hash from '../../lib/near_functions/get_transaction_from_hash';


// This is just a copy paste of an example for transaction history.
// Once I understand it properly I will adapt it to a proper component
export default function History(props){
    // return (<button onClick={get_transaction_history}>Load Recent Transactions</button>);

    const accountId = props.accountId;
    // const first_block_hash = get_block_hash(accountId);

    const [transactions, setTransactions] = useState({
        empty: true,
        values: [],
    });

    // const [counter, setCounter] = useState(0);

    useEffect(() => {
        load();
    },[]);

    function Transaction(props){


        function View(props){

            // Check action and returns the type of transaction.
            function check_action(){
                if (props.actions[0].FunctionCall !== undefined){
                    return "Function Call";
                }
                if (props.actions[0].Transfer !== undefined) {
                    return "Transfer";
                }
                if (props.actions[0] === "CreateAccount") {
                    return "Create Account";
                }
                if (props.actions[0].AddKey !== undefined) {
                    return "Add Key";
                }

                // The following lines were for debugging.
                // I think all possible types of transactions have been considered above.
                console.log("Failed in this one");
                console.log(props.actions[0]);

                return "(Action Type)";
            }

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
                        <span className='
                            pl-2 text-start font-bold
                        '>{props.actions ? check_action() : "Action Type"}</span>
                        <span className='
                            pr-2 text-center font-bold text-blue-800
                        '>{props.transfer ? props.transfer : "(Near transferred)"}</span>
                        <span className='
                            pl-2 text-start font-bold text-gray-500
                        '>{props.detail ? props.detail : "Details"}</span>
                        <span className='
                            pr-2 text-center font-bold text-red-500
                        '>{props.target ? props.target : "Target Account"}</span>
                    </div>
                </div>
            );
        }

        const [tx, set_tx] = useState(undefined);

        useEffect(()=> {
            // The initial state of the transactions is a promise.
            // Update the state of the transaction when it is complete.

            props.tx.then(value => {
                console.log(value);
                set_tx(value);
            });
        }, []);


        // console.log("tx");
        // console.log(tx);
        if (tx === undefined) {
            return (<View />);
        }


        // return <p>{JSON.stringify(transaction)}</p>
        // console.log(tx);
        return <View
            target={tx.transaction.receiver_id}
            actions={tx.transaction.actions}
        />;
    }


    async function load(){
        let transaction_list = await get_transactions(accountId);
        // transaction_list = transaction_list.transactions.map(value => value.transaction_hash);
        console.log(transaction_list);

        let values = transaction_list.transactions.map((tx) => { return get_transaction_from_hash(tx.transaction_hash, accountId)});

        setTransactions((_) => {
            return {
                empty: false,
                values: values,
            }
        });

    }

    if (transactions.empty === true) {
        return <div><p>loading...</p></div>
    }


    const render_transactions = [];

    console.log("Length is ", transactions.values.length);
    for (let index = 0; index < transactions.values.length; index++) {
        render_transactions.push(<Transaction key={index} tx={transactions.values[index]} />);
    }

    return (
        <div>
            {/* <button onClick={testing}>testing</button> */}
            {render_transactions}
        </div>
    );
}
