import { ethers } from "ethers";
import { ARBITRUM, ARBITRUM_TESTNET  } from "./chains";

const { AddressZero } = ethers.constants;


const CONTRACTS = {
  [ARBITRUM_TESTNET]: {
    // arbitrum testnet
    NFT: "0xA49c87366488B7B50184AF595a8Bdd75b07c4d0e",
  },
  [ARBITRUM]: {
    // arbitrum mainnet
    NFT: "0x4EEFeFD5fF983C85D5DDDc398366b6Db2fa466F1",    
  },
};

export function getContract(chainId, name) {
  if (!CONTRACTS[chainId]) {
    throw new Error(`Unknown chainId ${chainId}`);
  }

  if (!CONTRACTS[chainId][name]) {
    throw new Error(`Unknown contract "${name}" for chainId ${chainId}`);
  }

  return CONTRACTS[chainId][name];
}
