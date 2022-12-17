import clsx from 'clsx';
import React from "react";

export default function Logo({ weight, short, sub }) {
    return (
        <span className={clsx([
            `text-fuchsia-${weight + 100}`,
            "subpixel-antialiased",
            "font-arsenal",
            `hover:text-indigo-${weight - 100}`
        ])}>
            {!short && (
                <span className={clsx([
                    "subpixel-antialiased",
                    "text-white",
                    sub ? "align-sub" : "align-middle"
                ])}>Arbi</span>
            )}<span className={clsx([
                `text-red-${weight}`,
                "subpixel-antialiased",
                "font-bold",
                "uppercase",
                "font-graphik"
            ])}>traitoors</span>
        </span>
    )
}