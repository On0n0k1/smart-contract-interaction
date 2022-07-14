// import { useEffect, useState } from 'react';

import get_transaction_history from "../near_functions/get_transaction_history";

// This is just a copy paste of an example for transaction history.
// Once I understand it properly I will adapt it to a proper component
export default function History(){
    return (<button onClick={get_transaction_history}>Load Recent Transactions</button>);
}
