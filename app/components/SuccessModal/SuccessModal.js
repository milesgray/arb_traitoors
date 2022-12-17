import clsx from 'clsx';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react'
import { ActionModal, ImportantButton, StyledInput } from '../Common';
import { toInteger } from 'lodash';
import { ERC721_ADDRESS } from '../../config';
import { Logo } from "../Logo";

export default function SuccessModal({ 
    isOpen, 
    setIsOpen, 
    quantity,     
    hash,     
    tokenIDs,
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
                    <div className={clsx([
                        "fixed", 
                        "inset-0", 
                        "bg-black/80", 
                        "z-10"
                     ])} aria-hidden="true" />
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
                    <div className={clsx([
                        "fixed", 
                        "inset-0", 
                        "flex", 
                        "items-center", 
                        "justify-center", 
                        "p-4", 
                        "z-10"
                    ])}>
                        <Dialog.Panel className={clsx([
                            "relative",
                            "flex",
                            "flex-col",
                            "min-w-0",
                            "break-words",
                            "bg-zinc-800",
                            "w-auto mb-8",
                            "shadow-red-400",
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
                                    You are now OWNOOR
                                </Dialog.Title>
                                <Dialog.Description className="mt-2 mb-4 text-xl text-slate-300">
                                    The {quantity} <Logo weight={500} /> belong to you now
                                </Dialog.Description>
                                <div className="flex">
                                    <p className="flex flex-row space-x-4">
                                        The importance of this moment can not be understated. The entire metaverse pivots
                                        around your decision and thus the course of history has been forever altered.
                                    </p>
                                    <p className={clsx([
                                        'flex-row',
                                        'relative',
                                        'top-6',
                                        'text-yellow-400',
                                        'w-8/12',
                                        'block'
                                    ])}>
                                        Check out the <a href={`https://arbiscan.io/tx/${hash}`}>
                                            transaction
                                        </a> or the <a href={`https://opensea.io/assets/arbitrum/${ERC721_ADDRESS}/${tokenIDs[tokenIDs.length]}`}>
                                            listing
                                        </a>.
                                    </p>
                                </div>
                            </div>
                            <div className="px-8 pb-8 flex-row space-x-10">
                                <ImportantButton onClick={() => setIsOpen(false)}>
                                    Done
                                </ImportantButton>
                            </div>
                        </Dialog.Panel>
                    </div>
                </Transition.Child>
            </Dialog>
        </Transition>
                        
                    
    )
}