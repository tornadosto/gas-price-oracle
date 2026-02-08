var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import BigNumber from 'bignumber.js';
import { ChainId, NETWORKS } from '../../config';
import { NodeJSCache } from '../../services';
import { findMax, fromNumberToHex, fromWeiToGwei, getMedian } from '../../utils';
import { BG_ZERO, DEFAULT_BLOCK_DURATION, PERCENT_MULTIPLIER } from '../../constants';
import { DEFAULT_PRIORITY_FEE, PRIORITY_FEE_INCREASE_BOUNDARY, FEE_HISTORY_BLOCKS, FEE_HISTORY_PERCENTILE } from './constants';
// !!! MAKE SENSE ALL CALCULATIONS IN GWEI !!!
export class Eip1559GasPriceOracle {
    constructor(_a) {
        var _b, _c;
        var { fetcher } = _a, options = __rest(_a, ["fetcher"]);
        this.configuration = {
            shouldCache: false,
            chainId: ChainId.MAINNET,
            fallbackGasPrices: undefined,
            minPriority: DEFAULT_PRIORITY_FEE,
            blockTime: DEFAULT_BLOCK_DURATION,
            blocksCount: NETWORKS[ChainId.MAINNET].blocksCount,
            percentile: NETWORKS[ChainId.MAINNET].percentile,
        };
        this.FEES_KEY = (chainId) => `estimate-fee-${chainId}`;
        this.fetcher = fetcher;
        const chainId = (options === null || options === void 0 ? void 0 : options.chainId) || this.configuration.chainId;
        this.configuration.blocksCount = ((_b = NETWORKS[chainId]) === null || _b === void 0 ? void 0 : _b.blocksCount) || FEE_HISTORY_BLOCKS;
        this.configuration.percentile = ((_c = NETWORKS[chainId]) === null || _c === void 0 ? void 0 : _c.percentile) || FEE_HISTORY_PERCENTILE;
        if (options) {
            this.configuration = Object.assign(Object.assign({}, this.configuration), options);
        }
        this.cache = new NodeJSCache({ stdTTL: this.configuration.blockTime, useClones: false });
    }
    estimateFees(fallbackGasPrices) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cacheKey = this.FEES_KEY(this.configuration.chainId);
                const cachedFees = yield this.cache.get(cacheKey);
                if (cachedFees) {
                    return cachedFees;
                }
                const { data: latestBlock } = yield this.fetcher.makeRpcCall({
                    method: 'eth_getBlockByNumber',
                    params: ['latest', false],
                });
                if (!latestBlock.result.baseFeePerGas) {
                    throw new Error('An error occurred while fetching current base fee, falling back');
                }
                const baseFee = fromWeiToGwei(latestBlock.result.baseFeePerGas);
                const blockCount = fromNumberToHex(this.configuration.blocksCount);
                const rewardPercentiles = [this.configuration.percentile];
                const { data } = yield this.fetcher.makeRpcCall({
                    method: 'eth_feeHistory',
                    params: [blockCount, 'latest', rewardPercentiles],
                });
                const fees = yield this.calculateFees({ baseFee, feeHistory: data.result });
                if (this.configuration.shouldCache) {
                    yield this.cache.set(cacheKey, fees);
                }
                return fees;
            }
            catch (err) {
                if (fallbackGasPrices) {
                    return fallbackGasPrices;
                }
                if (this.configuration.fallbackGasPrices) {
                    return this.configuration.fallbackGasPrices;
                }
                throw err;
            }
        });
    }
    calculatePriorityFeeEstimate(feeHistory) {
        var _a;
        if (!feeHistory) {
            return null;
        }
        const rewards = (_a = feeHistory.reward) === null || _a === void 0 ? void 0 : _a.map((r) => fromWeiToGwei(r[0])).filter((r) => r.isGreaterThan(0)).sort();
        if (!rewards) {
            return null;
        }
        // Calculate percentage increases from between ordered list of fees
        const percentageIncreases = rewards.reduce((acc, curr, i, arr) => {
            if (i !== arr.length - 1) {
                const next = arr[i + 1];
                const percentageIncrease = next.minus(curr).dividedBy(curr).multipliedBy(PERCENT_MULTIPLIER);
                acc.push(percentageIncrease);
            }
            return acc;
        }, []);
        const { highest, index } = findMax(percentageIncreases);
        // If we have big increased in value, we could be considering "outliers" in our estimate
        // Skip the low elements and take a new median
        const values = highest.isGreaterThanOrEqualTo(PRIORITY_FEE_INCREASE_BOUNDARY) && index >= getMedian(rewards)
            ? rewards.slice(index)
            : rewards;
        return values[getMedian(values)];
    }
    getPriorityFromChain(feeHistory) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { data } = yield this.fetcher.makeRpcCall({
                    method: 'eth_maxPriorityFeePerGas',
                    params: [],
                });
                return fromWeiToGwei(data.result);
            }
            catch (err) {
                return this.calculatePriorityFeeEstimate(feeHistory);
            }
        });
    }
    calculateFees({ baseFee, feeHistory }) {
        return __awaiter(this, void 0, void 0, function* () {
            const estimatedPriorityFee = yield this.getPriorityFromChain(feeHistory);
            const { highest: maxPriorityFeePerGas } = findMax([
                estimatedPriorityFee !== null && estimatedPriorityFee !== void 0 ? estimatedPriorityFee : BG_ZERO,
                new BigNumber(this.configuration.minPriority),
            ]);
            const maxFeePerGas = baseFee.plus(maxPriorityFeePerGas);
            if (this.checkIsGreaterThanMax(maxFeePerGas) || this.checkIsGreaterThanMax(maxPriorityFeePerGas)) {
                throw new Error('Estimated gas fee was much higher than expected, erroring');
            }
            return {
                baseFee: baseFee.toNumber(),
                maxFeePerGas: maxFeePerGas.toNumber(),
                maxPriorityFeePerGas: maxPriorityFeePerGas.toNumber(),
            };
        });
    }
    checkIsGreaterThanMax(value) {
        var _a;
        return value.isGreaterThanOrEqualTo((_a = NETWORKS[this.configuration.chainId]) === null || _a === void 0 ? void 0 : _a.maxGasPrice) || false;
    }
}
//# sourceMappingURL=eip1559.js.map