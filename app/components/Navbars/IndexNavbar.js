import React from "react";
import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";

import Logo from "../Logo/Logo";
import {
  NETWORK_NAME,
  CRYPTREES_ADDRESS,
} from '../../config'
export default function Navbar({ data, remaining }) {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  return (
    <>
      <nav className="top-0 fixed rounded-b-full z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg bg-black shadow-gray-500 glow-sm-long border-gray-600 border-2">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-auto static block justify-start">
            <Link href="/">
              <p className="text-md font-bold leading-relaxed inline-block mr-4 py-0 whitespace-nowrap uppercase">
                <Logo weight={600} />
              </p>

            </Link>

          </div>
          <div
            className="lg:flex flex-grow items-center bg-regal-blue lg:bg-opacity-0 lg:shadow-none"
            id="example-navbar-warning"
          >
            <ul className="flex flex-row list-none mr-auto">    
              <li className="items-center hidden md:flex lg:flex xl:flex">
                <a
                  className="hover:text-gray-500 text-slate-100 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                  href="https://github.com/milesgray/arb_traitoors"
                  target="_blank"
                >
                  <i className="text-white fab fa-github text-lg leading-lg pb-1 mr-1" />
                  Code
                </a>
              </li>
              <li className="items-center hidden md:flex lg:flex xl:flex">
                <a
                  className="hover:text-gray-500 text-slate-100 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                  href={`https://arbiscan.io/address/0x4EEFeFD5fF983C85D5DDDc398366b6Db2fa466F1`}
                  target="_blank"
                >
                  <i className="text-white fa fa-gears text-lg leading-lg pb-1 mr-1" />
                  Contract
                </a>
              </li>
            </ul>
          </div>
          <div className="flex">
            <ul className="flex flex-row list-none lg:ml-auto">
              <li className="flex items-center">
                <ConnectButton />
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
