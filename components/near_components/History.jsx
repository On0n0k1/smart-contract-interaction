import { useEffect, useState } from 'react';

import get_transaction_hashes from '../../lib/near_functions/get_transaction_hashes.js';
import get_transaction_from_hash from '../../lib/near_functions/get_transaction_from_hash';


// This is just a copy paste of an example for transaction history.
// Once I understand it properly I will adapt it to a proper component
export default function History(props){
    // return (<button onClick={get_transaction_history}>Load Recent Transactions</button>);

    const contract_id = props.contractId;
    // const first_block_hash = get_block_hash(contract_id);

    const [hash, setHash] = useState({
        empty: true,
        values: [],
    });

    const [counter, setCounter] = useState(0);

    useEffect(() => {
        load();
    },[]);


    function Transaction(props){
        const [tx_hash, set_tx_hash] = useState(props.hash);
        const [tx, set_tx] = useState(undefined);

        useEffect(() => {
            update_transaction();
        }, [tx_hash]);

        async function update_transaction(){
            console.log("Getting transaction");
            const transaction = await get_transaction_from_hash(tx_hash, contract_id);
            console.log("Transaction acquired");

            set_tx(JSON.stringify(transaction));
        }

        return <p>{tx}</p>;
    }

    async function load(){
        let hashes = await get_transaction_hashes(contract_id);
        hashes = hashes.transactions.map(value => value.transaction_hash);
        setHash((_) => {
            return {
                empty: false,
                values: hashes
            }
        });

        console.log(hashes);
        console.log(hash);
    }

    function testing(){
        console.log("Counter is ", counter);
        setCounter(counter+1);
    }

    if (hash === undefined) {
        return <div><p>loading...</p></div>
    }

    const render_hashes = [];
    for (let index = 0; index < counter; index++){
        console.log("Rendering ", index);
        // render_hashes.push(<p key={index}>{hash.values[index]}</p>);
        render_hashes.push(<Transaction key={index} hash={hash.values[index]} />)
    }

    return (
        <div>
            <button onClick={testing}>testing</button>
            {render_hashes}
        </div>
    );
}
