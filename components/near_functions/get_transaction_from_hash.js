const { connect, keyStores } = require("near-api-js");

export default async function get_transaction_from_hash(tx_hash, accountId){
    // var block_hash = await get_block_hash(accountId);
    const keyStore = new keyStores.BrowserLocalStorageKeyStore();

    const config = {
        keyStore,
        networkId: "testnet",
        nodeUrl: "https://archival-rpc.testnet.near.org",
    };

    const near = await connect(config);

    // var response = get_a_few_transactions(near);

    // const transaction = await near.connection.provider.txStatus({
    //     txHash: tx_hash
    // });

    const transaction = await near.connection.provider.txStatus(tx_hash, accountId);

    return transaction;
}

