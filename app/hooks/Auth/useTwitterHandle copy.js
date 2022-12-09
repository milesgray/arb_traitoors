import { useCallback, useMemo, useEffect, useState } from 'react';
import { useAccount, useProvider, isAddress } from 'wagmi';
import { IdrissCrypto, Authorization } from "idriss-crypto";

export default function useTwitterHandle({
    onSuccess,
    onError
}) {
    const { address, isConnecting, isDisconnected } = useAccount();
    const [twitterHandle, setTwitterHandle ] = useState();
    const [isSuccess, setIsSuccess] = useState();
    const [isError, setIsError] = useState();

    async function lookup(address) {
        try {
            const obj = new IdrissCrypto();

            const reverse = await obj.reverseResolve(address);
            
            setIsSuccess(true);
            if (onSuccess) {
                onSuccess(e);
            } else {
                console.log(reverse);
            }            

            return reverse;
        } catch(e) {
            setIsError(true);
            if (onError) {
                onError(e);
            } else {
                console.error(`IDriss: ${e}`);
            }            
        }
    }

    useEffect(useMemo(() => {
        if (isDisconnected || isConnecting) return;
        setTwitterHandle(lookup(address));
    }), [address]);
    
    return {
        twitterHandle,
        isSuccess,
        isError
    }
}