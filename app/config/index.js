import { arbitrum, arbitrumGoerli } from 'wagmi/chains';
export const CHAIN = arbitrumGoerli;
export const CHAIN_ID = CHAIN.id;
export const CHAIN_NAME = CHAIN.name;
export const NETWORK_NAME = "mainnet";

export const ERC721_ADDRESS = "0xA49c87366488B7B50184AF595a8Bdd75b07c4d0e"; //"0x4EEFeFD5fF983C85D5DDDc398366b6Db2fa466F1";
export const ALCHEMY_API_KEY = 'TNpyxPwV_MhyG5_FYM4-qdUT2A_cSrYU';//'44wMYVLkygXznIGHzFN8fF8JoPVx1ykc';
export const INFURA_API_KEY = 'bc6d57d2b47547a48d9f8beca108150d';
export const POCKET_API_KEY = '2be8b369a428501faa1c0b0271d5f9f7116e29e04e3f178358312605cd7fb9fa';
export const ETHERSCAN_API_KEY = 'Q7RF8KID4A91F8VBXPH8T1HSHD6FASFURQ';
export const RPC_URL = 'https://arb-goerli.g.alchemy.com/v2/TNpyxPwV_MhyG5_FYM4-qdUT2A_cSrYU'; //`https://arb-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`;
export const PRICE_ETH = 0.005;