/* eslint-disable react/jsx-no-target-blank */
import React, { useEffect, useState } from "react";
import Image from 'next/image';
import headerPic from "../public/img/brand/header2.png";
import bgPic from "../public/img/brand/bg1.png";
import symbolWidePic from "../public/img/brand/symbol_wide.png";
import clsx from "clsx";
import IndexNavbar from "../components/Navbars/IndexNavbar.js";
import FooterSmall from "../components/Footers/FooterSmall.js";
import { Logo } from "../components/Text";
import { ToastContainer } from 'react-toastify';
import {  getStaticData } from "../lib/chain";
import 'react-toastify/dist/ReactToastify.min.css';
import ActionPanel from "../components/ActionPanel/ActionPanel";

const contextClass = {
    success: "bg-blue-600",
    error: "bg-red-600",
    info: "bg-gray-600",
    warning: "bg-orange-400",
    default: "bg-indigo-600",
    dark: "bg-white-600 font-gray-300",
};

function MidContent({ children }) {
    return (
        <div className={clsx([
            "w-full",
            "z-3",
            "md:w-4/12",
            "lg:w-7/12",
            "px-4",
            "lg:px-12",
            "md:px-4",
            "mb-10",
            "ml-auto",
            "mr-auto",
            "lg:mt-48"
        ])}>
            {children}
        </div>
    )
}

function IconTitledHeading({ text, iconClasses, ...props }) {
    return (
        <div className="pt-5 flex flex-row">
            <div className={clsx([
                "text-zinc-600",
                "mr-2",
                "text-center",
                "inline-flex",
                "items-center",
                "justify-center",
                "w-16",
                "h-16",
                "mb-6",
                "border-gray-500",
                "border-2",
                "shadow-slate-400",
                "rounded-full",
                "bg-black",
                "glow-lg"
            ])}>
                <div className={clsx([
                    "shadow-inner",
                    "shadow-red-900",
                    "rounded-full",
                    "p-5"
                ])}>
                    <i className={clsx([
                        iconClasses,
                        "text-xl",
                        "text-red-500"
                    ])}></i>
                </div>
            </div>
            <span className={clsx([
                "text-aurora-500",
                "text-5xl",
                "antialiased",
                "mt-0",
                "font-bold",
                "font-sans",
                "uppercase",
                "leading-normal"
            ])}>
                {text}
            </span>
        </div>
    )
}
function BlackOpacityContentArea({ children, ...props }) {
    return (
        <div className={clsx([
            "p-1",
            "bg-black",
            "bg-opacity-80",
            "glow-xl-long",
            "shadow-black"
        ])}  {...props}>
            {children}
        </div>
    )
}

function BlackGlowParagraph({ children, ...props }) {
    return (
        <p className={clsx([
            "text-xl",
            "leading-relaxed",
            "p-1",
            "mt-0",
            "mb-4",
            "text-zinc-300",
            "glow-lg-long",
            "shadow-black"
        ])} {...props}>
            {children}
        </p>
    )
}

function Paragraph({ children, ...props }) {
    return (
        <p className={clsx([
            "uppercase",
            "text-mono",
            "text-bold",
            "text-xl",
            "leading-relaxed",
            "p-1",
            "mt-0",
            "mb-4",
            "text-san-felix-600",
        ])} {...props}>
            {children}
        </p>
    )
}

function LgParagraph({ children, ...props }) {
    return (
        <p className={clsx([
            "uppercase",
            "text-mono",
            "text-bold",
            "text-3xl",
            "leading-relaxed",
            "p-6",
            "text-san-felix-600",
        ])} {...props}>
            {children}
        </p>
    )
}

function BulletPoint({ children, ...props }) {
    return (
        <li className={clsx([
            "text-2xl",
            "text-mono",
            "text-bold",
            "leading-relaxed",
            "mt-4",
            "text-san-felix-600",
        ])} {...props}>
            {children}
        </li>
    )
}

function TraitList({ ...props }) {
    return (
        <div className="block pb-6" {...props}>
            {['Species', 'Power', 'Age', 'Shape', 'Season', 'Style', 'Flavor'].map((w) => {
                return (
                    <TraitItem>
                        {w}
                    </TraitItem>
                )
            })}
        </div>
    )
}

function TraitItem({ children }) {
    return (
        <span className={clsx([
            "text-xs",
            "font-semibold",
            "inline-block",
            "py-1",
            "px-2",
            "rounded-full",
            "text-white",
            "bg-gray-800",
            "uppercase",
            "last:mr-0",
            "mr-2",
            "mt-2"
        ])}>
            {children}
        </span>
    )
}

