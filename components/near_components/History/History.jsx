import { useEffect, useState } from 'react';

import get_transactions from '../../../lib/near_functions/get_transactions.js';
import get_transaction_from_hash from '../../../lib/near_functions/get_transaction_from_hash';
import Transaction from './Transactions/Transaction';


// This is just a copy paste of an example for transaction history.
// Once I understand it properly I will adapt it to a proper component
export default function History(props){
    const accountId = props.accountId;

    const [transactions, setTransactions] = useState({
        empty: true,
        values: [],
    });

    // const [counter, setCounter] = useState(0);

    useEffect(() => {
        load();
    },[]);


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
