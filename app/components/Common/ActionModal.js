import clsx from 'clsx';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

export default function ActionModal({
    children,
    isOpen,
    setIsOpen
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
                            {children}
                        </Dialog.Panel>
                    </div>
                </Transition.Child>
            </Dialog>
        </Transition>
    )
}