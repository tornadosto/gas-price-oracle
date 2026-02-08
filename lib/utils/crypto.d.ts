import BigNumber from 'bignumber.js';
declare const toGwei: (amount: number | string | BigNumber) => BigNumber;
declare const fromWeiToGwei: (amount: number | string | BigNumber) => BigNumber;
declare const fromNumberToHex: (amount: number | string | BigNumber) => string;
declare const fromGweiToWeiHex: (value: number) => string;
export { toGwei, fromWeiToGwei, fromGweiToWeiHex, fromNumberToHex };
