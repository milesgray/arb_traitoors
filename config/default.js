const config = {
    // contract args
    target: {
        name: '$$CONTRACT_NAME',
        type: '$$CONTRACT_TYPE',
        args: {
            name: '$$CONTRACT_ARGS_NAME',
            symbol: '$$CONTRACT_ARGS_SYMBOL',
            initMint: '$$CONTRACT_ARGS_INIT_MINT',
            maxSupply: '$$CONTRACT_ARGS_MAX_SUPPLY',
            baseURI: '$$CONRTACT_ARGS_BASE_URI',
            contractURI: '$$CONRTACT_ARGS_CONTRACT_URI',            
        }
    },
    // The pinningService config tells minty what remote pinning service to use for pinning the IPFS data for a token.
    // The values are read in from environment variables, to discourage checking credentials into source control.
    // You can make things easy by creating a .env file with your environment variable definitions. See the example files
    // pinata.env.example and nft.storage.env.example in this directory for templates you can use to get up and running.
    pinningService: {
        name: '$$PINNING_SERVICE_NAME',
        endpoint: '$$PINNING_SERVICE_ENDPOINT',
        key: '$$PINNING_SERVICE_KEY'
    },

    hardhat: {
        network: '$$HARDHAT_NETWORK'
    },

    // If you're running IPFS on a non-default port, update this URL. If you're using the IPFS defaults, you should be all set.
    ipfsApiUrl: 'http://localhost:5001',

    // If you're running the local IPFS gateway on a non-default port, or if you want to use a public gatway when displaying IPFS gateway urls, edit this.
    ipfsGatewayUrl: 'http://localhost:8080/ipfs',

    
    // keys
    alchemy_key: {
        arb_test: '$$ALCHEMY_ARB_TEST_API_KEY',
        arb_main: '$$ALCHEMY_ARB_MAIN_API_KEY',
    },
    network_key: {
        arb_test: `$$ARB_TEST_PRIVATE_KEY`,
        arb_main: `$$ARB_MAIN_PRIVATE_KEY`,
    },    
    scan: {                        
        arb_main: '$$ARBSCAN_API_KEY',
        arb_test: '$$ARBSCAN_API_KEY',
    }
}

module.exports = config
