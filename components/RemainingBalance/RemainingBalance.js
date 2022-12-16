import React, {useState, useEffect} from 'react';
import { useProvider, useAccount } from 'wagmi';
import { getContract, getMaxSupply, getTotalSupply, getTokensOfOwner } from '../../system/chain';
import { Conditional } from '../Common';

export default function Remaining() {
    const [remaining, setRemaining] = useState();
    const [balance, setBalance] = useState();
    const { address, isConnecting, isDisconnected } = useAccount();
    const provider = useProvider();
    const contract = getContract(provider);

    useEffect(() => {
        async function pull() {
            if (address) {
                const owned_p = getTokensOfOwner(address, contract);
                const max_p = getMaxSupply(contract);
                const total_p = getTotalSupply(contract);
                Promise.all([max_p, total_p, owned_p]).then(([max, total, owned]) => {
                    const num_minted = parseInt(owned.minterNumMinted);
                    setBalance(num_minted);
                    console.log(`[Balance] num minted: `, num_minted, ", getTokensOfOwner result:", owned);
                    const remaining_calc = parseInt(max) - parseInt(total);
                    setRemaining(remaining_calc);
                    console.log(`[Remaining] remaining calc: `, remaining_calc,
                                ", remaining: ", remaining,
                                ", max: ", max,
                                ", total: ", total);
                });
            } else {
                const max_p = getMaxSupply(contract);
                const total_p = getTotalSupply(contract);
                Promise.all([max_p, total_p]).then(([max, total]) => {
                    const result = parseInt(max) - parseInt(total);
                    setRemaining(result);
                    console.log(`[Remaining] result: `, result, max, total);
                });
            }  
        }
        const transferTo = contract.filters.Transfer(null, address);
        provider.on(transferTo, (from, to, amount, event) => {
            console.log('Transfer|received', { from, to, amount, event });
            pull();
        });
        pull();    

        return () => {
            provider.removeAllListeners(transferTo);
        }
    }, [address]);
    
    console.log(`[Remaining] `, remaining);
    return (
        <>
            <Conditional value={remaining} /> available, <Conditional value={balance} /> owned.
        </>        
    )
}