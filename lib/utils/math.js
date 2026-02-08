"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bumpOnPercent = exports.roundGwei = exports.round = exports.getMedian = exports.findMax = void 0;
var bignumber_js_1 = __importDefault(require("bignumber.js"));
var constants_1 = require("../constants");
var crypto_1 = require("./crypto");
var findMax = function (values) {
    return values.reduce(function (acc, curr, index) {
        var isGreaterThanAcc = curr.isGreaterThan(acc.highest);
        if (isGreaterThanAcc) {
            acc.highest = curr;
            acc.index = index;
        }
        return acc;
    }, {
        highest: constants_1.BG_ZERO,
        index: 0,
    });
};
exports.findMax = findMax;
var getMedian = function (arr) {
    return Math.floor(arr.length / 2);
};
exports.getMedian = getMedian;
var round = function (value) {
    return new bignumber_js_1.default(value).decimalPlaces(0, 2);
};
exports.round = round;
var roundGwei = function (value) {
    return (0, crypto_1.toGwei)(value).decimalPlaces(0, 2);
};
exports.roundGwei = roundGwei;
var bumpOnPercent = function (value, bumpPercent) {
    return value + (value * bumpPercent) / constants_1.PERCENT_MULTIPLIER;
};
exports.bumpOnPercent = bumpOnPercent;
//# sourceMappingURL=math.js.map