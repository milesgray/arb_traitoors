/** @type import('hardhat/config').HardhatUserConfig */
/**
require('@nomiclabs/hardhat-ethers');
module.exports = {
  solidity: "0.8.18",
};
*/
/** 
require("@nomiclabs/hardhat-etherscan");
module.exports = {
  networks: {
    mainnet: { 
      solidity: "0.8.18",
    }
  },
  etherscan: {
    apiKey: "SM9MFSZ4RCWTMZRE4GU92UK8Y1XM28GIVG"
  }
}; */
require("@nomiclabs/hardhat-truffle5");
require("hardhat-gas-reporter");
require("@nomiclabs/hardhat-etherscan");
require('@nomiclabs/hardhat-ethers');
require("hardhat-abi-exporter");
require("hardhat-contract-sizer");
require("solidity-coverage");

const config = require('getconfig')

const settings = {
  arb_test: {
    wallets: {
      dev: `0xA4d1708bD07a1ca09705fFF6f28c859d883A9e43`,
    }
  },
  arb_main: {
    wallets: {
      dev: `0xF3f9407487C8D5A4905c13c3f20b994a2658Be39`,
    }
  }
}

const ALCHEMY_ARB_TEST_API_KEY = config.alchemy_key.arb_test;
const ALCHEMY_ARB_MAIN_API_KEY = config.alchemy_key.arb_main;
const ETHERSCAN_API_KEY = {
  arb_test: config.scan.arb_test,
};
const ARB_MAINNET_KEY = config.network_key.arb_main;
const ARB_TESTNET_KEY = config.network_key.arb_test;

const ethLocalFork = {
  forking: {
    url: "https://eth-mainnet.g.alchemy.com/v2/_Xk1Ey7meHofoRl6XJqXcZKvxODpjS51"
  }
};

const arbMainNet = {
  chainId: 42161,
  url: `https://arb-mainnet.g.alchemy.com/v2/${ALCHEMY_ARB_MAIN_API_KEY}`,
  accounts: [`0x${ARB_MAINNET_KEY}`],
}
const arbTestNet = {
  chainId: 421613,
  url: `https://arb-goerli.g.alchemy.com/v2/${ALCHEMY_ARB_TEST_API_KEY}`,
  accounts: [`0x${ARB_TESTNET_KEY}`],
}

const SELECTED_NETWORK = config.hardhat.network;

module.exports = {
  solidity: {
    version: "0.8.18",
    settings: {
      optimizer: {
        enabled: true,
        runs: 30,
      },
    },
  },
  gasReporter: {
    enabled: true,
    currency: "USD"
  },
  defaultNetwork: "hardhat",
  networks: {
    hardhat: ethLocalFork,
    arbitrum: arbMainNet,
    arbitrumGoerli: arbTestNet,
  },
  etherscan: {
    apiKey: {
      arbitrumGoerli: ETHERSCAN_API_KEY.arb_test,
    }
  },
  variables: settings[SELECTED_NETWORK],
};

