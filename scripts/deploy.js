// scripts/deploy.js
const config = require('getconfig');
const { ethers } = require('hardhat');

async function main() {
    const Token = await ethers.getContractFactory(config.target.name);
    console.log('Deploying ' + config.target.name + '...');
    const token = await Token.deploy(
        config.target.args.name,
        config.target.args.symbol,
        config.target.args.initMint,
        config.target.args.maxSupply,
        config.target.args.baseURI,
        config.target.args.contractURI);
    await token.deployed();
    console.log(config.target.name + ' deployed to:', token.address);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });