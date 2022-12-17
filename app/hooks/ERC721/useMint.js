import { useCallback, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { getEnabled, doMint, getTotalSupply, getStaticData, doBatchMint } from "../../system/chain";

export default function useMint({
    onTxSuccess,
    onTxFail,
    onTxSubmit,
    onTxSubmitError,
}) {
    const [isSuccess, setSuccessState] = useState(false);
    const [isError, setErrorState] = useState(false);
    const [isMinting, setMintingState] = useState(false);
    const [isLoading, setLoadingState] = useState(false);
    const [isEnabled, setEnabledState] = useState(false);
    const [hash, setHash] = useState();
    const [price, setPrice] = useState();
    const [max, setMax] = useState();
    const [maxPerTx, setMaxPerTx] = useState();

    

    useEffect(() => {
        getStaticData().then((data) => {
            setPrice(data.price);
            setMax(data.max);
            setMaxPerTx(data.maxPerTx);
        })
    },[]);
    

    const onMint = useCallback(async (quantity, signer) => {
        console.log("onMint", quantity, signer);
        const {
            isEnabled: enabled,
            isCorrectNetwork,
            isSignerReady,
        } = getEnabled(signer.provider);
        setEnabledState(enabled);
        if (!enabled) {
            if (!isCorrectNetwork) {
                console.log("Incorrect network");
            }
            if (!isSignerReady) {
                console.log("No signer");
            }
            console.log("Mint disabled", signer);
            return;
        }        
        let tx;
        try {
            setSuccessState(false);
            setErrorState(false);

            setLoadingState(true);
            setHash(null);

            if (quantity > 1) {
                tx = await doBatchMint(quantity, signer);
            } else {
                tx = await doMint(signer);
            }
            console.log(`[onMint] transaction:`, tx);
            setHash(tx.hash);
            setMintingState(true);

            if (onTxSubmit) {
                onTxSubmit(tx);
            }
        } catch (e) {
            console.error("[onMint]", e);
            setMintingState(false);
            setLoadingState(false);
            setErrorState(true);
            if (onTxSubmitError) {
                onTxSubmitError(e);
            }
            return;
        }

        try {
            const receipt = await toast.promise(tx.wait(1), {
                pending: "Buying...",
                success: "Purchase Complete!",
                error: "Purchase Failed."
            });

            console.log(`[onMint] receipt: `, receipt);

            setMintingState(false);
            setLoadingState(false);
            setSuccessState(true);

            if (onTxSuccess) {
                onTxSuccess(receipt);
            }
        } catch (e) {
            console.error("[onMint]", e);
            setMintingState(false);
            setLoadingState(false);
            setErrorState(true);
            if (onTxFail) {
                onTxFail(e);
            }
        }
    }, []);

    return {
        onMint,
        isEnabled,
        isSuccess,
        isError,
        isMinting,
        isLoading,
        hash,
        price,
        max,
        maxPerTx
    }
}