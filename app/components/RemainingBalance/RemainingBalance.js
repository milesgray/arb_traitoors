import React, {useState, useEffect} from 'react';
import { useProvider, useAccount } from 'wagmi';
import { useContract } from '../../lib/contract';
import { getOwnedMetadata, getRemaining } from '../../lib/chain';
import { Conditional } from '../Common';


export default function RemainingBalance() {
    const [remaining, setRemaining] = useState();
    const [balance, setBalance] = useState();
    
    const { address } = useAccount();
    const provider = useProvider();
    const contract = useContract(provider);
    
    useEffect(() => {
        async function fetch() {
            setRemaining(await getRemaining());

            if (address) {
                const tokens = await contract.tokensOfOwner(address);                
                setBalance(tokens?.length ? tokens.length : 0);
            }            
        }
        fetch();
    }, [address]);
    
    console.debug(`[RemainingBalance] `, remaining, address, balance);
    return (
        <>
            <Conditional value={remaining} /> available, <Conditional value={balance} /> owned.
        </>        
    )
}