# ARBItraitors Web Interface

## Run Locally

```bash
git clone 
cd arb_traitoors
npm install
npm run dev
```

# Contract

## Test

```bash

npx hardhat test
```

## Deploy

```bash
npx hardhat clean
npx hardhat compile
npx hardhat run --network localhost  scripts/deploy.js
```

Then take the contract address output by the deployment to verify the contract.

```bash
npx hardhat verify --network arbitrumGoerli --constructor-args scripts/arguments.js <contract address>
```

*Networks for etherscan*

```bash
npx hardhat verify --list-networks
```

```
arbitrumOne          │ 42161  
arbitrumGoerli       │ 421613   
```