import BigNumber from 'bignumber.js';
import { GWEI, GWEI_PRECISION } from '../constants';
const toGwei = (amount) => {
    return new BigNumber(amount).multipliedBy(GWEI).decimalPlaces(GWEI_PRECISION);
};
const fromWeiToGwei = (amount) => {
    return new BigNumber(amount).dividedBy(GWEI).decimalPlaces(GWEI_PRECISION);
};
const fromNumberToHex = (amount) => {
    return `0x${new BigNumber(amount).toString(16)}`;
};
const fromGweiToWeiHex = (value) => {
    return fromNumberToHex(new BigNumber(value).multipliedBy(GWEI).decimalPlaces(0));
};
export { toGwei, fromWeiToGwei, fromGweiToWeiHex, fromNumberToHex };
//# sourceMappingURL=crypto.js.map