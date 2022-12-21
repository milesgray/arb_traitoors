/* eslint-disable react/jsx-no-target-blank */
import React, { useEffect, useState } from "react";
import Image from 'next/image';
import teaser0Pic from '../public/img/brand/01.png';
import teaser1Pic from '../public/img/brand/02.png';
import teaser2Pic from '../public/img/brand/03.png';
import teaser3Pic from '../public/img/brand/04.png';
import teaser4Pic from '../public/img/brand/05.png';
import teaser5Pic from '../public/img/brand/06.png';
import teaser6Pic from '../public/img/brand/07.png';
import teaser7Pic from '../public/img/brand/08.png';
import teaser8Pic from '../public/img/brand/09.png';
import teaser9Pic from '../public/img/brand/10.png';
import teaser10Pic from '../public/img/brand/11.png';
import teaser11Pic from '../public/img/brand/12.png';
import teaser12Pic from '../public/img/brand/13.png';
import teaser13Pic from '../public/img/brand/14.png';
import teaser14Pic from '../public/img/brand/15.png';
import teaser15Pic from '../public/img/brand/16.png';
import headerPic from "../public/img/brand/header2.png";
import header2Pic from "../public/img/brand/header.png";
import headerLargePic from "../public/img/brand/header_lg.png";
import bgPic from "../public/img/brand/bg1.png";
import bgSmPic from "../public/img/brand/bg_sm.png";
import bgSm2Pic from "../public/img/brand/bg_sm2.png";
import symbolWidePic from "../public/img/brand/symbol_wide.png";
import { useAccount, useProvider, isAddress } from 'wagmi';
import clsx from "clsx";
import { MintButton } from "../components/MintButton";
import { Remaining, Balance } from "../components/Data";
import { RemainingBalance } from "../components/RemainingBalance";
import IndexNavbar from "../components/Navbars/IndexNavbar.js";
import FooterSmall from "../components/Footers/FooterSmall.js";
import Logo from "../components/Logo/Logo.js";
import { ToastContainer } from 'react-toastify';
import { getContract, getStaticData } from "../system/chain";
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { PreviewImage, PositionableImage } from "../components/Common";
import 'react-toastify/dist/ReactToastify.min.css';
import ColorGrid from "../components/ColorGrid/ColorGrid";
import ActionPanel from "../components/ActionPanel/ActionPanel";

const contextClass = {
  success: "bg-blue-600",
  error: "bg-red-600",
  info: "bg-gray-600",
  warning: "bg-orange-400",
  default: "bg-indigo-600",
  dark: "bg-white-600 font-gray-300",
};

function MidContent({children}) {
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

function IconTitledHeading({text, iconClasses, ...props}) {
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
function BlackOpacityContentArea({children, ...props}) {
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

function BlackGlowParagraph({children, ...props}) {
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
      "text-xl",
      "leading-relaxed",
      "p-1",
      "mt-0",
      "mb-4",
      "text-zinc-300",      
    ])} {...props}>
      {children}
    </p>
  )
}

