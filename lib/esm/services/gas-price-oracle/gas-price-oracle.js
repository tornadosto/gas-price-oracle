var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ChainId, NETWORKS } from '../../config';
import { DEFAULT_TIMEOUT } from '../../constants';
import { bumpOnPercent, fromGweiToWeiHex } from '../../utils';
import { RpcFetcher, LegacyGasPriceOracle, Eip1559GasPriceOracle, } from '../../services';
export class GasPriceOracle {
    constructor(options) {
        var _a;
        const timeout = (_a = options === null || options === void 0 ? void 0 : options.timeout) !== null && _a !== void 0 ? _a : DEFAULT_TIMEOUT;
        this.chainId = (options === null || options === void 0 ? void 0 : options.chainId) || ChainId.MAINNET;
        const defaultRpc = (options === null || options === void 0 ? void 0 : options.defaultRpc) || NETWORKS[this.chainId].rpcUrl;
        this.fetcher = new RpcFetcher(defaultRpc, timeout);
        const { gasPrices, estimated } = (options === null || options === void 0 ? void 0 : options.fallbackGasPrices) || {};
        const payload = Object.assign(Object.assign({}, options), { fetcher: this.fetcher });
        this.legacy = new LegacyGasPriceOracle(Object.assign(Object.assign({}, payload), { fallbackGasPrices: gasPrices }));
        this.eip1559 = new Eip1559GasPriceOracle(Object.assign(Object.assign({}, payload), { fallbackGasPrices: estimated }));
    }
    gasPrices(payload = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const { fallbackGasPrices, shouldGetMedian, isLegacy = false } = payload;
            if (isLegacy) {
                return yield this.legacy.gasPrices(fallbackGasPrices === null || fallbackGasPrices === void 0 ? void 0 : fallbackGasPrices.gasPrices, shouldGetMedian);
            }
            try {
                return yield this.eip1559.estimateFees(fallbackGasPrices === null || fallbackGasPrices === void 0 ? void 0 : fallbackGasPrices.estimated);
            }
            catch (_a) {
                return yield this.legacy.gasPrices(fallbackGasPrices === null || fallbackGasPrices === void 0 ? void 0 : fallbackGasPrices.gasPrices, shouldGetMedian);
            }
        });
    }
    getTxGasParams(payload = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const { fallbackGasPrices, shouldGetMedian, isLegacy = false, bumpPercent = 0, legacySpeed = 'fast' } = payload;
            if (isLegacy) {
                const legacyGasPrice = yield this.legacy.gasPrices(fallbackGasPrices === null || fallbackGasPrices === void 0 ? void 0 : fallbackGasPrices.gasPrices, shouldGetMedian);
                return { gasPrice: fromGweiToWeiHex(bumpOnPercent(legacyGasPrice[legacySpeed], bumpPercent)) };
            }
            try {
                const eipParams = yield this.eip1559.estimateFees(fallbackGasPrices === null || fallbackGasPrices === void 0 ? void 0 : fallbackGasPrices.estimated);
                return {
                    maxFeePerGas: fromGweiToWeiHex(bumpOnPercent(eipParams.maxFeePerGas, bumpPercent)),
                    maxPriorityFeePerGas: fromGweiToWeiHex(bumpOnPercent(eipParams.maxPriorityFeePerGas, bumpPercent)),
                };
            }
            catch (_a) {
                const legacyGasPrice = yield this.legacy.gasPrices(fallbackGasPrices === null || fallbackGasPrices === void 0 ? void 0 : fallbackGasPrices.gasPrices, shouldGetMedian);
                return { gasPrice: fromGweiToWeiHex(bumpOnPercent(legacyGasPrice[legacySpeed], bumpPercent)) };
            }
        });
    }
    gasPricesWithEstimate(payload = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const { fallbackGasPrices, shouldGetMedian } = payload;
            const estimate = yield this.eip1559.estimateFees(fallbackGasPrices === null || fallbackGasPrices === void 0 ? void 0 : fallbackGasPrices.estimated);
            const gasPrices = yield this.legacy.gasPrices(fallbackGasPrices === null || fallbackGasPrices === void 0 ? void 0 : fallbackGasPrices.gasPrices, shouldGetMedian);
            return {
                estimate,
                gasPrices,
            };
        });
    }
}
//# sourceMappingURL=gas-price-oracle.js.map