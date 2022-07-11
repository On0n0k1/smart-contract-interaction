import { useRouter } from 'next/router';

// The path to this page is /[network]/[account]
// Values for network and account will be picked by router.query
export default function Account() {

    const router = useRouter();
    const network = router.query.network;
    const account = router.query.account;

    return (
        <div>
            <p>Network is {network}</p>
            <p>Account is {account}</p>
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
