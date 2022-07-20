import conn from '../../lib/db';

export default async (req, res) => {
    try {
        console.log("req nom", req.body);
        // const query = 'INSERT INTO posts(content) VALUES($1)';
        // const query = `
        // select 
        //     date_trunc('minute', to_timestamp(block_timestamp/1000/1000/1000)) as time,
        //     signer_account_id as signer,
        //     receiver_account_id as receiver
        // from 
        //     transactions t
        // where
        //     receiver_account_id = 'guest-book.testnet'
        // `;

        const query = `
            SELECT
                (transaction_hash)
            FROM
                transactions
            WHERE
                signer_account_id = '${req.body.content}'
            ORDER BY
                block_timestamp DESC
            LIMIT 100 OFFSET 0
            ;
        `;

        const data = await conn.query(query);

        // await conn.query(query)
        //     .then(res => {
        //         const data = res.rows;

        //         console.log('All data');

        //         data.forEach(row => {
        //             console.log(`Hash: ${row.transaction_hash}`);
        //         })
        //     });

        const result = data.rows;

        console.log(result);

        return result;

        // console.log("ttt", result);
    } catch ( error ) {
        console.log( error );

        return false;
    }
};

