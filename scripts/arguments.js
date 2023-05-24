const { constants } = require('@openzeppelin/test-helpers');
const config = require('getconfig');
module.exports = [
    config.target.args.name,
    config.target.args.symbol,
    config.target.args.initMint,
    config.target.args.maxSupply,
    config.target.args.baseURI,
    config.target.args.contractURI
];