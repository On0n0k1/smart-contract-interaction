import axios from 'axios';

// Connect to the public database for near indexer and retrieves a list of transaction hashes associated with an account.
export default async function get_transactions(accountId){
    // console.log("accountId is ", accountId);
    let result = await axios.get(`/api/transactions/${accountId}`);

    if (result.status === 200){
        const transactions = result.data;
        // console.log(hashes);
        return transactions;
    }

    console.log(result);

    return result;
}
