import clsx from 'clsx';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react'
import { ImportantButton, StyledInput } from '../Common';
import { toInteger } from 'lodash';

export default function PurchaseModal({ 
    isOpen, 
    setIsOpen, 
    quantity,     
    setQuantity,     
    isMinting,
    isLoading,
    maxPerTx,
    price, 
    onClick 
}) {    
    return (  
        <Transition
            show={isOpen}
            as={Fragment}
        >      
        <Dialog onClose={() => setIsOpen(false)}>
            <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div className="fixed inset-0 bg-black/80 z-10" aria-hidden="true" />
            </Transition.Child>
            <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
            >
                <div className="fixed inset-0 flex items-center justify-center p-4 z-10">
                    <Dialog.Panel className={clsx([
                        "relative",
                        "flex",
                        "flex-col", 
                        "min-w-0", 
                        "break-words",
                        "bg-zinc-800", 
                        "w-auto mb-8", 
                        "shadow-aurora-400",
                        "glow-sm-long", 
                        "rounded-sm"
                    ])}>
                        <div className={clsx([
                            "px-4", 
                            "py-5", 
                            "flex-auto",
                            "shadow-zinc-900",
                            "shadow-inner"
                        ])}>
                            <Dialog.Title className="text-2xl font-bold">
                                Select Quantity
                            </Dialog.Title>
                            <Dialog.Description className="mt-2 mb-4 text-xl text-slate-300">
                                Bulk minting happens in a single transaction
                            </Dialog.Description>
                            <div className="flex">
                                <div className="flex flex-row space-x-4">
                                    <StyledInput 
                                        type="number" 
                                        value={quantity} 
                                        min={1} 
                                            max={maxPerTx} 
                                            onChange={(e) => toInteger(e.target.value) > maxPerTx ? setQuantity(maxPerTx) : setQuantity(e.target.value)} 
                                    />

                                    <p className={clsx([
                                        'relative', 
                                        'top-6',
                                        'text-aurora-400',
                                        'w-8/12', 
                                        'block'
                                    ])}>
                                        {quantity * price} ETH total
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="px-8 pb-8 flex-row space-x-10">
                            <span className={isLoading ? isMinting ? "animate-pulse animate-bounce" : "animate-pulse" : ""}>
                                <ImportantButton disabled={isLoading} onClick={() => onClick()}>
                                    {isMinting ? 'Minting' : 'Purchase'}
                                </ImportantButton>
                            </span>
                        <Transition
                            as={"span"}
                            show={!isLoading}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="transition-opacity duration-150"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0">
                                    <ImportantButton disabled={isLoading} onClick={() => setIsOpen(false)}>
                                        Cancel
                                    </ImportantButton>
                        </Transition>
                        </div>
                    </Dialog.Panel>
                </div>
            </Transition.Child>            
        </Dialog>
        </Transition>
    )
}