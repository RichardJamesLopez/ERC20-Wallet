ERC20 Wallet 
===

## Table of Contents

[TOC]


## Purpose

This project was designed for a set of simple contracts (with tests) that uses `delegateCall` to defer logic to another contract. In particular, the call should move underlying funds owned by the contract thus delegating out control. 


## Set-up

There are a few steps needed to run this project:

1. We can run this program using your terminal. Open a new window and run `git clone ...`
1. It will require NodeJS, Mocha and Hardhat modules listed in the `package.json` file. Create a new folder in your directory, and run `npm install`
1.  Once your npm modules are installed you can begin running [Hardhat](https://hardhat.org/). It is a tool (often used as an alternative to Truffle) that will allow us to establish a blockchain on our local machine, allow us to compile contracts, and run tests. To compile, run `npx hardhat compile`. To test, run `npx hardhat test` (this will automatically compile the latest changes as well before it runs).
    1.  **Fun note:** if you can't get into this hardhat configuration, you can migrate this repo to Truffle. The OpenZepplin docs even let you toggle between the two:
    ![](https://i.imgur.com/2CpnC3r.png)
3.  Once running compilation and test, your local machine should return unit tests output designed for the project. 
5.  Enjoy!

Objective
---
This project was based on the following directions:

```
Design and write a set of simple contracts (with tests) that uses `delegatecall` to defer logic to another contract.
The call should move underlying funds owned by the contract delegating out control.

One should view the ContractProxy as a wallet that holds several ERC20 tokens that need to be moved.

ContractProxy.sol

- should delegatecall to ContractLogic
- owns and control many ERC20 tokens

ContractLogic.sol
- should contain the logic to move a token to another address by implementing
- transfer(token, recipient, amount)

Usage of libraries and frameworks is encouraged.
```
Interaction Sequence
---
![image](https://user-images.githubusercontent.com/8483531/114319311-ef1cee80-9ade-11eb-9cb7-f4ed40077192.png)

> Read more about sequence-diagrams here: http://bramp.github.io/js-sequence-diagrams/
> See logic below:
```sequence

Note right of Token: Mint new Token
Token-->ContractProxy: supply of new token
Note over ContractProxy: Wallet now holds ERC20 tokens
Note over ContractProxy: Start new transaction
ContractProxy->ContractLogic: make delegateCall 
Note right of ContractLogic: Send token to receipient
ContractLogic->ContractProxy: transaction executed
Note over ContractProxy: Ready for new tokens, balance & transactions
```


###### tags: `Smart Contract` `Documentation`
