# SugarRush-CandyShop-Blockchain 💈🍬🍦🍫

This project is based on an online CandyShop, similar to eBay, using blockchain technology, specifically the Polygon Mumbai testnet. Using tools such as Solidity, Hardhat, ReactJS and Ether.js, complex smart contracts, an interactive user interface and facilitated interaction with the Ethereum blockchain have been created. In addition, IPFS and nft.storage have been employed to securely store candy photos in a decentralized space, ensuring the authenticity and traceability of the products on the platform. This store offers a reliable and unique shopping experience for candy enthusiasts.


## Setting Up
---
## 1. Clone the repository

## 2. Install dependencies

```bash
$ cd SugarRush-CandyShop-Blockchain
$ npm install --save-dev hardhat
```
## 3. Change variables in Files
```bash
# hardhat.config.js
$ ALCHEMY_API_KEY
$ privateKey
# src/config.json 
$ Contract address

```
## 4. Deployment Solidity Contract Addresses
```bash
$ npx hardhat clean
$ npx hardhat compile
```

## 5. Run tests
``` bash
$ npx hardhat test
```


``` bash
$ npx hardhat run scripts/deploy.js --network mumbai
```
<a href="https://imgur.com/49nzTiy"><img src="https://i.imgur.com/49nzTiy.gif" title="source: imgur.com" /></a>

``` bash

#After deploying the Candyshop.sol replace this address in src/config.json file with the variable:

 address:"0x32754C68F509fFbAb3589D4e3F2c6ADbd5483dAE"


```

## 6. Localhost Deployment

``` bash

npm install 

npm start

http://localhost:3000/

```
<a href="https://imgur.com/DxmWxH9"><img src="https://i.imgur.com/DxmWxH9.gif" title="source: imgur.com" /></a>
























