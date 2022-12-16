import clsx from 'clsx';
import React from "react";
import { Merriweather, Arsenal } from '@next/font/google';
const inter = Merriweather({
    weight: '900',
    subsets: ['latin'],
});
const atma = Arsenal({
    weight: '700',
    subsets: ['latin'],
});
// components

export default function Logo({weight, short}) {
    return (
        <span className={clsx([
            `text-fuchsia-${weight + 100}`, 
            "subpixel-antialiased", 
            atma.className,

            `hover:text-indigo-${weight - 100}`
        ])}>
        {!short && (
                <span className={clsx([
                    "subpixel-antialiased", 
                    "text-white", 
                    "align-sub"
                ])}>Arbi</span>
            )}<span className={clsx([
                `text-red-${weight}`,
                "subpixel-antialiased", 
                "font-bold", 
                "uppercase", 
                inter.className
                ])}>traitoors</span>
        </span>
    )
}