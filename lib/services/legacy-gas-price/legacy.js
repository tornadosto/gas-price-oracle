"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LegacyGasPriceOracle = void 0;
var axios_1 = __importDefault(require("axios"));
var bignumber_js_1 = __importDefault(require("bignumber.js"));
var config_1 = require("../../config");
var services_1 = require("../../services");
var utils_1 = require("../../utils");
var constants_1 = require("../../constants");
var constants_2 = require("./constants");
var LegacyGasPriceOracle = /** @class */ (function () {
    function LegacyGasPriceOracle(_a) {
        var _b;
        var fetcher = _a.fetcher, options = __rest(_a, ["fetcher"]);
        this.onChainOracles = {};
        this.offChainOracles = {};
        this.configuration = {
            shouldCache: false,
            chainId: config_1.ChainId.MAINNET,
            timeout: constants_1.DEFAULT_TIMEOUT,
            blockTime: constants_1.DEFAULT_BLOCK_DURATION,
            defaultRpc: config_1.NETWORKS[config_1.ChainId.MAINNET].rpcUrl,
            fallbackGasPrices: LegacyGasPriceOracle.getMultipliedPrices(config_1.NETWORKS[config_1.ChainId.MAINNET].defaultGasPrice),
        };
        this.LEGACY_KEY = function (chainId) { return "legacy-fee-".concat(chainId); };
        this.fetcher = fetcher;
        if (options) {
            this.configuration = __assign(__assign({}, this.configuration), options);
        }
        var defaultGasPrice = config_1.NETWORKS[config_1.ChainId.MAINNET].defaultGasPrice;
        var fallbackGasPrices = this.configuration.fallbackGasPrices || LegacyGasPriceOracle.getMultipliedPrices(defaultGasPrice);
        this.configuration.fallbackGasPrices = LegacyGasPriceOracle.normalize(fallbackGasPrices);
        var network = (_b = config_1.NETWORKS[this.configuration.chainId]) === null || _b === void 0 ? void 0 : _b.oracles;
        if (network) {
            this.offChainOracles = __assign({}, network.offChainOracles);
            this.onChainOracles = __assign({}, network.onChainOracles);
        }
        this.cache = new services_1.NodeJSCache({ stdTTL: this.configuration.blockTime, useClones: false });
    }
    LegacyGasPriceOracle.getMedianGasPrice = function (gasPrices) {
        var medianGasPrice = constants_2.DEFAULT_GAS_PRICE;
        var results = {
            instant: [],
            fast: [],
            standard: [],
            low: [],
        };
        for (var _i = 0, gasPrices_1 = gasPrices; _i < gasPrices_1.length; _i++) {
            var gasPrice = gasPrices_1[_i];
            results.instant.push(gasPrice.instant);
            results.fast.push(gasPrice.fast);
            results.standard.push(gasPrice.standard);
            results.low.push(gasPrice.low);
        }
        for (var _a = 0, _b = Object.keys(medianGasPrice); _a < _b.length; _a++) {
            var type = _b[_a];
            var allPrices = results[type].sort(function (a, b) { return a - b; });
            if (allPrices.length === 1) {
                medianGasPrice[type] = allPrices[0];
                continue;
            }
            else if (allPrices.length === 0) {
                continue;
            }
            var isEven = allPrices.length % 2 === 0;
            var middle = Math.floor(allPrices.length / 2);
            medianGasPrice[type] = isEven ? (allPrices[middle - 1] + allPrices[middle]) / 2.0 : allPrices[middle];
        }
        return LegacyGasPriceOracle.normalize(medianGasPrice);
    };
    LegacyGasPriceOracle.getMultipliedPrices = function (gasPrice) {
        return {
            instant: gasPrice * constants_2.MULTIPLIERS.instant,
            fast: gasPrice * constants_2.MULTIPLIERS.fast,
            standard: gasPrice * constants_2.MULTIPLIERS.standard,
            low: gasPrice * constants_2.MULTIPLIERS.low,
        };
    };
    LegacyGasPriceOracle.normalize = function (_gas) {
        var format = {
            groupSeparator: '',
            decimalSeparator: '.',
        };
        var gas = __assign({}, _gas);
        for (var _i = 0, _a = Object.keys(gas); _i < _a.length; _i++) {
            var type = _a[_i];
            gas[type] = Number(new bignumber_js_1.default(gas[type]).toFormat(constants_1.GWEI_PRECISION, format));
        }
        return gas;
    };
    LegacyGasPriceOracle.getCategorize = function (gasPrice) {
        return LegacyGasPriceOracle.normalize(LegacyGasPriceOracle.getMultipliedPrices(gasPrice));
    };
    LegacyGasPriceOracle.getGasPriceFromResponse = function (payload) {
        var response = payload.response, fetcherName = payload.fetcherName, _a = payload.denominator, denominator = _a === void 0 ? constants_1.GWEI : _a;
        var fastGasPrice = new bignumber_js_1.default(response);
        if (fastGasPrice.isZero()) {
            throw new Error("".concat(fetcherName, " provides corrupted values"));
        }
        fastGasPrice = fastGasPrice.div(denominator);
        return fastGasPrice.toNumber();
    };
    LegacyGasPriceOracle.prototype.addOffChainOracle = function (oracle) {
        this.offChainOracles[oracle.name] = oracle;
    };
    LegacyGasPriceOracle.prototype.addOnChainOracle = function (oracle) {
        this.onChainOracles[oracle.name] = oracle;
    };
    LegacyGasPriceOracle.prototype.removeOnChainOracle = function (name) {
        delete this.onChainOracles[name];
    };
    LegacyGasPriceOracle.prototype.removeOffChainOracle = function (name) {
        delete this.offChainOracles[name];
    };
    LegacyGasPriceOracle.prototype.fetchGasPricesOnChain = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _i, _a, oracle, name, callData, contract, denominator, rpc, response, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _i = 0, _a = Object.values(this.onChainOracles);
                        _b.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 6];
                        oracle = _a[_i];
                        name = oracle.name, callData = oracle.callData, contract = oracle.contract, denominator = oracle.denominator, rpc = oracle.rpc;
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, this.fetcher.makeRpcCall({
                                rpc: rpc,
                                method: 'eth_call',
                                params: [{ data: callData, to: contract }, 'latest'],
                            })];
                    case 3:
                        response = _b.sent();
                        if (response.status === 200) {
                            return [2 /*return*/, LegacyGasPriceOracle.getGasPriceFromResponse({
                                    denominator: denominator,
                                    fetcherName: "".concat(name, " oracle"),
                                    response: response.data.result,
                                })];
                        }
                        throw new Error("Fetch gasPrice from ".concat(name, " oracle failed. Trying another one..."));
                    case 4:
                        e_1 = _b.sent();
                        console.error(e_1.message);
                        return [3 /*break*/, 5];
                    case 5:
                        _i++;
                        return [3 /*break*/, 1];
                    case 6: throw new Error('All oracles are down. Probably a network error.');
                }
            });
        });
    };
    LegacyGasPriceOracle.prototype.fetchGasPriceFromRpc = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, status, data, e_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.fetcher.makeRpcCall({
                                params: [],
                                method: 'eth_gasPrice',
                            })];
                    case 1:
                        _a = _b.sent(), status = _a.status, data = _a.data;
                        if (status === 200) {
                            return [2 /*return*/, LegacyGasPriceOracle.getGasPriceFromResponse({
                                    fetcherName: 'Default RPC',
                                    response: data.result,
                                })];
                        }
                        throw new Error("Fetch gasPrice from default RPC failed..");
                    case 2:
                        e_2 = _b.sent();
                        console.error(e_2.message);
                        throw new Error('Default RPC is down. Probably a network error.');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    LegacyGasPriceOracle.prototype.fetchGasPricesOffChain = function (shouldGetMedian) {
        if (shouldGetMedian === void 0) { shouldGetMedian = true; }
        return __awaiter(this, void 0, void 0, function () {
            var _i, _a, oracle, e_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!shouldGetMedian) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.fetchMedianGasPriceOffChain()];
                    case 1: return [2 /*return*/, _b.sent()];
                    case 2:
                        _i = 0, _a = Object.values(this.offChainOracles);
                        _b.label = 3;
                    case 3:
                        if (!(_i < _a.length)) return [3 /*break*/, 8];
                        oracle = _a[_i];
                        _b.label = 4;
                    case 4:
                        _b.trys.push([4, 6, , 7]);
                        return [4 /*yield*/, this.askOracle(oracle)];
                    case 5: return [2 /*return*/, _b.sent()];
                    case 6:
                        e_3 = _b.sent();
                        console.info("".concat(oracle, " has error - "), e_3.message);
                        return [3 /*break*/, 7];
                    case 7:
                        _i++;
                        return [3 /*break*/, 3];
                    case 8: throw new Error('All oracles are down. Probably a network error.');
                }
            });
        });
    };
    LegacyGasPriceOracle.prototype.fetchMedianGasPriceOffChain = function () {
        return __awaiter(this, void 0, void 0, function () {
            var promises, _i, _a, oracle, settledPromises, allGasPrices;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        promises = [];
                        for (_i = 0, _a = Object.values(this.offChainOracles); _i < _a.length; _i++) {
                            oracle = _a[_i];
                            promises.push(this.askOracle(oracle));
                        }
                        return [4 /*yield*/, Promise.allSettled(promises)];
                    case 1:
                        settledPromises = _b.sent();
                        allGasPrices = settledPromises.reduce(function (acc, result) {
                            if (result.status === 'fulfilled') {
                                acc.push(result.value);
                                return acc;
                            }
                            return acc;
                        }, []);
                        if (allGasPrices.length === 0) {
                            throw new Error('All oracles are down. Probably a network error.');
                        }
                        return [2 /*return*/, LegacyGasPriceOracle.getMedianGasPrice(allGasPrices)];
                }
            });
        });
    };
    LegacyGasPriceOracle.prototype.gasPrices = function (fallbackGasPrices, shouldGetMedian) {
        if (shouldGetMedian === void 0) { shouldGetMedian = true; }
        return __awaiter(this, void 0, void 0, function () {
            var cacheKey, cachedFees, _a, e_4, fastGas, e_5, fastGas, e_6;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!this.lastGasPrice) {
                            this.lastGasPrice = fallbackGasPrices || this.configuration.fallbackGasPrices;
                        }
                        cacheKey = this.LEGACY_KEY(this.configuration.chainId);
                        return [4 /*yield*/, this.cache.get(cacheKey)];
                    case 1:
                        cachedFees = _b.sent();
                        if (cachedFees) {
                            return [2 /*return*/, cachedFees];
                        }
                        if (!(Object.keys(this.offChainOracles).length > 0)) return [3 /*break*/, 7];
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 6, , 7]);
                        _a = this;
                        return [4 /*yield*/, this.fetchGasPricesOffChain(shouldGetMedian)];
                    case 3:
                        _a.lastGasPrice = _b.sent();
                        if (!this.configuration.shouldCache) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.cache.set(cacheKey, this.lastGasPrice)];
                    case 4:
                        _b.sent();
                        _b.label = 5;
                    case 5: return [2 /*return*/, this.lastGasPrice];
                    case 6:
                        e_4 = _b.sent();
                        console.error('Failed to fetch gas prices from offchain oracles...');
                        return [3 /*break*/, 7];
                    case 7:
                        if (!(Object.keys(this.onChainOracles).length > 0)) return [3 /*break*/, 13];
                        _b.label = 8;
                    case 8:
                        _b.trys.push([8, 12, , 13]);
                        return [4 /*yield*/, this.fetchGasPricesOnChain()];
                    case 9:
                        fastGas = _b.sent();
                        this.lastGasPrice = LegacyGasPriceOracle.getCategorize(fastGas);
                        if (!this.configuration.shouldCache) return [3 /*break*/, 11];
                        return [4 /*yield*/, this.cache.set(cacheKey, this.lastGasPrice)];
                    case 10:
                        _b.sent();
                        _b.label = 11;
                    case 11: return [2 /*return*/, this.lastGasPrice];
                    case 12:
                        e_5 = _b.sent();
                        console.error('Failed to fetch gas prices from onchain oracles...');
                        return [3 /*break*/, 13];
                    case 13:
                        _b.trys.push([13, 17, , 18]);
                        return [4 /*yield*/, this.fetchGasPriceFromRpc()];
                    case 14:
                        fastGas = _b.sent();
                        this.lastGasPrice = LegacyGasPriceOracle.getCategorize(fastGas);
                        if (!this.configuration.shouldCache) return [3 /*break*/, 16];
                        return [4 /*yield*/, this.cache.set(cacheKey, this.lastGasPrice)];
                    case 15:
                        _b.sent();
                        _b.label = 16;
                    case 16: return [2 /*return*/, this.lastGasPrice];
                    case 17:
                        e_6 = _b.sent();
                        console.error('Failed to fetch gas prices from default RPC. Last known gas will be returned');
                        return [3 /*break*/, 18];
                    case 18: return [2 /*return*/, LegacyGasPriceOracle.normalize(this.lastGasPrice)];
                }
            });
        });
    };
    LegacyGasPriceOracle.prototype.askOracle = function (oracle) {
        return __awaiter(this, void 0, void 0, function () {
            var url, name, denominator, lowPropertyName, fastPropertyName, instantPropertyName, standardPropertyName, additionalDataProperty, response, gas, gasPrices;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = oracle.url, name = oracle.name, denominator = oracle.denominator, lowPropertyName = oracle.lowPropertyName, fastPropertyName = oracle.fastPropertyName, instantPropertyName = oracle.instantPropertyName, standardPropertyName = oracle.standardPropertyName, additionalDataProperty = oracle.additionalDataProperty;
                        return [4 /*yield*/, axios_1.default.get(url, { timeout: this.configuration.timeout })];
                    case 1:
                        response = _a.sent();
                        if (response.status === 200) {
                            gas = (0, utils_1.resolvePropertyPath)(response.data, additionalDataProperty);
                            if (Number((0, utils_1.resolvePropertyPath)(gas, fastPropertyName)) === 0) {
                                throw new Error("".concat(name, " oracle provides corrupted values"));
                            }
                            gasPrices = {
                                instant: parseFloat((0, utils_1.resolvePropertyPath)(gas, instantPropertyName)) / denominator,
                                fast: parseFloat((0, utils_1.resolvePropertyPath)(gas, fastPropertyName)) / denominator,
                                standard: parseFloat((0, utils_1.resolvePropertyPath)(gas, standardPropertyName)) / denominator,
                                low: parseFloat((0, utils_1.resolvePropertyPath)(gas, lowPropertyName)) / denominator,
                            };
                            return [2 /*return*/, LegacyGasPriceOracle.normalize(gasPrices)];
                        }
                        else {
                            throw new Error("Fetch gasPrice from ".concat(name, " oracle failed. Trying another one..."));
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return LegacyGasPriceOracle;
}());
exports.LegacyGasPriceOracle = LegacyGasPriceOracle;
//# sourceMappingURL=legacy.js.map