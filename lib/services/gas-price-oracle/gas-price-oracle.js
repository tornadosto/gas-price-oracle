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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GasPriceOracle = void 0;
var config_1 = require("../../config");
var constants_1 = require("../../constants");
var utils_1 = require("../../utils");
var services_1 = require("../../services");
var GasPriceOracle = /** @class */ (function () {
    function GasPriceOracle(options) {
        var _a;
        var timeout = (_a = options === null || options === void 0 ? void 0 : options.timeout) !== null && _a !== void 0 ? _a : constants_1.DEFAULT_TIMEOUT;
        this.chainId = (options === null || options === void 0 ? void 0 : options.chainId) || config_1.ChainId.MAINNET;
        var defaultRpc = (options === null || options === void 0 ? void 0 : options.defaultRpc) || config_1.NETWORKS[this.chainId].rpcUrl;
        this.fetcher = new services_1.RpcFetcher(defaultRpc, timeout);
        var _b = (options === null || options === void 0 ? void 0 : options.fallbackGasPrices) || {}, gasPrices = _b.gasPrices, estimated = _b.estimated;
        var payload = __assign(__assign({}, options), { fetcher: this.fetcher });
        this.legacy = new services_1.LegacyGasPriceOracle(__assign(__assign({}, payload), { fallbackGasPrices: gasPrices }));
        this.eip1559 = new services_1.Eip1559GasPriceOracle(__assign(__assign({}, payload), { fallbackGasPrices: estimated }));
    }
    GasPriceOracle.prototype.gasPrices = function (payload) {
        if (payload === void 0) { payload = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var fallbackGasPrices, shouldGetMedian, _a, isLegacy, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        fallbackGasPrices = payload.fallbackGasPrices, shouldGetMedian = payload.shouldGetMedian, _a = payload.isLegacy, isLegacy = _a === void 0 ? false : _a;
                        if (!isLegacy) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.legacy.gasPrices(fallbackGasPrices === null || fallbackGasPrices === void 0 ? void 0 : fallbackGasPrices.gasPrices, shouldGetMedian)];
                    case 1: return [2 /*return*/, _c.sent()];
                    case 2:
                        _c.trys.push([2, 4, , 6]);
                        return [4 /*yield*/, this.eip1559.estimateFees(fallbackGasPrices === null || fallbackGasPrices === void 0 ? void 0 : fallbackGasPrices.estimated)];
                    case 3: return [2 /*return*/, _c.sent()];
                    case 4:
                        _b = _c.sent();
                        return [4 /*yield*/, this.legacy.gasPrices(fallbackGasPrices === null || fallbackGasPrices === void 0 ? void 0 : fallbackGasPrices.gasPrices, shouldGetMedian)];
                    case 5: return [2 /*return*/, _c.sent()];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    GasPriceOracle.prototype.getTxGasParams = function (payload) {
        if (payload === void 0) { payload = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var fallbackGasPrices, shouldGetMedian, _a, isLegacy, _b, bumpPercent, _c, legacySpeed, legacyGasPrice, eipParams, _d, legacyGasPrice;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        fallbackGasPrices = payload.fallbackGasPrices, shouldGetMedian = payload.shouldGetMedian, _a = payload.isLegacy, isLegacy = _a === void 0 ? false : _a, _b = payload.bumpPercent, bumpPercent = _b === void 0 ? 0 : _b, _c = payload.legacySpeed, legacySpeed = _c === void 0 ? 'fast' : _c;
                        if (!isLegacy) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.legacy.gasPrices(fallbackGasPrices === null || fallbackGasPrices === void 0 ? void 0 : fallbackGasPrices.gasPrices, shouldGetMedian)];
                    case 1:
                        legacyGasPrice = _e.sent();
                        return [2 /*return*/, { gasPrice: (0, utils_1.fromGweiToWeiHex)((0, utils_1.bumpOnPercent)(legacyGasPrice[legacySpeed], bumpPercent)) }];
                    case 2:
                        _e.trys.push([2, 4, , 6]);
                        return [4 /*yield*/, this.eip1559.estimateFees(fallbackGasPrices === null || fallbackGasPrices === void 0 ? void 0 : fallbackGasPrices.estimated)];
                    case 3:
                        eipParams = _e.sent();
                        return [2 /*return*/, {
                                maxFeePerGas: (0, utils_1.fromGweiToWeiHex)((0, utils_1.bumpOnPercent)(eipParams.maxFeePerGas, bumpPercent)),
                                maxPriorityFeePerGas: (0, utils_1.fromGweiToWeiHex)((0, utils_1.bumpOnPercent)(eipParams.maxPriorityFeePerGas, bumpPercent)),
                            }];
                    case 4:
                        _d = _e.sent();
                        return [4 /*yield*/, this.legacy.gasPrices(fallbackGasPrices === null || fallbackGasPrices === void 0 ? void 0 : fallbackGasPrices.gasPrices, shouldGetMedian)];
                    case 5:
                        legacyGasPrice = _e.sent();
                        return [2 /*return*/, { gasPrice: (0, utils_1.fromGweiToWeiHex)((0, utils_1.bumpOnPercent)(legacyGasPrice[legacySpeed], bumpPercent)) }];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    GasPriceOracle.prototype.gasPricesWithEstimate = function (payload) {
        if (payload === void 0) { payload = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var fallbackGasPrices, shouldGetMedian, estimate, gasPrices;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fallbackGasPrices = payload.fallbackGasPrices, shouldGetMedian = payload.shouldGetMedian;
                        return [4 /*yield*/, this.eip1559.estimateFees(fallbackGasPrices === null || fallbackGasPrices === void 0 ? void 0 : fallbackGasPrices.estimated)];
                    case 1:
                        estimate = _a.sent();
                        return [4 /*yield*/, this.legacy.gasPrices(fallbackGasPrices === null || fallbackGasPrices === void 0 ? void 0 : fallbackGasPrices.gasPrices, shouldGetMedian)];
                    case 2:
                        gasPrices = _a.sent();
                        return [2 /*return*/, {
                                estimate: estimate,
                                gasPrices: gasPrices,
                            }];
                }
            });
        });
    };
    return GasPriceOracle;
}());
exports.GasPriceOracle = GasPriceOracle;
//# sourceMappingURL=gas-price-oracle.js.map