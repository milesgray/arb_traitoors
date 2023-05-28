import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Logo from "../Logo/Logo";
import OwnedModal from "../OwnedModal/OwnedModal";
import { useProvider, useAccount } from 'wagmi';
import { getContract, getOwnedMetadata } from '../../lib/chain';
import { toast } from 'react-toastify';
import { getExplorerUrl, getOpenseaUrl, DEFAULT_CHAIN_ID } from '../../config/chains';
import { getContractAddress } from '../../config/contracts';
import MintButton from '../MintButton/MintButton';

function Nav({ children, ...props }) {
  return (
    <nav {...props}
      className={clsx([
        "top-0",
        "fixed",
        "rounded-b-sm",
        "z-50",
        "w-full",
        "flex",
        "flex-wrap",
        "items-center",
        "justify-between",
        "px-2",
        "py-3",
        "navbar-expand-lg",
        "bg-black",
        "shadow-gray-500",
        "glow-sm-long",
        "border-gray-600",
        "border-1",
        "lg:items-start",
        "xl:items-start"
      ])}>

      <div className={clsx([
        "container",
        "z-2",
        "px-4",
        "mx-auto",
        "flex",
        "flex-grow",
        "items-center",
        "content-center",
        "justify-between",
        "lg:mx-12",
        "xl:mx-18",
      ])}>
        {children}
      </div>
    </nav>
  )
}

function NavListItem({ children, ...props }) {
  return (
    <li {...props}
      className={clsx([
        "items-center",
        "hidden",
        "md:flex",
        "lg:flex",
        "xl:flex"
      ])}>
      {children}
    </li>
  )
}

function NavLink({ children, ...props }) {
  return (
    <a {...props}
      className={clsx([
        "hover:text-gray-500",
        "text-slate-100",
        "px-3",
        "py-4",
        "lg:py-2",
        "flex",
        "items-center",
        "text-xs",
        "uppercase",
        "font-bold"
      ])}
    >
      {children}
    </a>
  )
}

function NavLinkIcon({ iconClass }) {
  return (
    <i className={clsx([
      "text-white",
      "text-lg",
      iconClass,
      "leading-lg",
      "pb-1",
      "mr-1"
    ])} />
  )
}

export default function Navbar({ data}) {
  const [quantity, setOwnedQuantity] = useState(0);
  const [metadata, setOwnedMetadata] = useState();
  const [isOwnedOpen, setIsOwnedOpen] = useState(false);
  const [isLoading, setIsLoading] = useState();
  const { address } = useAccount();
  const provider = useProvider();
  const contract = getContract(provider);

  useEffect(() => {
    async function fetch() {
      if (address) {
        try {
          const tokens = await contract.tokensOfOwner(address);
          if (tokens?.length) {
            setOwnedQuantity(tokens.length);
            setIsLoading(true);
            try {
              toast.promise(getOwnedMetadata(address), {
                pending: "Loading your purchases, please wait...",
                success: "Purchase results Loaded!",
                error: `Could not load purchase results.`
              }).then((result) => {
                setOwnedMetadata(result);
                setIsLoading(false);
              });
            } catch (e) {
              console.error("[Owned] Error", e);
            }
          }
        } catch(e) {
          console.error("[Owned]", e);
        }
        
      }
    }
    fetch();
  }, [address]);

  function handleClick() {
    setIsOwnedOpen(true);
  }
  return (
    <>
    <Nav>
      <div className="w-auto static block justify-start">
        <Link href="/">
          <p className={clsx([
            "text-md",
            "font-bold",
            "leading-relaxed",
            "inline-block",
            "mr-4",
            "py-0",
            "whitespace-nowrap",
            "uppercase",
            "lg:text-lg",
            "xl:text-xl"
          ])}>
            <Logo weight={600} />
          </p>
        </Link>
      </div>
      <div
        className={clsx([
          "flex-grow",
          "items-right",
          "lg:flex",
          "lg:bg-opacity-0",
          "lg:shadow-none"
        ])}
        id="example-navbar-warning"
      >
        <ul className="flex flex-row list-none mr-auto">
          <NavListItem>
              <MintButton data={data} size="small" />
          </NavListItem>
          <NavListItem>
            <NavLink
              href="https://github.com/milesgray/arb_traitoors"
              target="_blank"
            >
              <NavLinkIcon iconClass={"fab fa-github"} />
              Code
            </NavLink>
          </NavListItem>
          <NavListItem>
            <NavLink
                href={`${getExplorerUrl(DEFAULT_CHAIN_ID)}address/${getContractAddress(DEFAULT_CHAIN_ID, "NFT")}`}
              target="_blank"
            >
              <NavLinkIcon iconClass={"fa fa-gears"} />
              Contract
            </NavLink>
          </NavListItem>
          <NavListItem>
            <NavLink
                href={`${getOpenseaUrl(DEFAULT_CHAIN_ID)}collection/arbitraitoors`}
                target="_blank"
            >
              <NavLinkIcon iconClass={"fa fa-globe"} />
              Collection
            </NavLink>
          </NavListItem>
          {(metadata) && (
              <NavListItem>
                <NavLink                  
                  onClick={handleClick}
                >
                  <NavLinkIcon iconClass={"fa fa-star"} />
                  Owned
                </NavLink>
              </NavListItem>
          )}
        </ul>
      </div>
      <div className="flex">
        <ul className="flex flex-row list-none lg:ml-auto">
          <li className="flex items-center">
            <ConnectButton />
          </li>
        </ul>
      </div>
    </Nav>
      {(metadata) && (
        <OwnedModal
          isOpen={isOwnedOpen}
          setIsOpen={setIsOwnedOpen}
          isLoading={isLoading}
          quantity={quantity}
          metadata={metadata}          
        />
      )}
    </>
  );
}
