import axios from 'axios';

// Connect to the public database for near indexer and retrieves a list of transaction hashes associated with an account.
export default async function get_transaction_hashes(accountId){
    // console.log("accountId is ", accountId);
    let result = await axios.get(`/api/transactions/${accountId}`);

    if (result.status === 200){
        const hashes = result.data;
        // console.log(hashes);
        return hashes;
    }

    console.log(result);

    return result;
}