function TraitList({...props}) {
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

function TraitItem({children}) {
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

export default function Index() {
  const [staticData, setStaticData] = useState();
  const { openConnectModal, isConnected } = useConnectModal();
  const provider = useProvider();
  const contract = getContract(provider);

  useEffect(() => {
    if (!contract) return;
    getStaticData(contract).then((data) => {
      setStaticData(data);
    });
  }, [contract]);
  
  
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
              <Logo weight={500} plural />
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
              <p className="mt-4 text-xl leading-relaxed font-mono text-zinc-100">
                Now known as <span className="text-white uppercase antialiased font-oxanium">validators</span>, <Logo weight={500} plural  /> were a mysterious and feared group that operated within the anicent Arbitrum proto-system.
              </p>
              
              
              <p className="mt-4 text-xl leading-relaxed font-mono text-zinc-100">
                <Logo weight={500} /> were tasked with the sacred duty of hunting down and punishing those who were deemed to be traitors within the Arbitrum community.
              </p>
              
              <p className="mt-4 text-2xl font-mono text-zinc-100">
                Are you a bad enough dude to carry on their legacy?
              </p>
              <p className="mt-4 text-2xl font-mono text-zinc-100 p-8">
                <i className="fab fa-l p-2 text-red-600" />
                <i className="fab fa-f p-2 text-ruby-magma-600" />
                <i className="fab fa-g p-2 text-crimson-tide-600" />
                <i className="fa fa-bolt p-2 text-aurora-500" />
                <i className="fab fa-l p-2 text-red-600" />
                <i className="fab fa-f p-2 text-ruby-magma-600" />
                <i className="fab fa-g p-2 text-crimson-tide-600" />
                <i className="fa fa-bolt p-2 text-aurora-500" />
                <i className="fab fa-l p-2 text-red-600" />
                <i className="fab fa-f p-2 text-ruby-magma-600" />
                <i className="fab fa-g p-2 text-crimson-tide-600" />
                <i className="fa fa-bolt p-2 text-aurora-500" />
                <i className="fab fa-l p-2 text-red-600" />
                <i className="fab fa-f p-2 text-ruby-magma-600" />
                <i className="fab fa-g p-2 text-crimson-tide-600" />
                <i className="fa fa-bolt p-2 text-aurora-500" />
                <i className="fab fa-l p-2 text-red-600" />
                <i className="fab fa-f p-2 text-ruby-magma-600" />
                <i className="fab fa-g p-2 text-crimson-tide-600" />
              </p>
              <ActionPanel data={staticData} className="container mx-auto items-center justify-center" />
              
            </div>
          </div>
          <div className="w-full lg:w-4/12 pt-4 pb-2 mb-12 mx-auto z-3">
            <div className="z-10 relative flex flex-row min-w-0 w-full mb-2 mt-12">
              <div className="flex-col  shadow-zinc-900 glow-md">
                <PreviewImage src={teaser6Pic} />
                <PreviewImage src={teaser7Pic} />
                <PreviewImage src={teaser8Pic} />
                <PreviewImage src={teaser1Pic} />
                <PreviewImage src={teaser13Pic} />
              </div>
              <div className="flex-col shadow-zinc-900 glow-md">
                <PreviewImage src={teaser9Pic} />
                <PreviewImage src={teaser11Pic} />
                <PreviewImage src={teaser12Pic} />
                <PreviewImage src={teaser14Pic} />
                <PreviewImage src={teaser15Pic} />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="md:hidden lg:hidden xl:hidden">
        <div className="lg:mb-24 container mx-auto">
          <div className="lg:mb-24 flex-auto lg:w-8/12 p-0 mb-12 mr-auto ml-auto bg-black shadow-black glow-xl-long rounded-lg">
            <div className="lg:z-10 relative flex flex-col min-w-0 w-full rounded-lg shadow-black glow-md ">
              <p className="lg:z-10 p-6 text-3xl leading-relaxed font-mono text-zinc-200">
                It was said that the <Logo weight={500} plural  /> were a group of powerful sorcerers who had harnessed the dark arts and rumored to wear demon masks. They were said to be able to see into the hearts and minds of those around them, using their magic to uncover even the most hidden of secrets.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Image src={bgSmPic} alt="background" 
        className="w-full absolute align-middle left-0 top-0"/>

      <section className="flex mt-0 lg:pt-24 md:mt-20 lg:pb-40 relative bg-zinc-800">
        <div
          className="-mt-[7.8rem] md:-mt-24 top-0 bottom-auto left-0 right-0 w-full absolute h-40"
          style={{ transform: "tranzincZ(0)" }}
        >
          <svg
            className="absolute bottom-0 overflow-hidden text-zinc-800"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 810"
            x="0"
            y="0"
          >
            <polygon
              className=" fill-current"
              points="2560 0 2560 810 0 810"
            ></polygon>
          </svg>
        </div>
        

        <div className="flex container mx-auto px-8 lg:px-20">
          <div className="flex flex-wrap items-center" >
            <MidContent>
              <IconTitledHeading text="Traits" iconClasses={"fab fa-star"} />
              <BlackOpacityContentArea>
                <Paragraph>
                  Each <Logo weight={500} /> has their own unique demon mask, crafted with care and infused with their own style and vision.
                </Paragraph>
                <Paragraph>
                  Some are sleek and elegant, while others are grotesque and terrifying.
                </Paragraph>
                <Paragraph>
                  All are powerful symbols of the <Logo weight={500} plural  />' commitment to the continued stability of Arbitrum.
                </Paragraph>
                <TraitList />
              </BlackOpacityContentArea>  
            </MidContent>
            

            <div className="hidden lg:flex xl:block w-full lg:w-4/12 pt-4 pb-2 mb-12 mr-auto ml-auto z-10">
              <div className="z-10 relative flex flex-row min-w-0 w-full mb-2 mt-4">
                <div className="flex-col  shadow-zinc-900 glow-md">
                  <PreviewImage src={teaser0Pic} />
                  <PreviewImage src={teaser10Pic} />
                  <PreviewImage src={teaser2Pic} />
                </div>
                <div className="flex-col shadow-zinc-900 glow-md">
                  <PreviewImage src={teaser3Pic} />
                  <PreviewImage src={teaser4Pic} />
                  <PreviewImage src={teaser5Pic} />
                </div>
              </div>
            </div>
            <Image src={headerLargePic} alt="background"
              className="z-0 w-full absolute align-middle left-0 top-0 shadow-neutral-900 glow-lg shadow-inner" />
            <div className="z-3 container mx-auto">
              <div className="z-2 flex-auto lg:w-8/12 p-0 mb-12 mr-auto ml-auto bg-black shadow-black glow-xl-long rounded-lg">
                <div className="z-2 relative flex flex-col min-w-0 w-full rounded-lg shadow-black glow-md ">
                  <p className="p-6 text-3xl leading-relaxed font-mono text-zinc-200">
                    Now, the <Logo weight={500} plural /> have decided to pass their masks to the new generation, and they are being offered as non-fungible tokens native to Arbitrum. Each mask is a one-of-a-kind piece of digital art, representing the soul of the <Logo weight={500} /> who created it.
                  </p>
                </div>
              </div>
            </div>
            <div className="hidden md:inline lg:inline xl:inline w-full md:w-5/12 pt-4 pb-20 mb-32 mr-auto ml-auto mt-12 lg:relative lg:-top-20">
              <div className="relative flex flex-col min-w-0 w-full mb-6 mt-48 md:mt-0">
                <PositionableImage
                  src={teaser0Pic}
                  className="max-w-100-px left-145-px -top-29-px"
                />
                <PositionableImage
                  src={teaser10Pic}
                  className="max-w-210-px left-60-px lg:left-260-px -top-160-px"
                />
                <PositionableImage
                  src={teaser2Pic}
                  className="max-w-180-px left-[-160px] top-[-135px]"
                />
                <PositionableImage
                  src={teaser3Pic}
                  className="max-w-200-px -left-50-px top-25-px"
                />
                <PositionableImage
                  src={teaser4Pic}
                  className="max-w-[380px] -left-20-px top-210-px"
                />
                <PositionableImage
                  src={teaser5Pic}
                  className="max-w-120-px left-195-px top-95-px"
                />
              </div>
            </div>
            
            <div className="z-2 w-full md:w-7/12 ml-auto mr-auto lg:mt-48 bg-black drop-shadow-sm glow-sm shadow-zinc-600 border-1 border-zinc-600">
              <div className="px-4 md:px-6 lg:px-12  shadow-inner shadow-zinc-900">                
                <h1 className="pt-4 text-5xl font-bold subpixel-antialiased text-aurora-500">Open Minting Now</h1>
                <ul className="list-inside list-disc">
                  <li className="pt-4 text-2xl leading-relaxed font-mono text-zinc-300">
                    <Logo weight={500} /> masks are more than just decorative - they are a sign of the power of those who decide the fate of Arbitrum, and a warning to those who would dare to stand in their way.
                  </li>
                  <li className="mt-4 text-2xl leading-relaxed font-mono text-zinc-300">
                    It was said that the <Logo weight={500} plural />' took great pleasure in hunting down those they deemed to be traitors, relishing in the opportunity to rid the world of their presence.
                  </li>
                  <li className="mt-4 text-2xl leading-relaxed font-mono text-white">
                    For those who collect the masks, the true power of the <Logo weight={500} plural /> would be theirs to wield.
                  </li>
                </ul>
                
                <ActionPanel data={staticData} className="mb-4"/>
              </div>
            </div>            
          </div>
        </div> 
        
      </section>
      <section className="overflow-hidden">
        <div className="z-2 container mx-auto pb-20 mt-10">
          <div className="z-2 flex-auto lg:w-8/12 p-0 mb-12 mr-auto ml-auto bg-black shadow-black glow-xl rounded-lg">
            <div className="z-2 relative flex flex-col min-w-0 w-full rounded-lg">
              <Image
                src={symbolWidePic}
                alt="background"
                className="static overflow-hidden object-scale-down object-center"
              />
              <p className="z-2 p-6 text-3xl leading-relaxed font-mono text-zinc-200">
                Honor these heroes of the past and claim your own <Logo weight={500} /> demon mask today. Show the world that you stand with the <Logo weight={500} /> in their fight against malicious transactions.
              </p>
            </div>
          </div>
        </div>
        <div className="z-[-1] absolute right-0 top-[3532px]  w-full h-[70vh] overflow-hidden">
          <Image src={bgPic} alt="background"
            className="z-0 w-full object-fill object-bottom align-middle shadow-neutral-900 shadow-inner overflow-hidden" />
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
        <span className="text-indigo-400">arbitrum</span>
        <span className="text-indigo-500">nft</span>
        <span className="text-indigo-600">ethereum</span>
        <span className="text-indigo-700">demon</span>
        <span className="text-indigo-800">mask</span>
        <span className="text-indigo-900">ai</span>
      </div>
      <FooterSmall />
      <ToastContainer
        position="bottom-right"
        theme="dark"
      />
    </>
  );
}