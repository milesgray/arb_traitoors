import { Fragment, useState } from 'react'
import { useSigner, useAccount } from 'wagmi'
import { arbitrum } from 'wagmi/chains'
import { useConnectModal } from '@rainbow-me/rainbowkit';
import useMint from "../../hooks/ERC721/useMint";
import { getTokensOfOwner } from "../../system/chain";

import { PurchaseModal } from "../PurchaseModal";
import { ImportantButton, TextButton } from "../Common";
import { SuccessModal } from '../SuccessModal';
import { ErrorModal } from '../ErrorModal';

export default function MintButton({ data }) {
    const { openConnectModal } = useConnectModal();
    const { data: signer, isError: isSignerError, isLoading: isSignerLoading } = useSigner({
        chainId: arbitrum.id
    });
    const [quantity, setQuantity] = useState(1);
    const [isPurchaseOpen, setIsPurchaseOpen] = useState();
    const [isSuccessOpen, setIsSuccessOpen] = useState();
    const [isNotAvailable, setNotAvailable] = useState();
    const [isErrorOpen, setIsErrorOpen] = useState();
    const [numberMinted, setNumberMinted] = useState();
    const [tokenIDs, setTokenIDs] = useState();

    const { onMint, isEnabled, isSuccess, isError, isMinting, isLoading, hash } = useMint({ onTxSuccess, onTxFail });


    async function onTxSuccess(receipt) {
        console.log(`[onTxSuccess] receipt: `, receipt, `, hash: `, hash);
        setIsDialogOpen(false);
        const result = await getTokensOfOwner(receipt.from);
        setNumberMinted(result.minterNumMinted);
        setTokenIDs(result.tokenIds);
        console.log(`Mint Stats: ${numberMinted}, owned IDs:`, tokens);
        setIsSuccessOpen(true);
    }
    async function onTxFail() {
        console.log('[onTxFail]');
        setIsDialogOpen(false);
        setIsSuccessOpen(false);
        setIsErrorOpen(true);
    }
    function handleClick() {
        console.log("[MintButton] handleClick signer: ", signer);
        onMint(quantity, signer);
    }
    return (
        <Fragment>
            {(isEnabled && data) && (
                <div className={isLoading ? isMinting ? "animate-pulse animate-bounce" : "animate-pulse" : ""}>
                    <ImportantButton onClick={() => openConnectModal ? openConnectModal() : setIsPurchaseOpen(true)}>
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