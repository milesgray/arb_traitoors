import React, { useState, useEffect } from 'react';
import { useProvider, useAccount, useConnect } from 'wagmi';
import { arbitrum, arbitrumGoerli } from 'wagmi/chains'
import { getContract, getTokensOfOwner } from '../../system/chain';


export default function Balance() {
    const [balance, setBalance] = useState();
    const [remaining, setRemaining] = useState();
    const { address, isConnecting, isDisconnected } = useAccount();
    const provider = useProvider();
    const contract = getContract(); 
    console.log("isError, isSuccess, contract", isError, isSuccess, contract);
    async function update() {        
        getTokensOfOwner(address, contract).then((data) => {
            const result = parseInt(data.minterNumMinted);
            setBalance(result);
            console.log(`[Balance] result: `, result, data, balance);
        });
    }
    useEffect(() => {
        update();

        const transferTo = contract.filters.Transfer(null, address);
        provider.on(transferTo, (from, to, amount, event) => {
            console.log('Transfer|received', { from, to, amount, event });
            update();
        });

        return () => {
            provider.removeAllListeners(transferTo);
        }
    }, [isDisconnected]); 

    if (!balance) {
        return <span className="blur text-red-600 font-bold">?????</span>
    }
    console.log(`[Balance] `, balance);
    return <span className="text-red-600 font-bold">{balance}</span>
}