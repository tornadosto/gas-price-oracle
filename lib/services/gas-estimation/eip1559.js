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
exports.Eip1559GasPriceOracle = void 0;
var bignumber_js_1 = __importDefault(require("bignumber.js"));
var config_1 = require("../../config");
var services_1 = require("../../services");
var utils_1 = require("../../utils");
var constants_1 = require("../../constants");
var constants_2 = require("./constants");
// !!! MAKE SENSE ALL CALCULATIONS IN GWEI !!!
var Eip1559GasPriceOracle = /** @class */ (function () {
    function Eip1559GasPriceOracle(_a) {
        var _b, _c;
        var fetcher = _a.fetcher, options = __rest(_a, ["fetcher"]);
        this.configuration = {
            shouldCache: false,
            chainId: config_1.ChainId.MAINNET,
            fallbackGasPrices: undefined,
            minPriority: constants_2.DEFAULT_PRIORITY_FEE,
            blockTime: constants_1.DEFAULT_BLOCK_DURATION,
            blocksCount: config_1.NETWORKS[config_1.ChainId.MAINNET].blocksCount,
            percentile: config_1.NETWORKS[config_1.ChainId.MAINNET].percentile,
        };
        this.FEES_KEY = function (chainId) { return "estimate-fee-".concat(chainId); };
        this.fetcher = fetcher;
        var chainId = (options === null || options === void 0 ? void 0 : options.chainId) || this.configuration.chainId;
        this.configuration.blocksCount = ((_b = config_1.NETWORKS[chainId]) === null || _b === void 0 ? void 0 : _b.blocksCount) || constants_2.FEE_HISTORY_BLOCKS;
        this.configuration.percentile = ((_c = config_1.NETWORKS[chainId]) === null || _c === void 0 ? void 0 : _c.percentile) || constants_2.FEE_HISTORY_PERCENTILE;
        if (options) {
            this.configuration = __assign(__assign({}, this.configuration), options);
        }
        this.cache = new services_1.NodeJSCache({ stdTTL: this.configuration.blockTime, useClones: false });
    }
    Eip1559GasPriceOracle.prototype.estimateFees = function (fallbackGasPrices) {
        return __awaiter(this, void 0, void 0, function () {
            var cacheKey, cachedFees, latestBlock, baseFee, blockCount, rewardPercentiles, data, fees, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, , 8]);
                        cacheKey = this.FEES_KEY(this.configuration.chainId);
                        return [4 /*yield*/, this.cache.get(cacheKey)];
                    case 1:
                        cachedFees = _a.sent();
                        if (cachedFees) {
                            return [2 /*return*/, cachedFees];
                        }
                        return [4 /*yield*/, this.fetcher.makeRpcCall({
                                method: 'eth_getBlockByNumber',
                                params: ['latest', false],
                            })];
                    case 2:
                        latestBlock = (_a.sent()).data;
                        if (!latestBlock.result.baseFeePerGas) {
                            throw new Error('An error occurred while fetching current base fee, falling back');
                        }
                        baseFee = (0, utils_1.fromWeiToGwei)(latestBlock.result.baseFeePerGas);
                        blockCount = (0, utils_1.fromNumberToHex)(this.configuration.blocksCount);
                        rewardPercentiles = [this.configuration.percentile];
                        return [4 /*yield*/, this.fetcher.makeRpcCall({
                                method: 'eth_feeHistory',
                                params: [blockCount, 'latest', rewardPercentiles],
                            })];
                    case 3:
                        data = (_a.sent()).data;
                        return [4 /*yield*/, this.calculateFees({ baseFee: baseFee, feeHistory: data.result })];
                    case 4:
                        fees = _a.sent();
                        if (!this.configuration.shouldCache) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.cache.set(cacheKey, fees)];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6: return [2 /*return*/, fees];
                    case 7:
                        err_1 = _a.sent();
                        if (fallbackGasPrices) {
                            return [2 /*return*/, fallbackGasPrices];
                        }
                        if (this.configuration.fallbackGasPrices) {
                            return [2 /*return*/, this.configuration.fallbackGasPrices];
                        }
                        throw err_1;
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    Eip1559GasPriceOracle.prototype.calculatePriorityFeeEstimate = function (feeHistory) {
        var _a;
        if (!feeHistory) {
            return null;
        }
        var rewards = (_a = feeHistory.reward) === null || _a === void 0 ? void 0 : _a.map(function (r) { return (0, utils_1.fromWeiToGwei)(r[0]); }).filter(function (r) { return r.isGreaterThan(0); }).sort();
        if (!rewards) {
            return null;
        }
        // Calculate percentage increases from between ordered list of fees
        var percentageIncreases = rewards.reduce(function (acc, curr, i, arr) {
            if (i !== arr.length - 1) {
                var next = arr[i + 1];
                var percentageIncrease = next.minus(curr).dividedBy(curr).multipliedBy(constants_1.PERCENT_MULTIPLIER);
                acc.push(percentageIncrease);
            }
            return acc;
        }, []);
        var _b = (0, utils_1.findMax)(percentageIncreases), highest = _b.highest, index = _b.index;
        // If we have big increased in value, we could be considering "outliers" in our estimate
        // Skip the low elements and take a new median
        var values = highest.isGreaterThanOrEqualTo(constants_2.PRIORITY_FEE_INCREASE_BOUNDARY) && index >= (0, utils_1.getMedian)(rewards)
            ? rewards.slice(index)
            : rewards;
        return values[(0, utils_1.getMedian)(values)];
    };
    Eip1559GasPriceOracle.prototype.getPriorityFromChain = function (feeHistory) {
        return __awaiter(this, void 0, void 0, function () {
            var data, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.fetcher.makeRpcCall({
                                method: 'eth_maxPriorityFeePerGas',
                                params: [],
                            })];
                    case 1:
                        data = (_a.sent()).data;
                        return [2 /*return*/, (0, utils_1.fromWeiToGwei)(data.result)];
                    case 2:
                        err_2 = _a.sent();
                        return [2 /*return*/, this.calculatePriorityFeeEstimate(feeHistory)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Eip1559GasPriceOracle.prototype.calculateFees = function (_a) {
        var baseFee = _a.baseFee, feeHistory = _a.feeHistory;
        return __awaiter(this, void 0, void 0, function () {
            var estimatedPriorityFee, maxPriorityFeePerGas, maxFeePerGas;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.getPriorityFromChain(feeHistory)];
                    case 1:
                        estimatedPriorityFee = _b.sent();
                        maxPriorityFeePerGas = (0, utils_1.findMax)([
                            estimatedPriorityFee !== null && estimatedPriorityFee !== void 0 ? estimatedPriorityFee : constants_1.BG_ZERO,
                            new bignumber_js_1.default(this.configuration.minPriority),
                        ]).highest;
                        maxFeePerGas = baseFee.plus(maxPriorityFeePerGas);
                        if (this.checkIsGreaterThanMax(maxFeePerGas) || this.checkIsGreaterThanMax(maxPriorityFeePerGas)) {
                            throw new Error('Estimated gas fee was much higher than expected, erroring');
                        }
                        return [2 /*return*/, {
                                baseFee: baseFee.toNumber(),
                                maxFeePerGas: maxFeePerGas.toNumber(),
                                maxPriorityFeePerGas: maxPriorityFeePerGas.toNumber(),
                            }];
                }
            });
        });
    };
    Eip1559GasPriceOracle.prototype.checkIsGreaterThanMax = function (value) {
        var _a;
        return value.isGreaterThanOrEqualTo((_a = config_1.NETWORKS[this.configuration.chainId]) === null || _a === void 0 ? void 0 : _a.maxGasPrice) || false;
    };
    return Eip1559GasPriceOracle;
}());
exports.Eip1559GasPriceOracle = Eip1559GasPriceOracle;
//# sourceMappingURL=eip1559.js.map