import { Fragment, useState } from 'react'
import { useSigner, useAccount } from 'wagmi'
import { useAccountModal } from '@rainbow-me/rainbowkit';
import  useMint from "../../hooks/ERC721/useMint";
import { getTokensOfOwner } from "../../system/chain";

import { PurchaseModal } from "../PurchaseModal";
import { ImportantButton, TextButton } from "../Common";
import { SuccessModal } from '../SuccessModal';
import { ErrorModal } from '../ErrorModal';

export default function MintButton({ isText, data, remaining }) {
    const { openConnectModal, isConnected,  } = useAccountModal();
    const { address, isConnecting, isDisconnected } = useAccount();
    const { data: signer } = useSigner();
    const [quantity, setQuantity] = useState(1);
    const [isPurchaseOpen, setIsPurchaseOpen] = useState();
    const [isSuccessOpen, setIsSuccessOpen] = useState();
    const [isNotAvailable, setNotAvailable] = useState();
    const [isErrorOpen, setIsErrorOpen] = useState();
    const [numberMinted, setNumberMinted] = useState();
    const [tokenIDs, setTokenIDs] = useState();

    const isButton = !isText;

    const { onMint, isEnabled, isSuccess, isError, isMinting, isLoading, hash } = useMint({ onTxSuccess, onTxFail });
    

    async function onTxSuccess(receipt) {
        console.log(`[onTxSuccess] receipt: `, receipt, `, hash: `, hash);
        setIsDialogOpen(false);
        const result = await getTokensOfOwner(receipt.from);
        setNumberMinted(result.minterNumMinted);
        setTokenIDs(result.tokenIds); 
        console.log(`Mint Stats: ${numberMinted}, owned IDs:`,tokens);
        setIsSuccessOpen(true);
    }
    async function onTxFail() {
        console.log('[onTxFail]');
        setIsDialogOpen(false);
        setIsSuccessOpen(false);
        setIsErrorOpen(true);
    }
    function handleClick() {
        console.log("handleClick", signer);
        onMint(quantity, signer);
    }
    return (
        <Fragment>
            {(!isDisconnected && data && isText) && (
                <TextButton onClick={() => handleClick()}>
                    mint
                </TextButton>
            )}
            {(!isDisconnected && !isNotAvailable && data && isButton) && (
                <div className={isLoading ? isMinting ? "animate-pulse animate-bounce" : "animate-pulse" : ""}>
                    <ImportantButton onClick={() => setIsPurchaseOpen(true)}>
                        {isMinting ? 'Minting...' : 'Mint'}
                    </ImportantButton>
                </div>                
            )}
            {(isEnabled && data) && (
                <PurchaseModal 
                    isOpen={isPurchaseOpen}
                    setIsOpen={setIsPurchaseOpen}
                    quantity={quantity}
                    setQuantity={setQuantity}
                    isMinting={isMinting}
                    isLoading={isLoading}
                    maxPerTx={data.maxPerTx}
                    price={data.price}
                    onClick={handleClick}
                />
                )}
            {(isEnabled && data) && (
                <SuccessModal
                    isOpen={isSuccessOpen}
                    setIsOpen={setIsSuccessOpen}
                    hash={hash}
                    tokenIDs={tokenIDs}
                />
            )}
            {(isEnabled && data) && (
                <ErrorModal
                    isOpen={isErrorOpen}
                    setIsOpen={setIsErrorOpen}
                    setPurchaseIsOpen={setIsPurchaseOpen}
                />
            )}
        </Fragment>
    )
}