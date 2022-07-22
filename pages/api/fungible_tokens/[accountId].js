import conn from '../../../lib/db';

// Should retrieve fungible token list for a given account.
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
        console.log(`GET fungible_tokens request for account ${req.query.accountId}} Received.`);

        // const query = `
        //     SELECT
        //         *
        //     FROM
        //         assets__fungible_token_events
        //     WHERE
        //         token_new_owner_account_id = '${req.query.accountId}'
        //     ORDER BY
        //         emitted_at_block_timestamp DESC
        //     LIMIT 10 OFFSET 0
        //     ;
        // `;

        // const query = `
        //     SELECT
        //         *
        //     FROM
        //         (SELECT
        //             *
        //         FROM
        //             transaction_actions
        //         where
        //             transaction_hash IN
        //             (
        //                 SELECT
        //                     transaction_hash
        //                 FROM
        //                     transactions
        //                 WHERE
        //                     signer_account_id = '${req.query.accountId}'
        //                 ORDER BY
        //                     block_timestamp DESC
        //                 LIMIT 100 OFFSET 0
        //             )
        //         ) AS tx
        //     WHERE
        //         tx.action_kind = 'FUNCTION_CALL';
        // `;

        const query = `
            SELECT
                *
            FROM
                transaction_actions
            where
                (
                    transaction_hash IN
                    (
                        SELECT
                            transaction_hash
                        FROM
                            transactions
                        WHERE
                            signer_account_id = '${req.query.accountId}'
                        ORDER BY
                            block_timestamp DESC
                        LIMIT 100 OFFSET 0
                    )
                    AND action_kind = 'FUNCTION_CALL'
                )
        `;



        const data = await conn.query(query);

        const result = data.rows;

        // console.log(result);

        // return result;
        res.status(200).json({ ft: result });
    } catch ( error ) {
        // console.log( error );
        console.log("An Error has occurred.");
        console.log(error);

        res.status(500).send("Error fetching data");
    }
};
