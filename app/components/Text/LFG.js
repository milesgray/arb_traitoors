import clsx from 'clsx';
import React from "react";

export default function LFG({ weight=600, count=1}) {
    return (
        <p className={clsx([
            "mt-4", 
            "text-2xl", 
            "font-mono", 
            "text-zinc-100", 
            "p-8"
        ])}>
        {[...Array(count)].map((e, i) => {
            return (
            <>
                <i className={clsx([
                    "fab fa-l", 
                    "p-2", 
                    `text-red-${weight}`
                ])} />
                <i className={clsx([
                    "fab fa-f", 
                    "p-2", 
                    `text-ruby-magma-${weight}`
                ])} />
                <i className={clsx([
                    "fab fa-g", 
                    "p-2", 
                    `text-crimson-tide-${weight}`
                ])} />
                <i className={clsx([
                    "fa fa-bolt", 
                    "p-2" 
                    `text-aurora-${weight}`
                ])} />
            </>
            )})
        }
        </p>
    )
}