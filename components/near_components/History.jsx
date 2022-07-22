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
        const [transaction, set_transaction] = useState(props.tx);

        // console.log(transaction);
        get_transaction_from_hash(transaction.transaction_hash, accountId)
            .then(value => console.log(value));

        // return <p>{JSON.stringify(transaction)}</p>
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
                    '>Action Type</span>
                    <span className='
                        pr-2 text-center font-bold text-blue-800
                    '>Transfer</span>
                    <span className='
                        pl-2 text-start font-bold text-gray-500
                    '>Detail</span>
                    <span className='
                        pr-2 text-center font-bold text-red-500
                    '>Target Account</span>
                </div>

            </div>
        );
    }


    // function Transaction(props){
    //     const [transactions, set_transaction] = useState(props.transaction);
    //     const [tx, set_tx] = useState(undefined);

    //     useEffect(() => {
    //         update_transaction();
    //     }, [transactions]);

    //     async function update_transaction(){
    //         // console.log("Getting transaction");
    //         const transaction = await get_transaction_from_hash(tx_hash, accountId);
    //         // console.log("Transaction acquired");
    //         console.log(transaction);

    //         set_tx(JSON.stringify(transaction));
    //     }

    //     return <p>{tx}</p>;
    // }

    async function load(){
        let transaction_list = await get_transactions(accountId);
        // transaction_list = transaction_list.transactions.map(value => value.transaction_hash);
        console.log(transaction_list);

        setTransactions((_) => {
            return {
                empty: false,
                values: transaction_list.transactions
            }
        });

        // console.log(hashes);
        // console.log(hash);
    }

    // function testing(){
    //     console.log("Counter is ", counter);
    //     setCounter(counter+1);
    // }

    if (transactions.empty === true) {
        return <div><p>loading...</p></div>
    }

    // const render_hashes = [];
    // for (let index = 0; index < counter; index++){
    //     // console.log("Rendering ", index);

    //     render_hashes.push(<Transaction key={index} hash={hash.values[index]} />)
    // }

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
