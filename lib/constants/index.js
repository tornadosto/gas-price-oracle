"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_BLOCK_DURATION = exports.PERCENT_MULTIPLIER = exports.BG_ZERO = exports.SUCCESS_STATUS = exports.INT_PRECISION = exports.GWEI_PRECISION = exports.ROUND_DOWN = exports.ROUND_UP = exports.DEFAULT_TIMEOUT = exports.GWEI = void 0;
var bignumber_js_1 = __importDefault(require("bignumber.js"));
var GWEI = 1e9;
exports.GWEI = GWEI;
var DEFAULT_TIMEOUT = 10000;
exports.DEFAULT_TIMEOUT = DEFAULT_TIMEOUT;
var ROUND_UP = 1;
exports.ROUND_UP = ROUND_UP;
var ROUND_DOWN = 2;
exports.ROUND_DOWN = ROUND_DOWN;
var GWEI_PRECISION = 9;
exports.GWEI_PRECISION = GWEI_PRECISION;
var INT_PRECISION = 0;
exports.INT_PRECISION = INT_PRECISION;
var SUCCESS_STATUS = 200;
exports.SUCCESS_STATUS = SUCCESS_STATUS;
var BG_ZERO = new bignumber_js_1.default(0);
exports.BG_ZERO = BG_ZERO;
var PERCENT_MULTIPLIER = 100;
exports.PERCENT_MULTIPLIER = PERCENT_MULTIPLIER;
var DEFAULT_BLOCK_DURATION = 10;
exports.DEFAULT_BLOCK_DURATION = DEFAULT_BLOCK_DURATION;
//# sourceMappingURL=index.js.map