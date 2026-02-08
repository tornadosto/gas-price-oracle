"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromNumberToHex = exports.fromGweiToWeiHex = exports.fromWeiToGwei = exports.toGwei = void 0;
var bignumber_js_1 = __importDefault(require("bignumber.js"));
var constants_1 = require("../constants");
var toGwei = function (amount) {
    return new bignumber_js_1.default(amount).multipliedBy(constants_1.GWEI).decimalPlaces(constants_1.GWEI_PRECISION);
};
exports.toGwei = toGwei;
var fromWeiToGwei = function (amount) {
    return new bignumber_js_1.default(amount).dividedBy(constants_1.GWEI).decimalPlaces(constants_1.GWEI_PRECISION);
};
exports.fromWeiToGwei = fromWeiToGwei;
var fromNumberToHex = function (amount) {
    return "0x".concat(new bignumber_js_1.default(amount).toString(16));
};
exports.fromNumberToHex = fromNumberToHex;
var fromGweiToWeiHex = function (value) {
    return fromNumberToHex(new bignumber_js_1.default(value).multipliedBy(constants_1.GWEI).decimalPlaces(0));
};
exports.fromGweiToWeiHex = fromGweiToWeiHex;
//# sourceMappingURL=crypto.js.map