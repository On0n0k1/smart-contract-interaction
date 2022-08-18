const { connect, keyStores } = require("near-api-js");

// Connects to the near blockchain and retrieves a transaction associated with a given account and hash.
export default async function get_transaction_from_hash(tx_hash, accountId){
    // Local storage for keys.
    const keyStore = new keyStores.BrowserLocalStorageKeyStore();

    // Configuration for testnet.
    const config = {
        keyStore,
        networkId: "testnet",
        nodeUrl: "https://archival-rpc.testnet.near.org",
        // nodeUrl: "https://rpc.testnet.near.org",
    };

    const near = await connect(config);

    // Retrieves transaction status for a given transaction hash.
    // const transaction = await near.connection.provider.txStatus(tx_hash, accountId);
    const transaction = await near.connection.provider.txStatus(
        tx_hash,
        accountId,
    );

    return transaction;
}

