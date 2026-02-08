"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PRIORITY_FEE_INCREASE_BOUNDARY = exports.FEE_HISTORY_PERCENTILE = exports.DEFAULT_PRIORITY_FEE = exports.FEE_HISTORY_BLOCKS = exports.FALLBACK_ESTIMATE = exports.DEFAULT_BASE_FEE = void 0;
// How many blocks to consider for priority fee estimation
var bignumber_js_1 = __importDefault(require("bignumber.js"));
var FEE_HISTORY_BLOCKS = 10;
exports.FEE_HISTORY_BLOCKS = FEE_HISTORY_BLOCKS;
// Which percentile of effective priority fees to include
var FEE_HISTORY_PERCENTILE = 5;
exports.FEE_HISTORY_PERCENTILE = FEE_HISTORY_PERCENTILE;
var DEFAULT_BASE_FEE = 20;
exports.DEFAULT_BASE_FEE = DEFAULT_BASE_FEE;
var DEFAULT_PRIORITY_FEE = 3;
exports.DEFAULT_PRIORITY_FEE = DEFAULT_PRIORITY_FEE;
var PRIORITY_FEE_INCREASE_BOUNDARY = 200; // %
exports.PRIORITY_FEE_INCREASE_BOUNDARY = PRIORITY_FEE_INCREASE_BOUNDARY;
var FALLBACK_ESTIMATE = {
    baseFee: DEFAULT_BASE_FEE,
    maxPriorityFeePerGas: DEFAULT_PRIORITY_FEE,
    maxFeePerGas: new bignumber_js_1.default(DEFAULT_PRIORITY_FEE).plus(DEFAULT_BASE_FEE).toNumber(),
};
exports.FALLBACK_ESTIMATE = FALLBACK_ESTIMATE;
//# sourceMappingURL=constants.js.map