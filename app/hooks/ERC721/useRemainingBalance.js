import { useState } from 'react';

export default function useRemainingBalance({ isEventUpdating }) {
    const [remaining, setRemaining] = useState();
    const [balance, setBalance] = useState();
    const { address } = useAccount();
    const provider = useProvider();
    const contract = getContract(provider);

    useEffect(() => {
        async function pull() {
            try {
                if (address) {
                    const owned_p = getTokensOfOwner(address, contract);
                    const remaining_p = getRemaining(contract);
                    Promise.all([remaining_p, owned_p]).then(([remain, owned]) => {
                        try {
                            const num_minted = parseInt(owned.minterNumMinted);
                            setBalance(num_minted);
                            console.log(`[RemainingBalance] num minted: `, num_minted, ", getTokensOfOwner result:", owned);
                            setRemaining(remain);
                            console.log(`[RemainingBalance] remaining calc: `, remain,
                                ", remaining: ", remaining);
                        } catch (e) {
                            console.warn("[RemainingBalance] Error: ", e)
                        }

                    });
                } else {
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
                }      
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

    return {
        remaining,
        balance
    };
}