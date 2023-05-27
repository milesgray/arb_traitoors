import { ARBITRUM, ARBITRUM_TESTNET  } from "./chains";

const CONTRACTS = {
  [ARBITRUM_TESTNET]: {
    // arbitrum testnet
    NFT: "0x7754956d37AD20c321B196523179b0Bb43EadA22",
  },
  [ARBITRUM]: {
    // arbitrum mainnet
    NFT: "0x4EEFeFD5fF983C85D5DDDc398366b6Db2fa466F1",    
  },
};

export function getContractAddress(chainId, name) {
  if (!CONTRACTS[chainId]) {
    throw new Error(`Unknown chainId ${chainId}`);
  }

  if (!CONTRACTS[chainId][name]) {
    throw new Error(`Unknown contract "${name}" for chainId ${chainId}`);
  }

  return CONTRACTS[chainId][name];
}
