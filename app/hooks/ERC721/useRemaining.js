import { useState } from 'react';

export default function useRemaining({isEventUpdating}) {
    const [remaining, setRemaining] = useState();
    const { address } = useAccount();
    const provider = useProvider();
    const contract = getContract(provider);

    useEffect(() => {
        async function pull() {
            try {
                const remaining_p = getRemaining(contract);
                Promise.all([remaining_p]).then(([remain]) => {
                    try {
                        setRemaining(remain);
                        console.log(`[RemainingBalance] remaining calc: `, remain,
                            ", remaining: ", remaining);
                    } catch (e) {
                        console.warn("[RemainingBalance] Error: ", e)
                    }

                });
            
            } catch (e) {
                console.warn("[RemainingBalance] Error: ", e)
            }

        }
        pull();
        if (isEventUpdating) {
            const transferTo = contract.filters.Transfer(null, address);
            provider.on(transferTo, (from, to, amount, event) => {
                try {
                    console.log('Transfer|received', { from, to, amount, event });
                    pull();
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