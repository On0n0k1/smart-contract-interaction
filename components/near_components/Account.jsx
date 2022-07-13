// import get_account from './test/connect';
import get_account from "./services/get_account";

import { useEffect, useState } from 'react';

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

export default function AccountInfo(props){
    const account_name = props.account;
    const network = props.network;

    let [account, setAccount] = useState(null);

    useEffect(() => {
        get_account(account_name, network)
            .then(
                awaited_account => setAccount(awaited_account)
        );
    }, []);

    if (account == null){
        return <p>Loading...</p>
    }

    return (
        <div>
            <p>Name: {account_name}</p>
            <p>Network: {network}</p>
            <p>Amount: {account.amount}</p>
            <p>Block Hash: {account.block_hash}</p>
            <p>Block Height: {account.block_height}</p>
            <p>Code Hash: {account.code_hash}</p>
            <p>Locked: {account.locked}</p>
            <p>Storage Paid At: {account.storage_paid_at}</p>
            <p>Storage Usage: {account.storage_usage}</p>
        </div>
    );
}
