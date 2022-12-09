import { Fragment, useState } from 'react'
import { useSigner, useAccount } from 'wagmi'
import { useAccountModal } from '@rainbow-me/rainbowkit';
import  useMint from "../../hooks/ERC721/useMint";
import { getTokensOfOwner } from "../../system/chain";

import { PurchaseModal } from "../PurchaseModal";
import { ImportantButton, TextButton } from "../Common";

export default function MintButton({ isText, data, remaining }) {
    const { openConnectModal, isConnected,  } = useAccountModal();
    const { address, isConnecting, isDisconnected } = useAccount();
    const { data: signer } = useSigner();
    const [quantity, setQuantity] = useState(1);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isNotAvailable, setNotAvailable] = useState(remaining == 0);
    const isButton = !isText;

    const { onMint, isSuccess, isError, isMinting, isLoading, hash } = useMint({ onTxSuccess });

    async function onTxSuccess(receipt) {
        console.log(`[onTxSuccess] receipt: `, receipt, `, hash: `, hash);
        setIsDialogOpen(false);
        const result = await getTokensOfOwner(receipt.from);
        const numberMinted = result.minterNumMinted;
        const tokens = result.tokenIds;                
        console.log(`Mint Stats: ${numberMinted}, owned IDs:`,tokens);
    }
    function handleClick() {
        onMint(quantity, signer);
    }
    return (
        <Fragment>
            {(!isDisconnected && data && isText) && (
                <TextButton onClick={() => handleClick()}>
                    mint
                </TextButton>
            )}
            {(!isDisconnected && data && isButton) && (
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
            
        </Fragment>
    )
}