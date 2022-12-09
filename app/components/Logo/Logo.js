import React from "react";

// components

export default function Logo({weight, short}) {
    return (
        <span className={`text-indigo-${weight + 100} subpixel-antialiased hover:text-indigo-${weight - 100}`}>
        {!short && (
                <span className={`subpixel-antialiased font-merriweather`}>Arbi</span>
            )}<span className={`text-red-${weight} subpixel-antialiased font-bold uppercase font-graphik`}>traitoors</span>
        </span>
    )
}