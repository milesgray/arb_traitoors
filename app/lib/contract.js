import { BigNumber, ethers } from 'ethers';
import axios from 'axios';
import useEtherSWR, { EtherSWRConfig  } from 'ether-swr';
import { roundEth, toInt, toEth, truncateAddress } from "./formatting";
import { ERC721_ABI } from '../config/abi';
import {
    CHAIN_ID,
    ERC721_ADDRESS,
    ALCHEMY_API_KEY,
} from '../config/vars'

const fetcher = (library, abi) => (...args) => {
    const [arg1, arg2, ...params] = args
    // it's a contract
    if (isAddress(arg1)) {
        const address = arg1
        const method = arg2
        const contract = new Contract(address, abi, library.getSigner())
        return contract[method](...params)
    }
    // it's a eth call
    const method = arg1
    return library[method](arg2, ...params)
}

function getLibrary(provider) {
    const library = provider ? provider : useProvider();
    library.pollingInterval = 12000
    return library
}


export function useProvider() {
    const provider = new ethers.providers.AlchemyProvider(CHAIN_ID, ALCHEMY_API_KEY);
    return provider;
}

export function useEnabled(provider) {
    try {
        provider = provider ? provider : useProvider();
        const isCorrectNetwork = provider.network.chainId === CHAIN_ID;
        const isSignerReady = provider.getSigner()._isSigner;

        const isEnabled = isCorrectNetwork && isSignerReady;
        console.debug('[useEnabled] isSignerReady: ', isSignerReady,
            'isCorrectNetwork', isCorrectNetwork,
            'isEnabled', isEnabled);
        return {
            isEnabled,
            isCorrectNetwork,
            isSignerReady,
            isError: false
        }
    } catch (e) {
        return {
            isEnabled: false,
            isCorrectNetwork: false,
            isSignerReady: false,
            isError: true
        }
    }
}

export function useAddress(provider) {
    provider = provider ? provider : useProvider();
    if (useEnabled(provider)) {
        return provider.getSigner().address;
    } else {
        return null;
    }
}

export function useContract(provider) {
    return new ethers.Contract(
        ethers.utils.getAddress(ERC721_ADDRESS),
        ERC721_ABI,
        provider ? provider : useProvider()
    );

}

export async function doMint(signer, contract) {
    contract = contract ? contract : useContract();
    const price = await contract.price();
    const tx = {
        gasLimit: '0x55555',
        to: ethers.utils.getAddress(contract.address),
        value: price,
        data: contract.interface.encodeFunctionData('mint()', [])
    }

    const response = await signer.sendTransaction(tx);

    return response;
}

export async function doBatchMint(quantity, signer, contract) {
    contract = contract ? contract : useContract();
    const price = await contract.price();
    const tx = {
        gasLimit: '0x55555',
        to: ethers.utils.getAddress(contract.address),
        value: price.mul(BigNumber.from(quantity)),
        data: contract.interface.encodeFunctionData('mint(uint)', [quantity])
    }

    const response = await signer.sendTransaction(tx);

    return response;
}

export async function useMaxSupply(contract) {
    try {
        contract = contract ? contract : useContract();
        const data = await contract.useMaxSupply();
        console.debug(`[lib] [contract] [useMaxSupply] data: `, data);
        return {
            data: toInt(data),        
        };
    } catch(e) {
        return {
            data: 0
        }
    }
}
export async function useMaxPerTx(contract) {
    try {
        contract = contract ? contract : useContract();
        const data = await contract.getMaxPerTx();
        console.debug(`[lib] [contract] [useMaxPerTx] data: `, data);
        return {
            data: toInt(data),        
        };
    } catch (e) {
        return {
            data: 0
        }
    }
}
export async function usePrice(contract) {
    try {
        contract = contract ? contract : useContract();
        const data = await contract.getPrice();
        console.debug(`[lib] [contract] [usePrice] data: `, data);
        return {
            data: toInt(data),    
        };
    } catch (e) {
        return {
            data: 0
        }
    }
}

export async function getMintStats(account, contract) {
    try {
        console.debug(`[lib] [contract] [getMintStats] account: `, account);
        contract = contract ? contract : useContract();
        const stats = await contract.getMintStats(account);
        const result = {
            minterNumMinted: ethers.utils.formatUnits(stats.minterNumMinted, 0),
            maxSupply: ethers.utils.formatUnits(stats.maxSupply, 0),
            totalSupply: ethers.utils.formatUnits(stats.currentTotalSupply, 0)
        };
        console.debug(`[lib] [contract] [getMintStats] stats: `, result);
        return result;
    } catch (e) {
        return {
            minterNumMinted: 0,
            maxSupply: 0,
            totalSupply: 0
        }
    }
}

