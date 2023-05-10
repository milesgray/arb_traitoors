import React, { useState, useEffect } from 'react';
import { useProvider, useAccount, useConnect } from 'wagmi';
import { getContract, getTokensOfOwner } from '../../lib/chain';
import useOnTransfer from '../../hooks/ERC721/useOnTransfer';


export default function Balance() {
    const [balance, setBalance] = useState();
    const { address, isConnecting, isDisconnected } = useAccount();
    const provider = useProvider();
    const contract = getContract(); 
    console.log("isError, isSuccess, contract", isError, isSuccess, contract);
    
    
    //const { isEnabled, setEnabledState } = useOnTransfer({ onTransfer, delay });
    const delay = 1000;
    useEffect(() => {
        if (!address) return;

        async function pullData() {
            return getTokensOfOwner(address, contract).then((data) => {
                const result = parseInt(data.minterNumMinted);
                setBalance(result);
                console.log(`[Balance] result: `, result, data, balance);
                
                return setTimeout(() => {
                    pullData();
                }, delay); 
            });        
        }

        const timeout = pullData();

        return () => {
            timeout.cancel();
        }
    }, [address]); 
    
    if (!balance) {
        return <span className="blur text-gray-600 font-bold">?????</span>
    }
    console.log(`[Balance] `, balance);
    return <span className="text-gray-600 font-bold">{balance}</span>
}