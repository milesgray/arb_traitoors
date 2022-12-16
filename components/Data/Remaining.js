import React, {useState, useEffect} from 'react';
import { useProvider, useAccount } from 'wagmi';
import { getContract, getMaxSupply, getTotalSupply } from '../../system/chain';


export default function Remaining() {
    const [remaining, setRemaining] = useState();
    const { address, isConnecting, isDisconnected } = useAccount();
    const provider = useProvider();
    const contract = getContract();
    
    async function update() {
        const max_p = getMaxSupply(contract);
        const total_p = getTotalSupply(contract);
        Promise.all([max_p, total_p]).then(([max, total]) => {
            const result = parseInt(max) - parseInt(total);
            setRemaining(result);
            console.log(`[Remaining] result: `, result, remaining, max, total);
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
    
    if (!remaining) {
        return <span className="blur text-gray-600 font-bold">?????</span>
    }
    console.log(`[Remaining] `, remaining);
    return <span className="text-gray-600 font-bold">{remaining}</span>           
}