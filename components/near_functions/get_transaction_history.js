const { connect, keyStores } = require("near-api-js");
import axios from 'axios';
// const { Client } = require('pg');

import get_block_hash from './get_block_hash';


// Get a block transaction and returns
// {
//     block,
//     previous_hash,
// }

export default async function select_transactions(accountId){
    // console.log(value);
    // let data = {content: value};
    console.log("accountId is ", accountId);
    // let data = {content: accountId};
    // axios.post('/api/sendpost', data)
    //     .then((response) => {
    //         console.log(response);
    //     });
    let result = await axios.get(`/api/transactions/${accountId}`);

    if (result.status === 200){
        const hashes = result.data;
        console.log(hashes);
        return hashes;
    }

    console.log(result);

    return result;
}

// export async function select_transactions(accountId){
//     // const client = new Client({
//     //     user: 'postgres',
//     //     host: 'localhost',
//     //     database: 'testdb',
//     //     password: '1234abcd',
//     //     port: 5432,
//     // });

//     const client = new Client({
//         user:"public_readonly",
//         host:"35.184.214.98",
//         database:"testnet_explorer",
//         password: "nearprotocol",
//     })

//     client.connect();

//     // const query = `
//     //     SELECT *
//     //     FROM users
//     // `;

//     const query = `
//     select 
//         date_trunc('minute', to_timestamp(block_timestamp/1000/1000/1000)) as time,
//         signer_account_id as signer,
//         receiver_account_id as receiver
//     from 
//         transactions t
//     where
//         receiver_account_id = 'guest-book.testnet'
//     `

//     client.query(query, (err, res) => {
//         if (err) {
//             console.error(err);
//             return;
//         }
//         for (let row of res.rows) {
//             console.log(row);
//         }
//         client.end();
//     });
// }



export async function get_a_few_transaction_hashes(accountId){
    var block_hash = await get_block_hash(accountId);
    const keyStore = new keyStores.BrowserLocalStorageKeyStore();

    const config = {
        keyStore,
        networkId: "testnet",
        nodeUrl: "https://archival-rpc.testnet.near.org",
    };

    const near = await connect(config);

    var response = get_a_few_transactions(near);

    for (let i = 0; i < 100000 ; i++) {
        console.log("Counting %d", i);
        response = await get_a_few_transactions(near);
        block_hash = (await response).prev_hash;

        if (response.found){
            break;
        }
    }

    async function get_a_few_transactions(nearConnection){
        var found = false;

        const blockInfoByHeight = await nearConnection.connection.provider.block({
            blockId: block_hash,
        });


        // console.log(blockInfoByHeight);

        const chunk_hashes = blockInfoByHeight.chunks.map((chunk) => chunk.chunk_hash);
        const chunk_details = await Promise.all(chunk_hashes.map((chunk_detail) => nearConnection.connection.provider.chunk(chunk_detail)));

        // console.log(chunk_details);

        const previous_hash = blockInfoByHeight.header.prev_hash;


        const transactions = chunk_details.flatMap((chunk_d) => {
            return chunk_d.transactions.flatMap((transaction) => transaction.signer_id);
        });

        const transaction_hashes = chunk_details.flatMap((chunk_d) => {
            return chunk_d.transactions.flatMap((transaction) => transaction.hash);
        });

        console.log(transaction_hashes)

        // console.log(transactions);

        const transactions_found = (transactions || []).filter((tx_signer) => tx_signer === accountId);

        if(transactions_found.length > 0){
            console.log("Found transaction!");
            console.log(transactions_found);
            found = true;
        }


        return {
            block: blockInfoByHeight,
            prev_hash: previous_hash,
            found: found,
        }
    }

    return response;
}



