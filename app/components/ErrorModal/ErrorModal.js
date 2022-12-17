import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react'
import { ActionModal, ImportantButton, StyledInput } from '../Common';
import { Logo } from "../Logo";

export default function ErrorModal({ 
    isOpen, 
    setIsOpen,
    message,
    onRetry,
    onEnd
}) {    
    const [isPhrase1Open, setIsPhrase1Open] = useState(true);
    const [isPhrase2Open, setIsPhrase2Open] = useState(false);
    const [isPhrase3Open, setIsPhrase3Open] = useState(false);
    function setupPhase2() {
        setIsPhrase1Open(false);
        setIsPhrase2Open(true);
        setIsPhrase3Open(false);        
    }
    function setupPhase3() {
        setIsPhrase1Open(false);
        setIsPhrase2Open(false);
        setIsPhrase3Open(true);
    }
    useEffect(() => {
        setTimeout(() => {
            setupPhase2();
            setTimeout(() => {
                setupPhase3();
            }, 3000);
        }, 3000);
    }, [message]);
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
                                    Failure - {message}
                                </Dialog.Title>
                                <Dialog.Description className="mt-2 mb-4 text-xl text-slate-300">
                                    The <Logo weight={500} /> walks away...
                                </Dialog.Description>
                                <div className="mt-2">
                                    <Transition
                                        show={isPhrase1Open}
                                        enter="ease-out duration-1000"
                                        enterFrom="opacity-0 scale-95"
                                        enterTo="opacity-100 scale-100"
                                        leave="ease-in duration-400"
                                        leaveFrom="opacity-100 scale-100"
                                        leaveTo="opacity-0 scale-95"
                                        className={clsx([
                                            "space-y-2",
                                            "text-mono",
                                            "text-lg",                                            
                                            "w-fit",                                         
                                        ])}
                                    >
                                        Unfortunately, the transfer of power did not occur in this moment.
                                    </Transition>
                                    <Transition
                                        show={isPhrase2Open}
                                        enter="ease-out duration-1000"
                                        enterFrom="opacity-0 scale-95"
                                        enterTo="opacity-100 scale-100"
                                        leave="ease-in duration-400"
                                        leaveFrom="opacity-100 scale-100"
                                        leaveTo="opacity-0 scale-95"
                                        className={clsx([
                                            "space-y-2",
                                            "text-mono",
                                            "text-lg",
                                            "w-fit",  
                                        ])}
                                    >
                                        Whether it was your own choice or a glitch in the matrix matters not.
                                    </Transition>
                                    <Transition
                                        show={isPhrase3Open}
                                        enter="ease-out duration-1000"
                                        enterFrom="opacity-0 scale-95"
                                        enterTo="opacity-100 scale-100"
                                        leave="ease-in duration-400"
                                        leaveFrom="opacity-100 scale-100"
                                        leaveTo="opacity-0 scale-95"
                                        className={clsx([
                                            "space-y-4",
                                            "text-mono",
                                            "text-xl",
                                            "w-fit",  
                                        ])}
                                    >
                                        Do not let this oppooortunity slip through your feeble fingers, anon!
                                    </Transition>
                                </div>
                            </div>
                            <div className="px-8 pb-8 flex-row space-x-10">
                                <ImportantButton onClick={onRetry}>
                                    Try again
                                </ImportantButton>
                                <ImportantButton onClick={onEnd}>
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