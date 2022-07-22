import conn from '../../../lib/db';

// Should retrieve non fungible token list for a given account.
//
// Still unfinished.
//
export default async (req, res) => {

    if (req.method !== 'GET'){
        res.status(404).send("Invalid request type");
        console.log("Invalid request received. Method: ", req.method);
        return;
    }

    try {
        // console.log("req nom", req);
        console.log(`GET non_fungible_tokens request for account ${req.query.accountId}} Received.`);

        const query = `
            SELECT
                *
            FROM
                assets__non_fungible_token_events
            WHERE
                token_new_owner_account_id = '${req.query.accountId}'
            ORDER BY
                emitted_at_block_timestamp DESC
            LIMIT 10 OFFSET 0
            ;
        `;

        const data = await conn.query(query);

        const result = data.rows;

        console.log(result);

        // return result;
        res.status(200).json({ nft: result });
    } catch ( error ) {
        // console.log( error );
        console.log("An Error has occurred.");
        console.log(error);

        res.status(500).send("Error fetching data");
    }
};
