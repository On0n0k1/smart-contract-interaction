import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
// import Test from '../../components/near-components/test.jsx';
import AccountInfo from '../../components/near_components/Account/Account.jsx';
import History from '../../components/near_components/History.jsx';


// The path to this page is /[network]/[account]
// Values for network and account will be picked by router.query
export default function Account() {
    const router = useRouter();

    const [network, setNetwork] = useState("");
    const [account, setAccount] = useState("");

    useEffect(() => {
        // At the first render, router queries are undefined.
        // So toLowerCase would return an error message once, and then stop.
        // That's why the useEffect.
        setNetwork(router.query.network.toLowerCase());
        setAccount(router.query.account);
    }, [router.isReady]);

    if (network === "") {
        return <div><p>Loading...</p></div>
    }

    return (
        <div>
            {/* <p>Network is {network}</p>
            <p>Account is {account}</p> */}
            <AccountInfo network={network} account={account}/>
            <History contractId={account}/>
        </div>
    )
}

// Not needed, unless there's need to fetch something from an api.
// export async function getServerSideProps({ params }) {
//     const req = await fetch(`http://localhost:3000/${params.id}.json`);
//     // const data = await req.json();

//     return {
//         props: { },
//     }
// }
