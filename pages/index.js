import Warning from '../components/warning';

import { useState, useEffect } from 'react';

// This is the full (current) app
//
export default function Home() {
  // Placeholder text that shows when there's no input for account
  // It changes when we switch the selected network
  const [placeholder, setPlaceholder] = useState("account-name.testnet");

  // A message that shows when input for account is invalid
  // Used by the Warning component
  const [warningMessage, setWarningMessage] = useState("");

  // The account name in the text input
  const [accountName, setAccountName] = useState("");
  // The network in the select input
  const [network, setNetwork] = useState("Testnet");

  // Every time the input changes, update the state of AccountName.
  function updateAccountName() {
    var newAccountName = document.getElementById('account').value;

    // Logging just for debugging. Will remove later.
    console.log("Updating Account Name with " + newAccountName);

    setAccountName(newAccountName);
  }

  // Every time network changes, update the state of network.
  function updateNetwork() {
    // Get the text within the html element.
    var select = document.getElementById('net');
    var text = select.options[select.selectedIndex].text;

    // Logging just for debugging. Will remove later.
    console.log("Updating network with " + text);

    setNetwork(text);
  }

  // Check if Account Name is valid.
  // Called when both the text input and network input updates.
  function checkAccountName() {
    // Empty account Name
    if (accountName == "") {
      setWarningMessage("");
    } else {
      // Mainnet is the selected network
      if (network == 'Mainnet') {
        if (accountName.endsWith(".near")) {
          // No warnings
          setWarningMessage("");
        } else {
          setWarningMessage("Account Name must end with '.near'");
        }
      } else {
        // Testnet is the selected network
        if (accountName.endsWith(".testnet")) {
          // No warnings
          setWarningMessage("");
        } else {
          setWarningMessage("Account Name must end with '.testnet'");
        }
      }
    }

    // Logging just for debugging. Will remove later.
    console.log(warningMessage);
  }

  // Every time network input changes.
  // Updates the placeholder and check account name.
  useEffect(() => {
    var text = 'testnet';

    if (network == 'Mainnet') {
      text = 'near';
    }

    setPlaceholder("account-name." + text);

    checkAccountName();
  }, [network])


  // Every time Account Name changes.
  // Check account name.
  useEffect(() => {
    checkAccountName();
  },[accountName]);

  // We could make this easier to understand by splitting into different components.
  // Currently Only Warning is an external component.
  return (
    <div className='flex flex-col items-center justify-center w-full h-screen bg-gray-100'>
      <div className='
        form-group flex flex-row items-center justify-center
        space-x-2 rounded-md
      bg-white drop-shadow-lg
        w-3/4 px-4 sm:w-auto
        h-52 py-8
        '>
        <form className='
          form-control
          flex flex-col sm:flex-row
          items-center justify-center
          space-x-2 space-y-2'
        >
          <label htmlFor="account" className="form-control inline-block text-gray-700">Account Name</label>

          <div className='
            flex flex-col
            item-center justify-center
            space-y-2'
          >
            <input type="text" id="account" name="account_name" className="
              px-3
              py-2
              block
              w-full
              text-base
              font-normal
              text-gray-700
              bg-white bg-clip-padding
              border border-solid border-gray-500
              rounded
              transition
              ease-in-out
              m-0
              focus:text-gray-700 focus:bg-white focus:border-purple-600 focus:outline-double"
              placeholder={placeholder}
              onChange={updateAccountName}
              value={accountName}
            />

            <Warning message={ warningMessage } />
          </div>

          <select name="network" id="net" className="
            form-select appearance-none
            block
            w-fit
            px-3
            py-2
            text-base
            font-normal
            text-gray-700
            bg-white bg-clip-padding bg-no-repeat
            border border-solid border-gray-400
            rounded
            transition
            ease-in-out
            m-0
            focus:text-gray-700 focus:bg-white focus:border-purple-600 focus:outline-double"
            defaultValue={network}
            onChange={updateNetwork}
          >
            <option value="testnet">Testnet</option>
            <option value="mainnet">Mainnet</option>
          </select>

          <button type="button" className='
          px-6
          py-2.5
          bg-purple-600
          text-white
          font-medium
          text-xs
          leading-tight
          uppercase
          rounded
          shadow-lg
          hover:bg-purple-700 hover:shadow-lg
          focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0
          active:bg-purple-800 active:shadow-lg
          transition
          duration-150
          ease-in-out
        '>
          Search
        </button>
        </form>
      </div>

    </div>
  )
}