import React, { useState, useEffect } from 'react';
import { useProvider, useAccount, useConnect } from 'wagmi';
import { getContract, getTokensOfOwner } from '../../system/chain';
import useOnTransfer from '../../hooks/ERC721/useOnTransfer';


export default function Balance() {
    const [balance, setBalance] = useState();
    const { address, isConnecting, isDisconnected } = useAccount();
    const provider = useProvider();
    const contract = getContract(); 
    
    async function onTransfer() {        
        getTokensOfOwner(address, contract).then((data) => {
            const result = parseInt(data.minterNumMinted);
            setBalance(result);
            console.log(`[Balance] result: `, result, data, balance);
        });
    }
    const delay = 1000;
    //const { isEnabled, setEnabledState } = useOnTransfer({ onTransfer, delay });
    
    if (!balance) {
        return <span className="blur text-red-600 font-bold">?????</span>
    }
    console.log(`[Balance] `, balance);
    return <span className="text-red-600 font-bold">{balance}</span>
}