import { ethers } from 'ethers';

const DECIMALS = 18;

const roundEth = (value) => {
    const rounded = ethers.utils.formatUnits(value, DECIMALS);

    return Number(rounded) < 0.0001 && Number(rounded) !== 0
        ? '< 0.0001'
        : Number(Number(rounded).toFixed(4));
};

const truncateAddress = (address) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

const toInt = (value) => {
    return ethers.utils.formatUnits(value, 0);
}

const toEth = (value) => {
    return parseFloat(formatEther(balance)).toPrecision(4);
}

export { roundEth, toInt, toEth, truncateAddress };