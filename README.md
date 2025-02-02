# EPAYCO PAYMENT SERVICE

Service to manage database transactions to:

- Create users and wallets
- Deposit into the wallet
- Payments and payment confirmations

## Installation

Make sure to have node and npm installed

1. Clone the repo
2. Run the command `npm install`
3. Setup a MySQL server
4. Insert the corresponding environment credentials in a file called `.env` according to the example
5. Run the migrations with the command `npm run migrate`. If the environment was correctly setup, there should be a database created at your MySQL server
6. Run `npm run start` to initizalize the service
