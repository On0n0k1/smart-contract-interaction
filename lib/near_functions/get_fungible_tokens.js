import axios from 'axios';

// Currently unused function
//
// Implemented for /components/near_components/Assets
//
// Connect to the public database for near indexer and retrieves a list of transaction hashes associated with an account.
export default async function get_fungible_tokens(accountId){
    // console.log("accountId is ", accountId);
    let result = await axios.get(`/api/fungible_tokens/${accountId}`);

    if (result.status === 200){
        const hashes = result.data;
        // console.log(hashes);
        return hashes;
    }

    // console.log(result);

    return result;
}
