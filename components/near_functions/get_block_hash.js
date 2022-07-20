import get_account from './get_account';

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
