import conn from '../../../lib/db';

// Returns Information about a Near account.
export default async (req, res) => {
    // Only accepts GET requests.
    if (req.method !== 'GET'){
        res.status(404).send("Invalid request type");
        console.log("Invalid request received. Method: ", req.method);
        return;
    }

    try {
        // console.log("req nom", req);
        console.log(`GET transaction request for account ${req.query.accountId}} Received.`);

        // const query = `
        //     SELECT
        //         *
        //     FROM
        //         transaction_actions
        //     where
        //         transaction_hash IN
        //         (
        //             SELECT
        //                 transaction_hash
        //             FROM
        //                 transactions
        //             WHERE
        //                 signer_account_id = '${req.query.accountId}'
        //             ORDER BY
        //                 block_timestamp DESC
        //             LIMIT 100 OFFSET 0
        //         );
        // `;
        const query = `
            SELECT
                transaction_hash
            FROM
                transactions
            WHERE
                signer_account_id = '${req.query.accountId}'
            ORDER BY
                block_timestamp DESC
            LIMIT 10 OFFSET 0
        `;

        // Make the query and return the result.
        const data = await conn.query(query);

        // The acquired values.
        const result = data.rows;

        // console.log(result);

        // return result;
        res.status(200).json({ transactions: result });
    } catch ( error ) {
        // console.log( error );
        console.log("An Error has occurred.");
        console.log(error);

        res.status(500).send("Error fetching data");
    }
};

