import { useState } from 'react';

export default function useRemaining({isEventUpdating}) {
    const [remaining, setRemaining] = useState();
    const { address } = useAccount();
    const provider = useProvider();
    const contract = getContract(provider);

    useEffect(() => {
        async function fetch() {
            setRemaining(await getRemaining());
        }
        fetch();
        if (isEventUpdating) {
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
        }
    }, [isEventUpdating]);

    return remaining;
}