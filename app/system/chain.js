import { BigNumber, ethers } from 'ethers';
import { arbitrum } from 'wagmi/chains';
import { ERC721_ABI } from '../config/abi';
import {
    CHAIN_NAME,
    NETWORK_NAME,
    ERC721_ADDRESS,
    ALCHEMY_API_KEY,
    INFURA_API_KEY,
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

export function getProvider() {
    const provider = new ethers.providers.AlchemyProvider(42161, ALCHEMY_API_KEY);
    return provider;
}

export function getEnabled(provider) {
    try {
        provider = provider ? provider : getProvider();
        const isCorrectNetwork = provider.network.chainId === arbitrum.id;
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

export async function getRemaining(contract) {
    try {
        contract = contract ? contract : getContract();
        const max = ethers.utils.formatUnits(await contract.maxSupply(), 0);
        const total = ethers.utils.formatUnits(await contract.totalSupply(), 0);
        const remaining = max - total;
        console.log(`[chain] [getRemaining] remaining: `, remaining);
        return remaining;
    } catch (e) {
        return null;
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

    //const name = await contract.name();
    //const symbol = await contract.symbol();
    const price = ethers.utils.formatEther(await contract.price());
    const maxPerTx = ethers.utils.formatUnits(await contract.maxPerTX(), 0);
    const maxSupply = ethers.utils.formatUnits(await contract.maxSupply(), 0);
    //const baseURI = await contract.baseURI();
    const data = {
        //name: name,
        //symbol: symbol,
        price: price,
        max: maxSupply,
        maxPerTx: maxPerTx,
        //baseURI: baseURI
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