export async function getTokensOfOwner(account) {
    try {
        const { data: tokens, mutate } = useEtherSWR(
            ['tokensOfOwner', account, 'latest'],
            {
                subscribe: [
                    // A filter from anyone to me
                    {
                        name: 'Transfer',
                        topics: [null, account],
                        on: (
                            state,
                            fromAddress,
                            toAddress,
                            amount,
                            event
                        ) => {
                            console.debug('receive', { event })
                            const update = state.add(amount)
                            mutate(update, false) // optimistic update skip re-fetch
                        }
                    },
                    // A filter from me to anyone
                    {
                        name: 'Transfer',
                        topics: [account, null],
                        on: (
                            state,
                            fromAddress,
                            toAddress,
                            amount,
                            event
                        ) => {
                            console.debug('send', { event })
                            const update = state.sub(amount)
                            mutate(update, false) // optimistic update skip re-fetch
                        }
                    }
                ]
            }
        )
        console.debug(`[lib] [contract] [getTokensOfOwner] account: `, account);
        
        const result = {
            minterNumMinted: tokens?.length ? tokens.length : 0,
            tokenIds: tokens,
        };
        console.debug(`[lib] [contract] [getTokensOfOwner] result: `, result);
        return result;
    } catch (e) {
        console.error("[lib] [contract] [getTokensOfOwner] error:", e);
        return e;
    }
}

export async function useStaticData(contract) {
    try {
        const { price } = usePrice(contract);
        const { maxPerTx } = useMaxPerTx(contract);
        const { maxSupply } = useMaxSupply(contract);
        const data = {
            price: price,
            max: maxSupply,
            maxPerTx: maxPerTx,
        }
        console.debug(`[lib] [contract] [useStaticData] data: `, data);
        return data;
    } catch(e) {
        console.error("[useStaticData]\t",e);
    }
    
}

export async function getNextTokenId(contract) {    
    contract = contract ? contract : useContract();
    const { data, mutate } = useEtherSWR(
        [contract.address, 'nextTokenId', 'latest'],
        {
            subscribe: [
                {
                    name: 'block',
                    on: (event) => {
                        console.debug(`[lib] [contract] [nextTokenId] data: `, data, 'event: ', { event });
                        // on every block we check if Ether balance has changed by re-fetching
                        mutate(undefined, true)
                    }
                }
            ]
        }
    )
    console.debug(`[lib] [contract] [getNextTokenId] data: `, data);
    return data.toNumber();
}

export async function getTotalSupply(contract) {
    contract = contract ? contract : useContract();
    const { data, mutate } = useEtherSWR(
        [contract.address, 'totalSupply', 'latest'],
        {
            subscribe: [
                {
                    name: 'block',
                    on: (event) => {
                        console.debug(`[lib] [contract] [getTotalSupply] data: `, data, 'event: ', {event});                        
                        // on every block we check if Ether balance has changed by re-fetching
                        mutate(undefined, true)
                    }
                }
            ]
        }
    )
    //const data = ethers.utils.formatUnits(await contract.totalSupply(), 0);
    
    return toInt(data);
}
export async function getBalanceOf(account, contract) {
    const { data, mutate } = useEtherSWR([contract.address, 'balanceOf', account], {
        subscribe: [
            // A filter from anyone to me
            {
                name: 'Transfer',
                topics: [null, account]
            },
            // A filter from me to anyone
            {
                name: 'Transfer',
                topics: [account, null]
            }
        ]
    })
    //contract = contract ? contract : getContract();
    //const data = ethers.utils.formatUnits(await contract.balanceOf(address), 0);
    console.debug(`[lib] [contract] [getBalanceOf] data: `, data);
    return data;
}

export async function getRemaining(contract) {
    contract = contract ? contract : useContract();
    const max = ethers.utils.formatUnits(await contract.maxSupply(), 0);
    const total = ethers.utils.formatUnits(await contract.totalSupply(), 0);
    const remaining = parseInt(max) - parseInt(total);
    console.debug(`[lib] [contract] [getRemaining] remaining: `, remaining);
    return remaining;
    
}

export async function getOwnedMetadata(address, contract) {
    contract = contract ? contract : useContract();
    const baseUri = await contract.baseURI();
    const tokens = await contract.tokensOfOwner(address);
    const items = await Promise.all(tokens.map(async i => {
        if (i.toNumber() === 0) {
            return {
                tokenId: 0,
                owned: true,
                image: "http://",
                name: 0,
                description: "",
                buyLink: "http://"
            }
        }
        const meta = await axios.get(baseUri.replace("ipfs://", "https://") + ".ipfs.nftstorage.link/" + i + ".json");
        const img_url = "https://" + meta.data.image.replace("ipfs://", "").replace("/", ".ipfs.nftstorage.link/");
        console.debug(i, meta);        
        let item = {
            tokenId: i.toNumber(),
            owned: true,
            image: img_url,
            name: meta.data.name,
            description: meta.data.description,
            buyLink: "https://opensea.io/assets/arbitrum/" + ERC721_ADDRESS + "/" + i.toNumber(),
        }
        return item
    }));
    return items;
}