import get_account from './get_account';

// Retrieves an account from the blockchain and returns it's hash.
// I think I will delete this. Don't think it's useful any more.
export default async function get_block_hash(accountId){
    const account = await get_account(accountId);

    // console.log("Getting hash from this:");
    // console.log(account);


    if (account.error === true) {
        // if it's an error. Return it.
        return account;
    }

    const hash = account.block_hash;

    return hash;
}
