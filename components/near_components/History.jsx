import { useEffect, useState } from 'react';

import get_a_transaction from "../near_functions/get_transaction_history";
import get_transaction_from_hash from '../near_functions/get_transaction_from_hash.js';
// import get_block_hash from '../near_functions/get_block_hash.js';

function is_promise(value){
    return (typeof value === 'object' && typeof value.then === 'function');
}



// This is just a copy paste of an example for transaction history.
// Once I understand it properly I will adapt it to a proper component
export default function History(props){
    // return (<button onClick={get_transaction_history}>Load Recent Transactions</button>);

    const contract_id = props.contractId;
    // const first_block_hash = get_block_hash(contract_id);

    // const [loading, setLoading] = useState(undefined);
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

    // const includeHashes = (new_hashes) => {
    //     console.log("New Hashes");
    //     console.log(new_hashes);
    //     console.log("The length is ", new_hashes.length);

    //     setHash((existingItems) => {

    //         for (let index in new_hashes){
    //             // console.log(value);
    //             existingItems.push(new_hashes[index]);
    //         }

    //         // existingItems = [...existingItems, new_hashes];
    //         return existingItems;
    //     });
    // }

    async function load(){
        // const first_hash = await get_block_hash(contract_id);
        // setHash(first_hash);
        let hashes = await get_a_transaction(contract_id);
        hashes = hashes.transactions.map(value => value.transaction_hash);
            // .map((value) => value.transaction_hash);
        // ;
        // const hashes_parsed = hashes_raw.map((value)=> value.transaction_hash );

        // hashes.forEach(value => {
        //     console.log(value.transaction_hash);
        //     includeHash(value.transaction_hash);
        // });

        // includeHashes(hashes);

        // setHash(hashes);
        setHash((_) => {
            return {
                empty: false,
                values: hashes
            }
        });

        console.log(hashes);
        console.log(hash);
    }

    // async function new_hash(){
    //     let result = await get_a_transaction(contract_id);
    //     console.log("Setting new hash to " + result.prev_hash);
    //     setHash(result.prev_hash);
    // }

    function testing(){
        // get_a_transaction(contract_id);
        // console.log(hash);
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
            {/* <p>The next hash is {hash}</p> */}
            {/* <button onClick={new_hash}>Load new Transaction (check console)</button> */}
            <button onClick={testing}>testing</button>
            {render_hashes}
        </div>
    );
}
