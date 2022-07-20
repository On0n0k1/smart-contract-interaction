import { Pool } from "pg";

let conn;

// This connection is always open.
// I should change it to open only when needed.
if(!conn){
    conn = new Pool({
        user: "public_readonly",
        password: "nearprotocol",
        host: "35.184.214.98",
        database: "testnet_explorer",
    });
}

export default conn;
