import { useCallback, useMemo, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getEnabled, getContract, getProvider, doMint, getTotalSupply, getStaticData, doBatchMint } from "../../system/chain";

export default function useMint({
    onTxSuccess,
    onTxFail,
    onTxSubmit,
}) {
    const provider = getProvider();
    const contract = getContract(provider);
    const [isSuccess, setSuccessState] = useState(false);
    const [isError, setErrorState] = useState(false);
    const [isMinting, setMintingState] = useState(false);
    const [isLoading, setLoadingState] = useState(false);
    const [isEnabled, setEnabledState] = useState(false);
    const [hash, setHash] = useState();
    const [price, setPrice] = useState();
    const [max, setMax] = useState();
    const [maxPerTx, setMaxPerTx] = useState();
    const enabled = getEnabled(provider);

    useEffect(() => {
        if (enabled) {
            const max_p = getMaxSupply(contract);
            const total_p = getTotalSupply(contract);

            Promise.all([max_p, total_p]).then(([max, total]) => {
                const remaining = parseInt(max) - parseInt(total);
                const result = remaining > 0;
                setEnabledState(result);
                console.log(`[useMint] enabled `, result);
            });
        }
    }, [enabled])


    const onMint = useCallback(async (quantity, signer) => {
        if (!isEnabled) {
            console.log("[useMint] Mint disabled", signer);
            return;
        }
        data = await getStaticData(contract);
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