// import get_account from './test/connect';
import get_account from "../../near_functions/get_account";

import History from '../History';

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

function Detail(props){

    // if (props.line === true) {
    //     return (
    //         <div className={props.className}>
    //             <div className='
    //                 flex-col mx-auto
    //                 border border-solid border-gray-300 rounded-md
    //                 px-4 py-2
    //             '>
    //                 <h1 className='
    //                     text-center text-sm text-gray-700 font-bold
    //                 '>{props.title}:</h1>
    //                 <p className='text-center'>{props.children}</p>
    //             </div>
    //         </div>);
    // }

    return (
        <div className={props.className}>
            <div className='
                flex-col mx-auto
                border border-solid border-gray-300 rounded-md
                px-4 py-2

            '>
                <h1 className='
                    text-center text-sm
                    text-gray-700 font-bold
                    bg-gray-200
                    rounded-lg
                '>{props.title}:</h1>
                <p className='text-center text-clip overflow-hidden'>{props.children}</p>
            </div>
        </div>

    )
}

// History will be moved to it's own component
//
// Represents basic account information.
// If account doesn't exist shows an error message.
export default function AccountInfo(props){
    const account_name = props.account;
    const network = props.network;

    let [account, setAccount] = useState("");

    useEffect(() => {
        get_account(account_name, network)
            .then(
                awaited_account => setAccount(awaited_account)
            );
    }, []);

    if (account == ""){
        return <p>Loading...</p>
    }

    if (account.error === true){
        return <p>Error: {account.exception.type}</p>
    }

    return (
        <div className='
            flex flex-col items-center
            justify-center w-full
            h-screen bg-gray-100
        '>
            <div className='
                grid
                grid-cols-1 sm:grid-cols-3
                gap-2 grid-flow-row
                space-x-2 rounded-md
                bg-white drop-shadow-lg
                w-auto px-10
                h-auto py-10
                font-sans'
            >
                {/* <ul className='
                    font-sans
                    text-gray-900
                '> */}
                {/* <div className='col-span-3'>
                    <div className='flex-col'>
                        <h1 className='
                            text-center text-sm text-gray-700 font-bold
                        '>Account:</h1>
                        <p className='
                            text-center text-2xl
                            font-sans font-bold
                            py-4'
                        >{account_name}</p>
                    </div> */}


                {/* </div> */}
                <Detail title='Account' className='ml-2 col-span-full sm:col-span-2'>{account_name}</Detail>

                <Detail title='Balance'>{account.amount * Math.pow(0.1, 24)}<b>Ⓝ</b></Detail>
                {/* <li>Balance: {account.amount * Math.pow(0.1, 24)}<b>Ⓝ</b></li> */}
                <Detail title='Staked Balance'>{account.locked}</Detail>
                {/* <li>Staked: {account.locked}</li> */}
                <Detail title='Storage Size'>{account.storage_usage}</Detail>
                {/* <li>Storage Usage: {account.storage_usage}</li> */}
                <Detail title='Block Height'>{account.block_height}</Detail>
                {/* <li>Block Height: {account.block_height}</li> */}
                <Detail title='Block Hash' className='col-span-full'>{account.block_hash}</Detail>
                {/* <li>Block Hash: {account.block_hash}</li> */}
                <Detail title='Code Hash' className='col-span-full'>{account.code_hash}</Detail>
                {/* <li>Code Hash: {account.code_hash}</li> */}
                {/* </ul> */}
                {/* <History /> */}
            </div>
        </div>
    );
}
