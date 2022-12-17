import { Fragment, useState } from 'react'
import { useSigner, useAccount } from 'wagmi'
import { useAccountModal } from '@rainbow-me/rainbowkit';
import  useMint from "../../hooks/ERC721/useMint";
import { getTokensOfOwner } from "../../system/chain";

import { PurchaseModal } from "../PurchaseModal";
import { SuccessModal } from "../SuccessModal";
import { ErrorModal } from "../ErrorModal";
import { ImportantButton, TextButton } from "../Common";

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

    const { onMint, isSuccess, isError, isMinting, isLoading, hash } = useMint({ onTxSuccess, onTxFail, onTxSubmit, onTxSubmitError });

    async function onTxSuccess(receipt) {
        console.log(`[onTxSuccess] receipt: `, receipt, `, hash: `, hash);
        setIsDialogOpen(false);
        const result = await getTokensOfOwner(receipt.from);
        setNumberMinted(result.minterNumMinted);
        setTokenIDs(result.tokenIds);
        console.log(`Mint Stats: ${numberMinted}, owned IDs:`, tokens);
        setIsSuccessOpen(true);
    }
    async function onTxFail(e) {
        console.log('[onTxFail]');
        setErrorMessage(e.message);
        setIsDialogOpen(false);
        setIsSuccessOpen(false);
        setIsErrorOpen(true);
    }
    async function onTxSubmit(tx) {

    }
    async function onTxSubmitError(e) {
        console.log('[onTxSubmitError]');
        setErrorMessage(e.message);
        setIsDialogOpen(false);
        setIsSuccessOpen(false);
        setIsErrorOpen(true);
    }
    function handleClick() {
        console.log("handleClick");
        onMint(quantity, signer);
    }
    return (
        <Fragment>
            {(!isDisconnected && data) && (
                <div className={isLoading ? isMinting ? "animate-pulse animate-bounce" : "animate-pulse" : ""}>
                    <ImportantButton disabled={isNotAvailable} onClick={() => setIsDialogOpen(true)}>
                        {isMinting ? 'Minting...' : 'Mint'}
                    </ImportantButton>
                </div>                
            )}
            {(!isDisconnected && data) && (
                <PurchaseModal 
                    isOpen={isDialogOpen}
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
            {(!isDisconnected && data && hash && tokenIDs) && (
                <SuccessModal
                    isOpen={isSuccessOpen}
                    setIsOpen={setIsSuccessOpen}
                    hash={hash}
                    tokenIDs={tokenIDs}
                />
            )}
            
        </Fragment>
    )
}