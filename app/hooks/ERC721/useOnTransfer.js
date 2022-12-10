import { useEffect, useState } from 'react';
import { getAddress, getContract, getProvider } from "../../system/chain";

export default function useOnTransfer({
    onEvent,
    delay
}) {
    const [isSuccess, setSuccessState] = useState(false);
    const [isError, setErrorState] = useState(false);
    const [isLoading, setLoadingState] = useState(false);
    const [isEnabled, setEnabledState] = useState();
    const provider = getProvider();
    const contract = getContract();
    const address = getAddress();
    setEnabledState(address !== null);

    async function register() {
        try {
            const transferTo = contract.filters.Transfer(null, address);

            return provider.on(transferTo, (from, to, amount, event) => {
                setLoadingState(false);
                console.log('Transfer|received', { from, to, amount, event });
                setSuccessState(true);
                setErrorState(false);
                if (onEvent) {
                    onEvent();
                }

                provider.removeAllListeners(transferTo);
                setLoadingState(true);
                return setInterval(() => {
                    register();
                }, delay);
            });
        } catch(e) {
            setSuccessState(false);
            setErrorState(true);
            console.error(e);
            return Promise(e);
        }  
    }
    useEffect(() => {
        if (!isEnabled) return;
        console.log("onTransfer enabled");
        register();

        return () => {
            provider.removeAllListeners(transferTo);
        }
    }, [isEnabled])

    return {
        isEnabled,
        isSuccess,
        isError,
        isLoading,
        address,
        contract,
        provider,
        setEnabledState
    }
}
