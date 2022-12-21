import { BigNumber, ethers } from 'ethers';
import axios from 'axios';
import useEtherSWR, { EtherSWRConfig  } from 'ether-swr';
import { roundEth, toInt, toEth, truncateAddress } from "./formatting";
import { ERC721_ABI } from '../config/abi';
import {
    CHAIN_ID,
    ERC721_ADDRESS,
    ALCHEMY_API_KEY,
} from '../config'

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
    const library = provider ? provider : getProvider();
    library.pollingInterval = 12000
    return library
}


export function getProvider() {
    const provider = new ethers.providers.AlchemyProvider(CHAIN_ID, ALCHEMY_API_KEY);
    return provider;
}

export function getEnabled(provider) {
    try {
        provider = provider ? provider : getProvider();
        const isCorrectNetwork = provider.network.chainId === CHAIN_ID;
        const isSignerReady = provider.getSigner()._isSigner;

        const isEnabled = isCorrectNetwork && isSignerReady;
        console.log('[getEnabled] isSignerReady: ', isSignerReady,
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


export function getAddress(provider) {
    try {
        const provider = provider ? provider : getProvider();
        if (getEnabled(provider)) {
            return provider.getSigner().address;
        } else {
            return null;
        }
    } catch (e) {
        return null;
    }
}

export function getContract(provider) {
    return new ethers.Contract(
        ethers.utils.getAddress(ERC721_ADDRESS),
        ERC721_ABI,
        provider ? provider : getProvider()
    );

}

export async function doMint(signer, contract) {
    contract = contract ? contract : getContract();
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
    contract = contract ? contract : getContract();
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

export async function getMaxSupply() {
    const { data } = useEtherSWR(
        ['maxSupply', account, 'latest'],
        {}
    );
    console.log(`[chain] [getMaxSupply] data: `, data);
    return {
        data: toInt(data),        
    };
}
export async function getMaxPerTx() {
    const { data } = useEtherSWR(
        ['maxPerTX', null, 'latest'],
        {}
    );
    console.log(`[chain] [getMaxPerTx] data: `, data);
    return {
        data: toInt(data),        
    };
}
export async function getPrice() {
    const { data } = useEtherSWR(
        ['maxPerTX', null, 'latest'],
        {}
    );
    console.log(`[chain] [getMaxPerTx] data: `, data);
    return {
        data: toInt(data),    
    };
}

export async function getMintStats(account, contract) {
    console.log(`[chain] [getMintStats] account: `, account);
    contract = contract ? contract : getContract();
    const stats = await contract.getMintStats(account);
    const result = {
        minterNumMinted: ethers.utils.formatUnits(stats.minterNumMinted, 0),
        maxSupply: ethers.utils.formatUnits(stats.maxSupply, 0),
        totalSupply: ethers.utils.formatUnits(stats.currentTotalSupply, 0)
    };
    console.log(`[chain] [getMintStats] stats: `, result);
    return result;
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
                            console.log('receive', { event })
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
                            console.log('send', { event })
                            const update = state.sub(amount)
                            mutate(update, false) // optimistic update skip re-fetch
                        }
                    }
                ]
            }
        )
        console.log(`[chain] [getTokensOfOwner] account: `, account);
        
        const result = {
            minterNumMinted: tokens?.length ? tokens.length : 0,
            tokenIds: tokens,
        };
        console.log(`[chain] [getTokensOfOwner] result: `, result);
        return result;
    } catch (e) {
        console.error("[chain] [getTokensOfOwner] error:", e);
        return e;
    }
}

export async function getStaticData() {
    try {
        const { price } = getPrice();
        const { maxPerTx } = getMaxPerTx();
        const { maxSupply } = getMaxSupply();
        const data = {
            price: price,
            max: maxSupply,
            maxPerTx: maxPerTx,
        }
        console.log(`[chain] [getStaticData] data: `, data);
        return data;
    } catch(e) {
        console.error("[getStaticData]\t",e);
    }
    
}

export async function getNextTokenId(contract) {
    contract = contract ? contract : getContract();
    const data = await contract.nextTokenId();
    console.log(`[chain] [getNextTokenId] data: `, data);
    return data.toNumber();
}

export async function getTotalSupply(contract) {
    contract = contract ? contract : getContract();
    const { data, mutate } = useEtherSWR(
        ['totalSupply', account, 'latest'],
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
                        console.log('receive', { event })
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
                        console.log('send', { event })
                        const update = state.sub(amount)
                        mutate(update, false) // optimistic update skip re-fetch
                    }
                }
            ]
        }
    )
    //const data = ethers.utils.formatUnits(await contract.totalSupply(), 0);
    console.log(`[chain] [getTotalSupply] data: `, data);
    return toInt(data);
}
export async function getBalanceOf(address, contract) {
    const { data, mutate } = useEtherSWR(
        [address, 'balanceOf', account],
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
                        console.log('receive', { event })
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
                        console.log('send', { event })
                        const update = state.sub(amount)
                        mutate(update, false) // optimistic update skip re-fetch
                    }
                }
            ]
        }
    )
    //contract = contract ? contract : getContract();
    //const data = ethers.utils.formatUnits(await contract.balanceOf(address), 0);
    console.log(`[chain] [getBalanceOf] data: `, data);
    return data;
}

export async function getRemaining(contract) {
    contract = contract ? contract : getContract();
    const max = ethers.utils.formatUnits(await contract.maxSupply(), 0);
    const total = ethers.utils.formatUnits(await contract.totalSupply(), 0);
    const remaining = parseInt(max) - parseInt(total);
    console.log(`[chain] [getRemaining] remaining: `, remaining);
    return remaining;
    
}

export async function getOwnedMetadata(address, contract) {
    contract = contract ? contract : getContract();
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
        console.log(i, meta);        
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