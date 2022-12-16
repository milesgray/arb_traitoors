import { useCallback, useMemo, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getEnabled, doMint, getTotalSupply, getStaticData, doBatchMint } from "../../system/chain";

export default function useMint({
    onTxSuccess,
    onTxFail,
    onTxSubmit,
}) {
    const [isSuccess, setSuccessState] = useState(false);
    const [isError, setErrorState] = useState(false);
    const [isMinting, setMintingState] = useState(false);
    const [isLoading, setLoadingState] = useState(false);
    const [hash, setHash] = useState();
    const [price, setPrice] = useState();
    const [max, setMax] = useState();
    const [maxPerTx, setMaxPerTx] = useState();

    const isEnabled = getEnabled();

    const onMint = useCallback(async (quantity, signer) => {
        if (!isEnabled) {
            console.log("Mint disabled", signer);
            return;
        }        
        data = await getStaticData();
        setPrice(data.price);
        setMax(data.max);
        setMaxPerTx(data.maxPerTx);
        
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
            if (onTxFail) {
                onTxFail(e);
            }
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