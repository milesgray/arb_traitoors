import clsx from 'clsx';
import Image from 'next/image';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react'
import { ImportantButton } from '../Common';
import { DEFAULT_CHAIN_ID, getExplorerUrl } from '../../config/chains';
import { Logo } from "../Logo";
import OwnedPanel from "../OwnedPanel/OwnedPanel";
import { Tab } from '@headlessui/react';
import approvePic from "../../public/img/brand/approve.png";


function ImageCarousel({
    metadata
}) {
    return (
        <Tab.Group>
            <Tab.List>
                {({ selected }) => (
                    metadata.map((m) => {
                        <Tab as="fragment">
                            <i className={clsx([
                                'fa fa-circle',
                                selected ? 'text-aurora-400' : 'text-zinc-400'
                            ])}/>
                        </Tab>
                    })
                )}                
            </Tab.List>
            <Tab.Panels>
                {metadata.map((m) => { 
                    <Tab.Panel className="h-64 md:h-128a">
                        
                        <img src={m.image} className="object-contain" />
                        <a href={m.buyLink}>
                            {m.name}
                        </a>
                                                                    
                    </Tab.Panel>
                })}                
            </Tab.Panels>
        </Tab.Group>
    )

}

export default function SuccessModal({ 
    isOpen, 
    setIsOpen, 
    isLoading,
    quantity,     
    hash,     
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
                            "max-h-[400px]",
                            "md:max-h-[500px]",
                            "lg:max-h-[600px]",
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
                                <Dialog.Description className="mt-4 mb-0 text-xl text-slate-300">
                                    The {quantity} <Logo weight={500} /> belong to you now
                                </Dialog.Description>
                                <div className="p-2">
                                    <div className="z-[-1] absolute right-0 top-0  w-full h-[75vh]">
                                        <Image src={approvePic} alt="background"
                                            className="z-0 w-full object-fill object-bottom align-middle shadow-neutral-900 shadow-inner" />
                                    </div>
                                    <Transition
                                        show={isOpen}
                                        className="font-mono font-bold"
                                    >     
                                        <Transition.Child
                                            enter="ease-out duration-[3000ms]"
                                            enterFrom="opacity-100"
                                            enterTo="opacity-0"
                                            leave="ease-in duration-200"
                                            leaveFrom="opacity-100 scale-100"
                                            leaveTo="opacity-0 scale-95"
                                        >         
                                            The importance of this moment can not be understated...
                                        </Transition.Child>  
                                        <Transition.Child
                                            enter="ease-out duration-[13000ms]"
                                            enterFrom="opacity-0"
                                            enterTo="opacity-100"
                                            leave="ease-in duration-200"
                                            leaveFrom="opacity-100"
                                            leaveTo="opacity-0"
                                        >
                                            Check out the <a href={`${getExplorerUrl(DEFAULT_CHAIN_ID)}tx/${hash}`} target="_blank" className="text-red-600 font-bold">
                                                transaction
                                            </a> or the listings:
                                        </Transition.Child>
                                    </Transition>
                                    <Transition
                                        show={!isLoading}
                                        className="glow-sm shadow-aurora-200 w-auto "
                                        enter="ease-out duration-300"
                                        enterFrom="opacity-0"
                                        enterTo="opacity-100"
                                        leave="ease-in duration-200"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <OwnedPanel metadata={metadata} /> 
                                    </Transition>
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