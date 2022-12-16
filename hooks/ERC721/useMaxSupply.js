import { useState } from 'react';

export default function useMaxSupply() {
    const [max, setMax] = useState();
    return max;
}