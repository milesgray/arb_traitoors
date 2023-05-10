import clsx from 'clsx';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react'
import { ImportantButton } from '../Common';
import { Logo } from "../Logo";
import OwnedPanel from "../OwnedPanel/OwnedPanel";

export default function OwnedModal({
    isOpen,
    setIsOpen,
    isLoading,
    quantity,
    metadata,
}) {
    console.log(metadata);
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
                            "max-h-[500px]",
                            "md:max-h-[600px]",
                            "lg:max-h-[800px]",
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
                                    Welcom, OWNOOR
                                </Dialog.Title>
                                <Dialog.Description className="mt-4 mb-0 text-xl text-slate-300">
                                    The {quantity} <Logo weight={500} /> belong to you now
                                </Dialog.Description>
                                <div className="p-2">
                                    <OwnedPanel metadata={metadata} />
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