export default function Owned() {
    const [staticData, setStaticData] = useState();

    useEffect(() => {
        setStaticData(getStaticData());
    }, []);


    return (
        <>
            <IndexNavbar fixed data={staticData} />
            <section className="header mt-6 items-center flex ">
                <div className="container mx-auto items-center justify-center md:justify-self-auto flex flex-wrap  z-4">
                    <div className="w-full z-2 mt-40 mb-20 bg-black bg-opacity-90 shadow-gray-500 glow-sm rounded-sm md:w-8/12 lg:w-6/12 xl:w-6/12 p-0 m-0">
                        <Image
                            src={headerPic}
                            alt="background"
                            className="static overflow-hidden object-contain object-center"
                        />
                        <h2 className="relative top-[-80px] left-4 font-semibold text-4xl lg:text-max pointer-events-none">
                            <Logo weight={600} plural />
                        </h2>
                        <h3 className={clsx([
                            "relative",
                            "top-[-70px]",
                            "left-4",
                            "text-2xl",
                            "font-semibold",
                            "text-gray-400",
                            "uppercase",
                            "font-intent"
                        ])}>
                            the infernal collection
                        </h3>
                        <div className={clsx([
                            "relative",
                            "top-[-55px]",
                            "p-2",
                            "font-intent"
                        ])}>
                            <Paragraph>
                                A mysterious and feared group that operated within the anicent Arbitrum proto-system...
                            </Paragraph>
                            <Paragraph>
                                <Logo weight={600} plural /> were tasked with the sacred duty of hunting down and punishing transactions deemed to be traitors to the underlying chain.
                            </Paragraph>
                            <Paragraph>
                                Now they are known as <span className="text-white uppercase antialiased font-oxanium">validators</span>.
                            </Paragraph>
                            <Paragraph>
                                Honor their legacy and sacrifice by minting their spirit back into existance!
                            </Paragraph>
                            <ActionPanel data={staticData} className="container mx-auto items-center justify-center" />
                        </div>
                    </div>
                   
                </div>
            </section>
            
            <section className="overflow-hidden relative">
                <div className="z-2 container mx-auto pb-20 mt-10">
                    <div className="z-2 flex-auto lg:w-8/12 p-0 mb-12 mr-auto ml-auto bg-black shadow-black glow-xl rounded-lg">
                        <div className="z-2 relative flex flex-col min-w-0 w-full rounded-lg">
                            <Image
                                src={symbolWidePic}
                                alt="background"
                                className="static overflow-hidden object-scale-down object-center"
                            />
                            <LgParagraph>
                                Honor these heroes of the past and claim your own <Logo weight={600} /> demon mask today. Show the world that you stand with the <Logo weight={600} /> in their fight against malicious transactions.
                            </LgParagraph>
                        </div>
                    </div>
                </div>
                <div className="z-[-1] absolute right-0 top-0  w-full h-[75vh]">
                    <Image src={bgPic} alt="background"
                        className="z-0 w-full object-fill object-bottom align-middle shadow-neutral-900 shadow-inner" />
                </div>
            </section>
            <section className="z-2 pb-16 bg-zinc-700 relative pt-2">
                <div
                    className="z-3 -mt-20 top-0 bottom-auto left-0 right-0 w-full absolute h-20"
                    style={{ transform: "tranzincZ(0)" }}
                >
                    <svg
                        className="absolute bottom-0 overflow-hidden"
                        xmlns="http://www.w3.org/2000/svg"
                        preserveAspectRatio="none"
                        version="1.1"
                        viewBox="0 0 2560 200"
                        x="0"
                        y="0"
                    >
                        <polygon
                            className="z-3 text-zinc-700 fill-current"
                            points="2560 0 2560 200 0 200"
                        ></polygon>
                    </svg>
                </div>

            </section>
            <div className="hidden">
                <span className="text-red-400">arbitrum</span>
                <span className="text-red-500">nft</span>
                <span className="text-red-600">ethereum</span>
                <span className="text-red-700">demon</span>
                <span className="text-red-800">mask</span>
                <span className="text-red-900">ai</span>
                <span className="text-red-ribbon-400">arbitrum</span>
                <span className="text-red-ribbon-500">nft</span>
                <span className="text-red-ribbon-600">ethereum</span>
                <span className="text-red-ribbon-700">demon</span>
                <span className="text-red-ribbon-800">mask</span>
                <span className="text-red-ribbon-900">ai</span>
                <span className="text-yellow-400">arbitrum</span>
                <span className="text-yellow-500">nft</span>
                <span className="text-yellow-600">ethereum</span>
                <span className="text-yellow-700">demon</span>
                <span className="text-yellow-800">mask</span>
                <span className="text-yellow-900">ai</span>
            </div>
            <FooterSmall />
            <ToastContainer
                position="bottom-right"
                theme="dark"
            />
        </>
    );
}