import clsx from 'clsx';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react'
import { ActionModal, ImportantButton, StyledInput } from '../Common';
import Logo from "../Logo";

export default function ErrorModal({ 
    isOpen, 
    setIsOpen,
    setPurchaseIsOpen, 
    errorMessage    
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
                                    Failure - {errorMessage}
                                </Dialog.Title>
                                <Dialog.Description className="mt-2 mb-4 text-xl text-slate-300">
                                    The <Logo weight={500} /> walks away...
                                </Dialog.Description>
                                <div className="flex">
                                    <p className={clsx([
                                        "flex",
                                        "flex-row",
                                        "space-x-4",
                                        "text-mono",
                                        "text-xl",
                                    ])}>
                                        Unfortunately, the transfer of power did not occur in this moment.
                                    </p>
                                    <p className={clsx([
                                        "flex",
                                        "flex-row",
                                        "space-x-4",
                                        "text-mono",
                                        "text-2xl"
                                    ])}>
                                        Whether it was your own choice or a glitch in the matrix matters not.
                                    </p>
                                    <p className={clsx([
                                        'flex-row',
                                        'relative',
                                        'top-6',
                                        'text-red-400',
                                        'block',
                                        "text-2xl",
                                        "uppercase"
                                    ])}>
                                        There may still be time! Do not let this oppooortunity slip through your feeble fingers, anon!
                                    </p>
                                </div>
                            </div>
                            <div className="px-8 pb-8 flex-row space-x-10">
                                <ImportantButton onClick={() => { setIsOpen(false); setPurchaseIsOpen(true); }}>
                                    Try again
                                </ImportantButton>
                                <ImportantButton onClick={() => setIsOpen(false)}>
                                    Give up
                                </ImportantButton>
                            </div>
                        </Dialog.Panel>
                    </div>
                </Transition.Child>
            </Dialog>
        </Transition>
                        
                    
    )
}