import { sample } from "lodash";
import { ALCHEMY_API_KEY, ALCHEMY_PUB_API_KEY } from "./vars";


export const ETH_MAINNET = 1;
export const ARBITRUM = 42161;
export const ARBITRUM_TESTNET = 421613;

// TODO take it from web3
export const DEFAULT_CHAIN_ID = ARBITRUM_TESTNET;
export const CHAIN_ID = DEFAULT_CHAIN_ID;

export const SUPPORTED_CHAIN_IDS = [ARBITRUM];


export const IS_NETWORK_DISABLED = {
    [ARBITRUM]: false,
};

export const CHAIN_NAMES_MAP = {
    [ARBITRUM_TESTNET]: "ArbGoerli",
    [ARBITRUM]: "Arbitrum",
};

const constants = {
    [ARBITRUM_TESTNET]: {
        nativeTokenSymbol: "ETH",
    },

    [ARBITRUM]: {
        nativeTokenSymbol: "ETH",
        wrappedTokenSymbol: "WETH",
    },
};

const ALCHEMY_WHITELISTED_DOMAINS = ["traitoors.on.fleek.co"];

export const OPENSEA_URL = {
    [ARBITRUM]: "https://opensea.io/",
    [ARBITRUM_TESTNET]: "https://testnets.opensea.io/"
};

export const RPC_PROVIDERS = {
    [ETH_MAINNET]: ["https://rpc.ankr.com/eth"],
    [ARBITRUM]: [getDefaultArbitrumRpcUrl()],
    [ARBITRUM_TESTNET]: ["https://goerli.arbitrum.io/rpc"],
};

export const FALLBACK_PROVIDERS = {
    [ARBITRUM]: [getAlchemyHttpUrl()],
};

export const NETWORK_METADATA = {
    [ARBITRUM_TESTNET]: {
        chainId: "0x" + ARBITRUM_TESTNET.toString(16),
        chainName: "Arbitrum Testnet",
        nativeCurrency: {
            name: "ETH",
            symbol: "ETH",
            decimals: 18,
        },
        rpcUrls: RPC_PROVIDERS[ARBITRUM_TESTNET],
        blockExplorerUrls: ["https://goerli-explorer.arbitrum.io/"],
    },
    [ARBITRUM]: {
        chainId: "0x" + ARBITRUM.toString(16),
        chainName: "Arbitrum",
        nativeCurrency: {
            name: "ETH",
            symbol: "ETH",
            decimals: 18,
        },
        rpcUrls: RPC_PROVIDERS[ARBITRUM],
        blockExplorerUrls: [getExplorerUrl(ARBITRUM)],
    },
};

export const CHAIN_ICONS = {
    [ARBITRUM]: {
        16: "ic_arbitrum_16.svg",
        24: "ic_arbitrum_24.svg",
        96: "ic_arbitrum_96.svg",
    },
    [ARBITRUM_TESTNET]: {
        16: "ic_arbitrum_16.svg",
        24: "ic_arbitrum_24.svg",
        96: "ic_arbitrum_96.svg",
    },
};

export const getConstant = (chainId, key) => {
    if (!constants[chainId]) {
        throw new Error(`Unsupported chainId ${chainId}`);
    }

    if (!(key in constants[chainId])) {
        throw new Error(`Key ${key} does not exist for chainId ${chainId}`);
    }

    return constants[chainId][key];
};

export function getChainName(chainId) {
    return CHAIN_NAMES_MAP[chainId];
}

export function getChainIcon(chainId, size) {
    return CHAIN_ICONS[chainId]?.[size];
}

export function getDefaultArbitrumRpcUrl() {
    return "https://arb1.arbitrum.io/rpc";
}

export function getRpcUrl(chainId) {
    return sample(RPC_PROVIDERS[chainId]);
}

export function getFallbackRpcUrl(chainId) {
    return sample(FALLBACK_PROVIDERS[chainId]);
}

export function getAlchemyHttpUrl() {
    return `https://arb-mainnet.g.alchemy.com/v2/${ALCHEMY_PUB_API_KEY}`;
}

export function getAlchemyWsUrl() {
    return `wss://arb-mainnet.g.alchemy.com/v2/${ALCHEMY_PUB_API_KEY}`;
}

export function getExplorerUrl(chainId) {
    if (chainId === ARBITRUM_TESTNET) {
        return "https://goerli.arbiscan.io/";
    } else if (chainId === ARBITRUM) {
        return "https://arbiscan.io/";
    }
    return "https://etherscan.io/";
}

export function getOpenseaUrl(chainId) {
    return OPENSEA_URL[chainId];
}
