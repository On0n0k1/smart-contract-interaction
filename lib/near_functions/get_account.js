const { connect, keyStores } = require("near-api-js");

// example of attributes for account:
// {
//  amount: "169729350681362732317609208"
//  block_hash: "DaLBHuPmPy4odpKyrcoBjMwsRdtgX1q7vNS5yPWcSkBZ"
//  block_height: 94828593
//  code_hash: "11111111111111111111111111111111"
//  locked: "0"
//  storage_paid_at: 0
//  storage_usage: 182
// }

// Connects to near and returns basic information about given account.
//
// If an error happens when connecting. Returns an object like this:
//
// {
//     error: bool,
//     exception: String,
// }
//
// Where error is always true, and exception is the error type.
//
export default function get_account(account_name, network){
    // contract ID or account ID you want to find transactions details for
    // const CONTRACT_ID = "relayer.ropsten.testnet";
    const CONTRACT_ID = account_name;

    const keyStore = new keyStores.BrowserLocalStorageKeyStore();

    const config = {
        keyStore,
        networkId: network,
        // nodeUrl: "https://archival-rpc.testnet.near.org",
        nodeUrl: "https://rpc.testnet.near.org",
        walletUrl: "https://wallet.testnet.near.org",
        helperUrl: "https://helper.testnet.near.org",
        explorerUrl: "https://explorer.testnet.near.org",
    };

    return getAccount(CONTRACT_ID);

    async function getAccount(accountId) {
        const near = await connect(config);

        let response = false;

        try{
            response = await near.connection.provider.query({
                request_type: "view_account",
                finality: "final",
                account_id: accountId,
            });
            console.log(response);

        } catch (error) {
            console.log(JSON.stringify(error));

            response = {
                error: true,
                exception: error,
            }
        }

        // console.log(response);

        // return JSON.stringify(response);
        return response;
    }
}
