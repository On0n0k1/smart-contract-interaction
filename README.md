# A simple NEAR Explorer

## About

This is just a small webpage that loads information about a NEAR Account.

Currently it only works for Testnet accounts.

Intended for developers interested in learning how a wallet app works.

## How to run

- Step 1: Install dependencies.

```bash
yarn install
```

- Step 2: Run.

```bash
npm run dev
```

- Step 3: Open a web browser and go for localhost:3000.
- Step 4: Offer a testnet account name and select "Search".
- Step 5: On the following page, you can press F12 to see all the loaded data. There will be **a lot**.

## Directory Structure

- ```'/components'```: React components for account, transaction history, etc.
- ```'/pages'```: Page structure. Index will be '/'. '/[network]/[account].js' will be '/[network]/[account]', where [] represents the value for each variable.

## More details

Check My [blog post](https://hackmd.io/@9YrH7KebTM2T6vr9eFW7Qg/SyPT1ZiRc);
