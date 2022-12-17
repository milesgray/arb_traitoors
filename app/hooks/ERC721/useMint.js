import { useCallback, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { getEnabled, doMint, getRemaining, getStaticData, doBatchMint } from "../../system/chain";

export default function useMint({
    onTxSuccess,
    onTxFail,
    onTxValidationFail,
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
    }, []);


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
                if (onTxValidationFail)
                    onTxValidationFail(`Please connect to Arbitrum.`);
            } else if (!isSignerReady) {
                console.log("No signer");
                if (onTxValidationFail)
                    onTxValidationFail(`Could not find an authorized wallet, make sure it is connected correctly.`);
            } else {
                console.log("Mint disabled", signer);
                if (onTxValidationFail)
                    onTxValidationFail(`Minting is not currently available.`);
            }
            return false;
        }
        const remaining = await getRemaining();
        if (remaining <= 0) {
            console.log("Mint sold out", remaining);
            if (onTxValidationFail)
                onTxValidationFail(`Mint over! Sold out.`);
            return false;
        }
        if (quantity > maxPerTx) {
            console.log("Quantity too high", quantity);
            if (onTxValidationFail)
                onTxValidationFail(`Max number of mints per transaction is ${maxPerTx}, but ${quantity} was entered.`);
            return false;
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
            const message = e.message.substr(0, e.message.indexOf("(") - 1);
            toast.error(message);
            setMintingState(false);
            setLoadingState(false);
            setErrorState(true);
            if (onTxSubmitError) {
                onTxSubmitError(message);
            }
            return false;
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
            return true;
        } catch (e) {
            console.error("[onMint]", e);
            const message = e.message.substr(0, e.message.indexOf("(") - 1);
            toast.error(message);
            setMintingState(false);
            setLoadingState(false);
            setErrorState(true);

            if (onTxFail) {
                onTxFail(message);
            }
            return false
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