// where 'block' is the block found, 'previous_hash' is the next block to be found.
export async function get_a_transaction(accountId){
    console.log("Getting block hash");
    const block_hash = await get_block_hash(accountId);
    console.log("Hash found is " + block_hash);

    console.log("Setting keystore");
    const keyStore = new keyStores.BrowserLocalStorageKeyStore();

    const config = {
        keyStore,
        networkId: "testnet",
        nodeUrl: "https://archival-rpc.testnet.near.org",
    };

    const near = await connect(config);

    const blockInfoByHeight = await near.connection.provider.block({
        blockId: block_hash,
    });

    console.log("blockInfobyHeight:");
    console.log(blockInfoByHeight);

    console.log("---Chunk hashes---")

    const chunk_hashes = blockInfoByHeight.chunks.map((chunk) => chunk.chunk_hash);
    console.log(chunk_hashes);

    console.log("---Chunk Details---");
    const chunk_details = await Promise.all(chunk_hashes.map((chunk_detail) => near.connection.provider.chunk(chunk_detail)));
    console.log(chunk_details);

    const previous_hash = blockInfoByHeight.header.prev_hash;

    console.log("prev_hash:" + previous_hash);

    console.log("Transactions: ");
    const transactions = chunk_details.flatMap((chunk_d) => {
        return chunk_d.transactions.flatMap((transaction) => transaction.signer_id);
    });
    console.log(transactions);

    console.log("Found Transactions:");
    const transactions_found = (transactions || []).filter((tx_signer) => tx_signer === accountId);
    console.log(transactions_found);

    return {
        block: blockInfoByHeight,
        prev_hash: previous_hash,
    }
}

// Just copied and pasted an example from near-api-js docs.
//
// Will update it later to just show transactions related to the given account.
// Will also make it only show one transaction at each call.
export function get_transaction_history(){
    // block hash of query start (oldest block)
    const START_BLOCK_HASH = "GZ8vKdcgsavkEndkDWHCjuhyqSR2TGnp9VDZbTzd6ufG";
    // block hash of query end (newest block)
    const END_BLOCK_HASH = "8aEcKhF7N1Jyw84e6vHW6Hzp3Ep7mSXJ6Rvnsy5qGJPF";
    // contract ID or account ID you want to find transactions details for
    const CONTRACT_ID = "relayer.ropsten.testnet";

    const keyStore = new keyStores.BrowserLocalStorageKeyStore();

    // NOTE: we're using the archival rpc to look back in time for a specific set
    // of transactions. For a full list of what nodes are available, visit:
    // https://docs.near.org/docs/develop/node/intro/node-types
    const config = {
        keyStore,
        networkId: "testnet",
        nodeUrl: "https://archival-rpc.testnet.near.org",
    };

    getTransactions(START_BLOCK_HASH, END_BLOCK_HASH, CONTRACT_ID);

    async function getTransactions(startBlock, endBlock, accountId) {
        const near = await connect(config);

        // creates an array of block hashes for given range
        const blockArr = [];
        let blockHash = endBlock;
        do {
            const currentBlock = await getBlockByID(blockHash);
            blockArr.push(currentBlock.header.hash);
            blockHash = currentBlock.header.prev_hash;
            console.log("working...", blockHash);
        } while (blockHash !== startBlock);

        // returns block details based on hashes in array
        const blockDetails = await Promise.all(
            blockArr.map((blockId) =>
                near.connection.provider.block({
                    blockId,
                })
            )
        );

        // returns an array of chunk hashes from block details
        const chunkHashArr = blockDetails.flatMap((block) =>
            block.chunks.map(({ chunk_hash }) => chunk_hash)
        );

        //returns chunk details based from the array of hashes
        const chunkDetails = await Promise.all(
            chunkHashArr.map(chunk => near.connection.provider.chunk(chunk))
        );

        // checks chunk details for transactions
        // if there are transactions in the chunk we
        // find ones associated with passed accountId
        const transactions = chunkDetails.flatMap((chunk) =>
            (chunk.transactions || []).filter((tx) => tx.signer_id === accountId)
        );

        //creates transaction links from matchingTxs
        const txsLinks = transactions.map((txs) => ({
            method: txs.actions[0].FunctionCall.method_name,
            link: `https://explorer.testnet.near.org/transactions/${txs.hash}`,
        }));
        console.log("MATCHING TRANSACTIONS: ", transactions);
        console.log("TRANSACTION LINKS: ", txsLinks);
    }

    async function getBlockByID(blockID) {
        const near = await connect(config);
        const blockInfoByHeight = await near.connection.provider.block({
            blockId: blockID,
        });
        return blockInfoByHeight;
    }
}
