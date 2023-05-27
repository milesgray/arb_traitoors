import { BigNumber, ethers } from 'ethers';
import axios from 'axios';
import { ERC721_ABI } from '../config/abi';
import {
    CHAIN_ID,
    ERC721_ADDRESS,
    ALCHEMY_API_KEY,
} from '../config/vars'

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

export async function getMaxSupply(contract) {
    contract = contract ? contract : getContract();
    const data = ethers.utils.formatUnits(await contract.maxSupply(), 0);
    console.log(`[chain] [getMaxSupply] data: `, data);
    return data;
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

export async function getTokensOfOwner(account, contract) {
    try {
        console.log(`[chain] [getTokensOfOwner] account: `, account);
        contract = contract ? contract : getContract();
        const tokens = await contract.tokensOfOwner(account);
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

export async function getStaticData(contract) {
    contract = contract ? contract : getContract();

    const price = ethers.utils.formatEther(await contract.price());
    const maxPerTx = ethers.utils.formatUnits(await contract.maxPerTX(), 0);
    const maxSupply = ethers.utils.formatUnits(await contract.maxSupply(), 0);
    const data = {
        price: price,
        max: maxSupply,
        maxPerTx: maxPerTx,
    }
    console.log(`[chain] [getStaticData] data: `, data);
    return data
}

export async function getNextTokenId(contract) {
    contract = contract ? contract : getContract();
    const data = await contract.nextTokenId();
    console.log(`[chain] [getNextTokenId] data: `, data);
    return data.toNumber();
}

export async function getTotalSupply(contract) {
    contract = contract ? contract : getContract();
    const data = ethers.utils.formatUnits(await contract.totalSupply(), 0);
    console.log(`[chain] [getTotalSupply] data: `, data);
    return data;
}
export async function getBalanceOf(address, contract) {
    contract = contract ? contract : getContract();
    const data = ethers.utils.formatUnits(await contract.balanceOf(address), 0);
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
        console.log(`[getOwnedMetadata]\tToken ${i}`);
        if (i.toNumber() === 0) {
            console.warn("[getOwnedMetadata]\t0 detected, returning default object");
            return {
                tokenId: 0,
                owned: true,
                image: "http://",
                name: 0,
                description: "",
                buyLink: "http://"
            }
        }
        try {
            const metadata_url = baseUri.replaceAll("/","").replace("ipfs:", "https://") + ".ipfs.nftstorage.link/" + i + ".json";
            console.log(`[getOwnedMetadata]\t${baseUri} -> ${metadata_url} baseUri`);
            const meta = await axios.get(metadata_url);
            const img_url = "https://" + meta.data.image.replace("ipfs://", "").replace("/", ".ipfs.nftstorage.link/");
            console.log(i, meta);
            let item = {
                tokenId: i.toNumber(),
                owned: true,
                image: img_url,
                name: meta.data.name,
                description: meta.data.description,
                buyLink: "https://testnets.opensea.io/assets/arbitrum/" + ERC721_ADDRESS + "/" + i.toNumber(),
            }
            return item
        } catch(e) {
            console.error(e);
            return {
                tokenId: 0,
                owned: true,
                image: "http://",
                name: 0,
                description: "",
                buyLink: "http://"
            }
        }
        
    }));
    return items;
}