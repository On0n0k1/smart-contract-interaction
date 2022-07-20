import conn from '../../../lib/db';

export default async (req, res) => {

    if (req.method !== 'GET'){
        res.status(404).send("Invalid request type");
        console.log("Invalid request received. Method: ", req.method);
        return;
    }

    try {
        // console.log("req nom", req);
        console.log(`GET Request for account ${req.query.accountId}} Received.`);

        const query = `
            SELECT
                transaction_hash
            FROM
                transactions
            WHERE
                signer_account_id = '${req.query.accountId}'
            ORDER BY
                block_timestamp DESC
            LIMIT 100 OFFSET 0
            ;
        `;

        const data = await conn.query(query);

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

