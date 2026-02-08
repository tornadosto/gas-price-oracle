import BigNumber from 'bignumber.js';
import { BG_ZERO, PERCENT_MULTIPLIER } from '../constants';
import { toGwei } from './crypto';
const findMax = (values) => {
    return values.reduce((acc, curr, index) => {
        const isGreaterThanAcc = curr.isGreaterThan(acc.highest);
        if (isGreaterThanAcc) {
            acc.highest = curr;
            acc.index = index;
        }
        return acc;
    }, {
        highest: BG_ZERO,
        index: 0,
    });
};
const getMedian = (arr) => {
    return Math.floor(arr.length / 2);
};
const round = (value) => {
    return new BigNumber(value).decimalPlaces(0, 2);
};
const roundGwei = (value) => {
    return toGwei(value).decimalPlaces(0, 2);
};
const bumpOnPercent = (value, bumpPercent) => {
    return value + (value * bumpPercent) / PERCENT_MULTIPLIER;
};
export { findMax, getMedian, round, roundGwei, bumpOnPercent };
//# sourceMappingURL=math.js.map