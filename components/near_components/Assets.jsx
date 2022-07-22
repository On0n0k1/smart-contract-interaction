import { useEffect, useState } from 'react';

// import get_transaction_hashes from '../../lib/near_functions/get_transaction_hashes.js';
// import get_transaction_from_hash from '../../lib/near_functions/get_transaction_from_hash';
import get_fungible_tokens from '../../lib/near_functions/get_fungible_tokens.js';
import get_non_fungible_tokens from '../../lib/near_functions/get_non_fungible_tokens.js';


// This is just a copy paste of an example for transaction history.
// Once I understand it properly I will adapt it to a proper component
//
// This component is currently unused until we implement balance properly.
export default function Assets(props){
    // return (<button onClick={get_transaction_history}>Load Recent Transactions</button>);

    async function ft(){
        const result = await get_fungible_tokens(props.accountId);
        console.log(result);
    }

    async function nft(){
        const result = await get_non_fungible_tokens(props.accountId);
        console.log(result);
    }

    return (
        <div>
            <button onClick={ft}>fungible tokens</button>
            <button onClick={nft}>non fungible tokens</button>
        </div>
    );
}
