import clsx from 'clsx';
import React from "react";

export default function Logo({ weight, short, sub, plural }) {
    return (
        <span className={clsx([
            "subpixel-antialiased"
        ])}>
            {!short && (
                <span className={clsx([
                    "text-white",
                    "font-oxanium", 
                    "uppercase",                                       
                    sub ? "align-sub" : "align-middle"
                ])}>Arbi</span>
            )}<span className={clsx([
                `text-red-${weight}`,
                "font-graphik",
                "font-bold",
                "lowercase",                
            ])}>traitor{plural && (<span>s</span>)}</span>
        </span>
    )
}