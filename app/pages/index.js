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
import { useAccount, useProvider, isAddress } from 'wagmi';

import { MintButton } from "../components/MintButton";
import { Remaining, Balance } from "../components/Data";
import IndexNavbar from "../components/Navbars/IndexNavbar.js";
import FooterSmall from "../components/Footers/FooterSmall.js";
import Logo from "../components/Logo/Logo.js";
import { Story } from "../components/Story";
import { ToastContainer } from 'react-toastify';

import { getContract, getStaticData } from "../system/chain";
import { useAccountModal, } from '@rainbow-me/rainbowkit';
import 'react-toastify/dist/ReactToastify.min.css';

const contextClass = {
  success: "bg-blue-600",
  error: "bg-red-600",
  info: "bg-gray-600",
  warning: "bg-orange-400",
  default: "bg-indigo-600",
  dark: "bg-white-600 font-gray-300",
};

export default function Index() {
  const [STATIC_DATA, setSTATIC_DATA] = useState();
  const { isConnected } = useAccountModal();
  const provider = useProvider();
  const contract = getContract(provider);

  useEffect(() => {
    if (!contract) return;
    getStaticData(contract).then((data) => {
      setSTATIC_DATA(data);
    });
  }, [isConnected]);
  
  
  return (
    <>
      <IndexNavbar fixed data={STATIC_DATA} />
      <section className="header mt-6 items-center flex ">
        <div className="container mx-auto items-center flex flex-wrap  z-4">
          <div className="w-full z-2 mt-10 mb-20 bg-gray-900 bg-opacity-90 shadow-red-500 glow-sm rounded-sm md:w-8/12 lg:w-6/12 xl:w-6/12 px-4 m-0">
            <div className="py-0 mt-4 sm:pt-0 lg:pt-0 lg:-mt-2">
              <h2 className="font-semibold text-4xl lg:text-max pointer-events-none lg:relative lg:-top-4 lg:-left-10">
                <Logo weight={500} />
              </h2>
              <h3 className="text-lg font-semibold font-mono text-slate-600 uppercase">
                join the movement
              </h3>
              <p className="mt-4 text-xl leading-relaxed font-mono text-slate-300">
                In a dark and desolate world, where the skies are choked with smog and the streets are ruled by violence and fear, a group of rebels has arisen. These rebels are known as the <Logo weight={500} />, and they are united by their rejection of the oppressive regime that holds sway over their land.
              </p>
              <p className="mt-4 text-xl leading-relaxed font-mono text-slate-300">
                Now, the <Logo weight={500} /> have decided to share their masks with the world, and they are offering them as non-fungible tokens on the Arbitrum platform. Each mask is a one-of-a-kind piece of digital art, representing the soul of the ArbTraitor who created it.
              </p>
              <p className="mt-4 text-xl leading-relaxed font-mono text-slate-300">
                Join the rebellion and claim your own <Logo weight={500} /> demon mask today. Show the world that you stand with the ArbTraitors in their fight for freedom and justice.
              </p>
              <p className="mt-2 lg:mt-4 text-lg leading-relaxed text-slate-300">
                <Remaining /> available, <Balance /> owned
              </p>              
              <div className="ml-6 mt-4 pb-4">
                <MintButton data={STATIC_DATA} />
              </div>
            </div>
          </div>
          <div className="w-full lg:w-4/12 pt-4 pb-2 mb-12 mr-auto ml-auto z-10">
            <div className="z-10 relative flex flex-row min-w-0 w-full mb-2 mt-4">
              <div className="flex-col">
                <Image
                  alt="A Demon Mask"
                  palceholder="empty"
                  src={teaser6Pic}
                  className="w-full align-middle rounded shadow-lg max-w-[200px]"
                />
                <Image
                  alt="A Demon Mask"
                  palceholder="empty"
                  src={teaser7Pic}
                  className="w-full align-middle rounded shadow-lg max-w-[200px]"
                />
                <Image
                  alt="A Demon Mask"
                  palceholder="empty"
                  src={teaser8Pic}
                  className="w-full align-middle rounded shadow-lg max-w-[200px]"
                />
                <Image
                  alt="A Demon Mask"
                  palceholder="empty"
                  src={teaser1Pic}
                  className="w-full align-middle rounded shadow-lg max-w-[200px]"
                />
                <Image
                  alt="A Demon Mask"
                  palceholder="empty"
                  src={teaser13Pic}
                  className="w-full align-middle rounded shadow-lg max-w-[200px]"
                />
              </div>
              <div className="flex-col">
                <Image
                  alt="A Demon Mask"
                  palceholder="empty"
                  src={teaser9Pic}
                  className="w-full align-middle rounded shadow-lg max-w-[200px]"
                />
                <Image
                  alt="A Demon Mask"
                  palceholder="empty"
                  src={teaser11Pic}
                  className="w-full align-middle rounded shadow-lg max-w-[200px]"
                />
                <Image
                  alt="A Demon Mask"
                  palceholder="empty"
                  src={teaser12Pic}
                  className="w-full align-middle rounded shadow-lg max-w-[200px] left-[420px] top-[200px]"
                />
                <Image
                  alt="A Demon Mask"
                  palceholder="empty"
                  src={teaser14Pic}
                  className="w-full align-middle rounded shadow-lg max-w-[200px]"
                />
                <Image
                  alt="A Demon Mask"
                  palceholder="empty"
                  src={teaser15Pic}
                  className="w-full align-middle rounded shadow-lg max-w-[200px] left-[420px] top-[200px]"
                />
              </div>
            </div>
          </div>
        </div>
        
      </section>

      <section className="hidden lg:flex md:flex xl:flex mt-8 lg:mt-48 md:mt-40 lg:pb-40 relative bg-slate-800">
        <div
          className="-mt-20 top-0 bottom-auto left-0 right-0 w-full absolute h-20"
          style={{ transform: "translateZ(0)" }}
        >
          <svg
            className="absolute bottom-0 overflow-hidden text-slate-800"
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


        <div className="hidden lg:flex  container mx-auto pb-20">
          <div className="flex flex-wrap items-center">
            <div className="w-full md:w-4/12 px-4 lg:px-12 md:px-4 ml-auto mr-auto lg:mt-48">
              <div className="pt-5 flex flex-row lg:flex-col">
                <div className="text-red-400 p-3 mr-2 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-slate-800">
                  <i className="fas fa-wand-sparkles text-xl"></i>
                </div>
                <h3 className="text-3xl my-2 font-semibold leading-normal">
                  Traits
                </h3>
              </div>
              <div className="px-0">
                <p className="text-xl leading-relaxed mt-0 mb-4 text-slate-300">
                  Each <Logo weight={500} /> has their own unique demon mask, crafted with care and infused with their own style and vision. Some are sleek and elegant, while others are grotesque and terrifying. But all of them are powerful symbols of the ArbTraitors' rebellion against the forces of oppression.
                </p>
                <div className="block pb-6">
                  <span className="text-xs font-semibold inline-block py-1 px-2 rounded-full text-red-500 bg-gray-800 uppercase last:mr-0 mr-2 mt-2">
                    Species
                  </span>
                  <span className="text-xs font-semibold inline-block py-1 px-2 rounded-full text-red-500 bg-gray-800 uppercase last:mr-0 mr-2 mt-2">
                    Power
                  </span>
                  <span className="text-xs font-semibold inline-block py-1 px-2 rounded-full text-red-500 bg-gray-800 uppercase last:mr-0 mr-2 mt-2">
                    Age
                  </span>
                  <span className="text-xs font-semibold inline-block py-1 px-2 rounded-full text-red-500 bg-gray-800 uppercase last:mr-0 mr-2 mt-2">
                    Shape
                  </span>
                  <span className="text-xs font-semibold inline-block py-1 px-2 rounded-full text-red-500 bg-gray-800 uppercase last:mr-0 mr-2 mt-2">
                    Season
                  </span>
                  <span className="text-xs font-semibold inline-block py-1 px-2 rounded-full text-red-500 bg-gray-800 uppercase last:mr-0 mr-2 mt-2">
                    Style
                  </span>
                  <span className="text-xs font-semibold inline-block py-1 px-2 rounded-full text-red-500 bg-gray-800 uppercase last:mr-0 mr-2 mt-2">
                    Flavor
                  </span>
                </div>
              </div>
            </div>

            <div className="w-full md:w-5/12 pt-4 pb-20 mb-32 mr-auto ml-auto mt-12 lg:relative lg:-top-20">
              <div className="relative flex flex-col min-w-0 w-full mb-6 mt-48 md:mt-0">
                <Image
                  alt="A Demon Mask"
                  palceholder="empty"
                  src={teaser0Pic}
                  className="w-full align-middle rounded absolute shadow-lg max-w-100-px left-145-px -top-29-px z-3"
                />
                <Image
                  alt="A Demon Mask"
                  palceholder="empty"
                  src={teaser10Pic}
                  className="w-full align-middle rounded-lg absolute shadow-lg max-w-210-px left-60-px lg:left-260-px -top-160-px"
                />
                <Image
                  alt="A Demon Mask"
                  palceholder="empty"
                  src={teaser2Pic}
                  className="w-full align-middle rounded-lg absolute shadow-lg max-w-180-px left-[-160px] top-[-135px] z-2"
                />
                <Image
                  alt="A Demon Mask"
                  palceholder="empty"
                  src={teaser3Pic}
                  className="w-full align-middle rounded-lg absolute shadow-2xl max-w-200-px -left-50-px top-25-px"
                />
                <Image
                  alt="A Demon Mask"
                  palceholder="empty"
                  src={teaser4Pic}
                  className="hidden lg:inline w-full align-middle rounded absolute shadow-lg max-w-[380px] -left-20-px top-210-px"
                />
                <Image
                  alt="A Demon Mask"
                  palceholder="empty"
                  src={teaser5Pic}
                  className="w-full align-middle rounded absolute shadow-xl max-w-120-px left-195-px top-95-px"
                />
              </div>
            </div>
          </div>

        </div>
      </section>
      
      <section className="pb-16 bg-slate-700 relative pt-2">
        <div
          className="lg:-mt-20 top-0 bottom-auto left-0 right-0 w-full absolute h-20"
          style={{ transform: "translateZ(0)" }}
        >
          <svg
            className="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon
              className="text-slate-700 fill-current"
              points="2560 0 2560 100 0 100"
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
      <FooterSmall/>
      <ToastContainer
        position="bottom-right"
        theme="dark"
      />
    </>
  );
}