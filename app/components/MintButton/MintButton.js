import { Fragment, useState } from 'react'
import { useSigner, useAccount } from 'wagmi'
import { useAccountModal } from '@rainbow-me/rainbowkit';
import  useMint from "../../hooks/ERC721/useMint";
import { getTokensOfOwner } from "../../system/chain";

import { PurchaseModal } from "../PurchaseModal";
import { SuccessModal } from "../SuccessModal";
import { ErrorModal } from "../ErrorModal";
import { ImportantButton, HugeImportantButton } from "../Common";

export default function MintButton({ isText, data, remaining }) {
    const { openConnectModal, isConnected,  } = useAccountModal();
    const { address, isConnecting, isDisconnected } = useAccount();
    const { data: signer } = useSigner();
    const [quantity, setQuantity] = useState(1);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isNotAvailable, setNotAvailable] = useState(remaining == 0);    
    const [isPurchaseOpen, setIsPurchaseOpen] = useState();
    const [isSuccessOpen, setIsSuccessOpen] = useState();
    const [isErrorOpen, setIsErrorOpen] = useState();
    const [errorMessage, setErrorMessage] = useState();
    const [numberMinted, setNumberMinted] = useState();
    const [tokenIDs, setTokenIDs] = useState();

    const { onMint, isSuccess, isError, isMinting, isLoading, hash } = useMint({
        onTxSuccess,
        onTxValidationFail,
        onTxFail,
        onTxSubmit,
        onTxSubmitError
    });
    async function onTxSuccess(receipt) {
        console.log(`[onTxSuccess] receipt: `, receipt, `, hash: `, hash);
        setIsPurchaseOpen(false);
        const result = await getTokensOfOwner(receipt.from);
        setNumberMinted(result.minterNumMinted);
        setTokenIDs(result.tokenIds);
        console.log(`Mint Stats: ${numberMinted}, owned IDs:`, tokens);
        setIsSuccessOpen(true);
    }
    async function onTxValidationFail(e) {
        console.log('[onTxValidationFail]');
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
        console.log('[onTxSubmit]', x);
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
        setIsDialogOpen(true);
        setIsPurchaseOpen(true);
        setIsSuccessOpen(false);
        setIsErrorOpen(false);
    }
    function endDialog() {
        setIsDialogOpen(false);
        setIsPurchaseOpen(false);
        setIsSuccessOpen(false);
        setIsErrorOpen(false);
    }
    return (
        <Fragment>
            {(!isDisconnected && data) && (
                <div className={isLoading ? isMinting ? "animate-pulse animate-bounce" : "animate-pulse" : ""}>
                    <HugeImportantButton disabled={isNotAvailable} onClick={onButtonClick}>
                        {isMinting ? 'Minting...' : 'Mint'}
                    </HugeImportantButton>
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
            {(isSuccess && hash && tokenIDs) && (
                <SuccessModal
                    isOpen={isSuccessOpen}
                    setIsOpen={setIsSuccessOpen}
                    hash={hash}
                    tokenIDs={tokenIDs}
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