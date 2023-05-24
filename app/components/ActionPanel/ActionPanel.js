import clsx from 'clsx';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { MintButton } from '../MintButton';
import { RemainingBalance } from '../RemainingBalance';

export default function ActionPanel({data, remaining, balance, ...props}) {
    return (
        <div {...props}>
            <div className={clsx([
                "mt-2", 
                "ml-2", 
                "lg:mt-8", 
                "text-xl", 
                "leading-relaxed", 
                "text-aurora-300"
            ])}>
                <ConnectButton /> <i className={clsx([
                    "mx-12", 
                    "pt-4", 
                    "text-3xl", 
                    "fa", 
                    "fa-arrow-down", 
                    "flex",
                    data ? "animate-bounce" : ""
                 ])} /> <RemainingBalance remaining={remaining} balance={balance} />
            </div>
            <div className="left-6 ml-8 mt-4 pb-0">
                <MintButton data={data} />
            </div>
        </div>
    )
}