import { useState, useEffect } from 'react';
import { useAccount, useProvider } from 'wagmi';
import { getContract, getRemaining } from '../../lib/chain';
export default function useRemainingBalance() {
    const [remaining, setRemaining] = useState();
    const [balance, setBalance] = useState();
    const { address } = useAccount();
    const provider = useProvider();
    const contract = getContract(provider);

    useEffect(() => {
        async function fetch() {
            setRemaining(await getRemaining());

            if (address) {
                const tokens = await contract.tokensOfOwner(address);
                setBalance(tokens?.length ? tokens.length : 0);
            }
        }
        fetch();
            const transferTo = contract.filters.Transfer(null, address);
            provider.on(transferTo, (from, to, amount, event) => {
                try {
                    console.log('Transfer|received', { from, to, amount, event });
                    fetch();
                } catch (e) {
                    console.warn("[RemainingBalance] Error: ", e)
                }
            });

            return () => {
                provider.removeAllListeners(transferTo);
            }
        
    }, [address]);

    return {
        remaining,
        balance
    };
}