import {
    useConnectModal
} from '@rainbow-me/rainbowkit';

export default function RemainingConnect({tokenData, remaining}) {
    const { openConnectModal, isConnected } = useConnectModal();

    return (
        <p className="mt-4 text-xl leading-relaxed text-slate-500">
            {remaining ? (
                <span className="text-emerald-600 font-bold">{remaining}</span>
            ) : (
                    <span className="blur text-emerald-600 font-bold">?????</span>
            )} are still available
        </p>
    )
}