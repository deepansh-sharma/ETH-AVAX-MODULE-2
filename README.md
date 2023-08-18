# React Crypto ATM

This is a simple React component for a Crypto ATM application. It allows users to connect their MetaMask wallet, view their account balance, deposit and withdraw ETH, check the owner's name and a simple calculator with limited operations.

## Requirements

1. MetaMask wallet: Ensure that you have the MetaMask wallet extension installed in your browser.

## Features

The Crypto ATM component provides the following features:

- Connect to MetaMask wallet
- Display user's account address
- View user's account balance
- Deposit ETH into the ATM
- Withdraw ETH from the ATM

Please note that the component assumes you have set up and configured MetaMask in your browser.

## Customization

You can customize the UI elements, styles, and behavior of the Crypto ATM component according to your project's requirements. Modify the JSX structure, CSS styles, and event handlers to align with your application's design and functionality.

## Setup

After cloning the github, you will want to do the following to get the code running on your computer.
-> git clone "https://github.com/deepansh-sharma/ETH-AVAX-MODULE-2.git"

1. Inside the project directory, in the terminal type: npm i
2. Open two additional terminals in your VS code
3. In the second terminal type: npx hardhat node
4. In the third terminal, type: npx hardhat run --network localhost scripts/deploy.js
5. Back in the first terminal, type npm run dev to launch the front-end.

After this, the project will be running on your localhost. 
Typically at http://localhost:3000/

## Functions

getBalance(): A view function that returns the current balance of the contract.

depositamount(uint256 _amount) payable: A function that allows users to deposit a specified amount (_amount) to the contract. The payable modifier allows the function to receive Ether. It updates the balance variable, emits a Deposit event, and performs assertions to ensure the transaction is completed successfully.

withdrawamount(uint256 _withdrawAmount): A function that allows users to withdraw a specified amount (_withdrawAmount) from the contract. It checks if the contract has sufficient balance and reverts if the balance is insufficient. It updates the balance variable, emits a Withdraw event, and performs assertions to ensure the transaction is completed successfully.

error InsufficientBalance(uint256 balance, uint256 withdrawAmount): A custom error that is used when a withdrawal amount exceeds the contract balance.

checkbalance(): To check the balance of the user.

getbalancefromwalletaddress(address walletAddress): It will check the balance of another account with the given wallet address. Anyone will be abale to check the balance of any account with the wallet address.

#Author:
Deepansh Sharma

 
