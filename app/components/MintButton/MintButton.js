import { Fragment, useState } from 'react'
import { useSigner, useAccount } from 'wagmi'
import  useMint from "../../hooks/ERC721/useMint";
import { getOwnedMetadata } from "../../lib/chain";
import { toast } from 'react-toastify';

import { PurchaseModal } from "../PurchaseModal";
import { SuccessModal } from "../SuccessModal";
import { ErrorModal } from "../ErrorModal";
import { HugeImportantDisabledButton, HugeImportantButton, SmallImportantButton, SmallImportantDisabledButton } from "../Common";
import { useNetwork, useSwitchNetwork } from 'wagmi';
import {
    CHAIN_ID,
} from '../../config/vars'

export default function MintButton({ isText, data, remaining, size="huge" }) {
    const { isDisconnected } = useAccount();
    const { data: signer } = useSigner();
    const [quantity, setQuantity] = useState(1);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isNotAvailable, setNotAvailable] = useState(remaining == 0);    
    const [isPurchaseOpen, setIsPurchaseOpen] = useState();
    const [isSuccessLoading, setSuccessLoadingState] = useState();
    const [isSuccessOpen, setIsSuccessOpen] = useState();
    const [isErrorOpen, setIsErrorOpen] = useState();
    const [errorMessage, setErrorMessage] = useState();
    const [numberMinted, setNumberMinted] = useState();
    const [ownedMetadata, setOwnedMetadata] = useState();
    const { chain } = useNetwork();
    const { switchNetwork } = useSwitchNetwork();


    const { onMint, isSuccess, isError, isMinting, isLoading, hash } = useMint({
        onTxSuccess,
        onTxValidationFail,
        onTxFail,
        onTxSubmit,
        onTxSubmitError
    });
    async function onTxSuccess(receipt) {        
        setIsPurchaseOpen(false);
        setSuccessLoadingState(true);
        setIsSuccessOpen(true);
        toast.promise(getOwnedMetadata(receipt.from), {
            pending: "Loading your purchase, please wait...",
            success: "Purchase results Loaded!",
            error: `Could not load purchase results. Check etherscan for tx ${hash}`
        }).then((result) => {
            setNumberMinted(result.length);
            setOwnedMetadata(result);
            toast.info(`Number Minted: ${numberMinted}`);
            setSuccessLoadingState(false);
        });
    }
    async function onTxValidationFail(e) {
        toast.warn(`Transaction Validation Failed: ${e.message}`);
        console.log('[onTxValidationFail]', e.message);
        setErrorMessage(e.message);
        setIsDialogOpen(false);
        setIsSuccessOpen(false);
        setIsErrorOpen(true);
    }
    async function onTxFail(message) {
        console.log('[onTxFail]', message);
        setErrorMessage(message);
        setIsPurchaseOpen(false);
        setIsSuccessOpen(false);
        setIsErrorOpen(true);
    }
    async function onTxSubmit(tx) {
        console.log('[onTxSubmit]', tx);
    }
    async function onTxSubmitError(message) {
        console.log('[onTxSubmitError]', message);
        setErrorMessage(message);
        setIsPurchaseOpen(false);
        setIsSuccessOpen(false);
        setIsErrorOpen(true);
    }
    function handleClick() {
        console.log("[handleClick]");
        
        onMint(quantity, signer);
    }
    function onButtonClick() {
        console.log("[onButtonClick]");
        if (chain.id !== CHAIN_ID) {
            toast.warning("Incorrect network!");
            switchNetwork(CHAIN_ID);
            if (onTxValidationFail)
                onTxValidationFail(`Please connect to Arbitrum.`);
            return false;
        } else {
            setIsDialogOpen(true);
            setIsPurchaseOpen(true);
            setIsSuccessOpen(false);
            setIsErrorOpen(false);
        }
    }
    function endDialog() {
        setIsDialogOpen(false);
        setIsPurchaseOpen(false);
        setIsSuccessOpen(false);
        setIsErrorOpen(false);
    }
    return (
        <Fragment>
            {(!isDisconnected && data) ? (
                <div className={isLoading ? isMinting ? "animate-pulse animate-bounce" : "animate-pulse" : ""}>
                    {(size === "huge") ? (
                        <HugeImportantButton disabled={isNotAvailable} onClick={onButtonClick}>
                            {isMinting ? 'Minting...' : 'Mint'}
                        </HugeImportantButton>
                    ) : (
                        <SmallImportantButton disabled={isNotAvailable} onClick={onButtonClick}>
                            {isMinting ? 'Minting...' : 'Mint'}
                        </SmallImportantButton>
                    )}
                </div>                
            ) : 
            (
                <div>
                    {(size === "huge") ? (
                        <HugeImportantDisabledButton>
                        {'Mint'}
                        </HugeImportantDisabledButton>
                    ) : (
                        <SmallImportantDisabledButton>
                            {'Mint'}
                        </SmallImportantDisabledButton>
                    )}
                </div>                
            )}
            {(isDialogOpen && data) && (
                <PurchaseModal 
                    isOpen={isPurchaseOpen && !isSuccess && !isError}
                    setIsOpen={setIsDialogOpen}
                    quantity={quantity}
                    setQuantity={setQuantity}
                    isMinting={isMinting}
                    isLoading={isLoading}
                    maxPerTx={data.maxPerTx}
                    price={data.price}
                    onClick={handleClick}
                />
                )}
            {(isSuccess && hash && ownedMetadata) && (
                <SuccessModal
                    isOpen={isSuccessOpen}
                    setIsOpen={setIsSuccessOpen}
                    isLoading={isSuccessLoading}
                    hash={hash}
                    metadata={ownedMetadata}
                    onEnd={endDialog}
                />
            )}
            {(isError) && (
                <ErrorModal
                    isOpen={isErrorOpen}
                    setIsOpen={setIsErrorOpen}
                    message={errorMessage}
                    onRetry={onButtonClick}
                    onEnd={endDialog}
                />
            )}
            
        </Fragment>
    )
}