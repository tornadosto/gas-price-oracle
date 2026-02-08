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
import axios from 'axios';
import BigNumber from 'bignumber.js';
import { ChainId, NETWORKS } from '../../config';
import { NodeJSCache } from '../../services';
import { resolvePropertyPath } from '../../utils';
import { GWEI, DEFAULT_TIMEOUT, GWEI_PRECISION, DEFAULT_BLOCK_DURATION } from '../../constants';
import { MULTIPLIERS, DEFAULT_GAS_PRICE } from './constants';
export class LegacyGasPriceOracle {
    constructor(_a) {
        var _b;
        var { fetcher } = _a, options = __rest(_a, ["fetcher"]);
        this.onChainOracles = {};
        this.offChainOracles = {};
        this.configuration = {
            shouldCache: false,
            chainId: ChainId.MAINNET,
            timeout: DEFAULT_TIMEOUT,
            blockTime: DEFAULT_BLOCK_DURATION,
            defaultRpc: NETWORKS[ChainId.MAINNET].rpcUrl,
            fallbackGasPrices: LegacyGasPriceOracle.getMultipliedPrices(NETWORKS[ChainId.MAINNET].defaultGasPrice),
        };
        this.LEGACY_KEY = (chainId) => `legacy-fee-${chainId}`;
        this.fetcher = fetcher;
        if (options) {
            this.configuration = Object.assign(Object.assign({}, this.configuration), options);
        }
        const { defaultGasPrice } = NETWORKS[ChainId.MAINNET];
        const fallbackGasPrices = this.configuration.fallbackGasPrices || LegacyGasPriceOracle.getMultipliedPrices(defaultGasPrice);
        this.configuration.fallbackGasPrices = LegacyGasPriceOracle.normalize(fallbackGasPrices);
        const network = (_b = NETWORKS[this.configuration.chainId]) === null || _b === void 0 ? void 0 : _b.oracles;
        if (network) {
            this.offChainOracles = Object.assign({}, network.offChainOracles);
            this.onChainOracles = Object.assign({}, network.onChainOracles);
        }
        this.cache = new NodeJSCache({ stdTTL: this.configuration.blockTime, useClones: false });
    }
    static getMedianGasPrice(gasPrices) {
        const medianGasPrice = DEFAULT_GAS_PRICE;
        const results = {
            instant: [],
            fast: [],
            standard: [],
            low: [],
        };
        for (const gasPrice of gasPrices) {
            results.instant.push(gasPrice.instant);
            results.fast.push(gasPrice.fast);
            results.standard.push(gasPrice.standard);
            results.low.push(gasPrice.low);
        }
        for (const type of Object.keys(medianGasPrice)) {
            const allPrices = results[type].sort((a, b) => a - b);
            if (allPrices.length === 1) {
                medianGasPrice[type] = allPrices[0];
                continue;
            }
            else if (allPrices.length === 0) {
                continue;
            }
            const isEven = allPrices.length % 2 === 0;
            const middle = Math.floor(allPrices.length / 2);
            medianGasPrice[type] = isEven ? (allPrices[middle - 1] + allPrices[middle]) / 2.0 : allPrices[middle];
        }
        return LegacyGasPriceOracle.normalize(medianGasPrice);
    }
    static getMultipliedPrices(gasPrice) {
        return {
            instant: gasPrice * MULTIPLIERS.instant,
            fast: gasPrice * MULTIPLIERS.fast,
            standard: gasPrice * MULTIPLIERS.standard,
            low: gasPrice * MULTIPLIERS.low,
        };
    }
    static normalize(_gas) {
        const format = {
            groupSeparator: '',
            decimalSeparator: '.',
        };
        const gas = Object.assign({}, _gas);
        for (const type of Object.keys(gas)) {
            gas[type] = Number(new BigNumber(gas[type]).toFormat(GWEI_PRECISION, format));
        }
        return gas;
    }
    static getCategorize(gasPrice) {
        return LegacyGasPriceOracle.normalize(LegacyGasPriceOracle.getMultipliedPrices(gasPrice));
    }
    static getGasPriceFromResponse(payload) {
        const { response, fetcherName, denominator = GWEI } = payload;
        let fastGasPrice = new BigNumber(response);
        if (fastGasPrice.isZero()) {
            throw new Error(`${fetcherName} provides corrupted values`);
        }
        fastGasPrice = fastGasPrice.div(denominator);
        return fastGasPrice.toNumber();
    }
    addOffChainOracle(oracle) {
        this.offChainOracles[oracle.name] = oracle;
    }
    addOnChainOracle(oracle) {
        this.onChainOracles[oracle.name] = oracle;
    }
    removeOnChainOracle(name) {
        delete this.onChainOracles[name];
    }
    removeOffChainOracle(name) {
        delete this.offChainOracles[name];
    }
    fetchGasPricesOnChain() {
        return __awaiter(this, void 0, void 0, function* () {
            for (const oracle of Object.values(this.onChainOracles)) {
                const { name, callData, contract, denominator, rpc } = oracle;
                try {
                    const response = yield this.fetcher.makeRpcCall({
                        rpc,
                        method: 'eth_call',
                        params: [{ data: callData, to: contract }, 'latest'],
                    });
                    if (response.status === 200) {
                        return LegacyGasPriceOracle.getGasPriceFromResponse({
                            denominator,
                            fetcherName: `${name} oracle`,
                            response: response.data.result,
                        });
                    }
                    throw new Error(`Fetch gasPrice from ${name} oracle failed. Trying another one...`);
                }
                catch (e) {
                    console.error(e.message);
                }
            }
            throw new Error('All oracles are down. Probably a network error.');
        });
    }
    fetchGasPriceFromRpc() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { status, data } = yield this.fetcher.makeRpcCall({
                    params: [],
                    method: 'eth_gasPrice',
                });
                if (status === 200) {
                    return LegacyGasPriceOracle.getGasPriceFromResponse({
                        fetcherName: 'Default RPC',
                        response: data.result,
                    });
                }
                throw new Error(`Fetch gasPrice from default RPC failed..`);
            }
            catch (e) {
                console.error(e.message);
                throw new Error('Default RPC is down. Probably a network error.');
            }
        });
    }
    fetchGasPricesOffChain(shouldGetMedian = true) {
        return __awaiter(this, void 0, void 0, function* () {
            if (shouldGetMedian) {
                return yield this.fetchMedianGasPriceOffChain();
            }
            for (const oracle of Object.values(this.offChainOracles)) {
                try {
                    return yield this.askOracle(oracle);
                }
                catch (e) {
                    console.info(`${oracle} has error - `, e.message);
                    continue;
                }
            }
            throw new Error('All oracles are down. Probably a network error.');
        });
    }
    fetchMedianGasPriceOffChain() {
        return __awaiter(this, void 0, void 0, function* () {
            const promises = [];
            for (const oracle of Object.values(this.offChainOracles)) {
                promises.push(this.askOracle(oracle));
            }
            const settledPromises = yield Promise.allSettled(promises);
            const allGasPrices = settledPromises.reduce((acc, result) => {
                if (result.status === 'fulfilled') {
                    acc.push(result.value);
                    return acc;
                }
                return acc;
            }, []);
            if (allGasPrices.length === 0) {
                throw new Error('All oracles are down. Probably a network error.');
            }
            return LegacyGasPriceOracle.getMedianGasPrice(allGasPrices);
        });
    }
    gasPrices(fallbackGasPrices, shouldGetMedian = true) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.lastGasPrice) {
                this.lastGasPrice = fallbackGasPrices || this.configuration.fallbackGasPrices;
            }
            const cacheKey = this.LEGACY_KEY(this.configuration.chainId);
            const cachedFees = yield this.cache.get(cacheKey);
            if (cachedFees) {
                return cachedFees;
            }
            if (Object.keys(this.offChainOracles).length > 0) {
                try {
                    this.lastGasPrice = yield this.fetchGasPricesOffChain(shouldGetMedian);
                    if (this.configuration.shouldCache) {
                        yield this.cache.set(cacheKey, this.lastGasPrice);
                    }
                    return this.lastGasPrice;
                }
                catch (e) {
                    console.error('Failed to fetch gas prices from offchain oracles...');
                }
            }
            if (Object.keys(this.onChainOracles).length > 0) {
                try {
                    const fastGas = yield this.fetchGasPricesOnChain();
                    this.lastGasPrice = LegacyGasPriceOracle.getCategorize(fastGas);
                    if (this.configuration.shouldCache) {
                        yield this.cache.set(cacheKey, this.lastGasPrice);
                    }
                    return this.lastGasPrice;
                }
                catch (e) {
                    console.error('Failed to fetch gas prices from onchain oracles...');
                }
            }
            try {
                const fastGas = yield this.fetchGasPriceFromRpc();
                this.lastGasPrice = LegacyGasPriceOracle.getCategorize(fastGas);
                if (this.configuration.shouldCache) {
                    yield this.cache.set(cacheKey, this.lastGasPrice);
                }
                return this.lastGasPrice;
            }
            catch (e) {
                console.error('Failed to fetch gas prices from default RPC. Last known gas will be returned');
            }
            return LegacyGasPriceOracle.normalize(this.lastGasPrice);
        });
    }
    askOracle(oracle) {
        return __awaiter(this, void 0, void 0, function* () {
            const { url, name, denominator, lowPropertyName, fastPropertyName, instantPropertyName, standardPropertyName, additionalDataProperty, } = oracle;
            const response = yield axios.get(url, { timeout: this.configuration.timeout });
            if (response.status === 200) {
                const gas = resolvePropertyPath(response.data, additionalDataProperty);
                if (Number(resolvePropertyPath(gas, fastPropertyName)) === 0) {
                    throw new Error(`${name} oracle provides corrupted values`);
                }
                const gasPrices = {
                    instant: parseFloat(resolvePropertyPath(gas, instantPropertyName)) / denominator,
                    fast: parseFloat(resolvePropertyPath(gas, fastPropertyName)) / denominator,
                    standard: parseFloat(resolvePropertyPath(gas, standardPropertyName)) / denominator,
                    low: parseFloat(resolvePropertyPath(gas, lowPropertyName)) / denominator,
                };
                return LegacyGasPriceOracle.normalize(gasPrices);
            }
            else {
                throw new Error(`Fetch gasPrice from ${name} oracle failed. Trying another one...`);
            }
        });
    }
}
//# sourceMappingURL=legacy.js.map