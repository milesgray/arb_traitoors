import React from 'react';

import { Conditional } from '../Common';


export default function RemainingBalance({ remaining, balance }) {
    
    
    console.debug(`[RemainingBalance] `, remaining, balance);
    return (
        <>
            <Conditional value={remaining} /> available, <Conditional value={balance} /> owned.
        </>        
    )
}