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

    const delay = 10000;
    useEffect(() => {
        async function pull() {
            const max_p = getMaxSupply(contract);
            const total_p = getTotalSupply(contract);
            Promise.all([max_p, total_p]).then(([max, total]) => {
                const result = parseInt(max) - parseInt(total);
                setRemaining(result);
                console.log(`[Remaining] result: `, result, remaining, max, total);

                setTimeout(() => {
                    pull();
                }, delay);
            });

            console.log("Address", address);

            if (address) {
                getTokensOfOwner(address, contract).then((data) => {
                    const result = parseInt(data.minterNumMinted);
                    setBalance(result);
                    console.log(`[Balance] result: `, result, data, balance);
                });
            }            
        }
        pull();    

    }, [isDisconnected]);
    
    
    console.log(`[Remaining] `, remaining);
    return (
        <>
            <Conditional value={remaining} /> available, <Conditional value={balance} /> owned.
        </>        
    )
}