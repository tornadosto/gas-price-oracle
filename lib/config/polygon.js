"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onChainOracles = exports.offChainOracles = void 0;
var maticGasStation = {
    name: 'maticGasStation',
    url: 'https://gasstation.polygon.technology/v2',
    instantPropertyName: 'fast.maxFee',
    fastPropertyName: 'fast.maxFee',
    standardPropertyName: 'standard.maxFee',
    lowPropertyName: 'safeLow.maxFee',
    denominator: 1,
    additionalDataProperty: null,
};
var tornadoMaticGasStation = {
    name: 'tornadoMGasStation',
    url: 'https://matic-gas-station.tornado.ws',
    instantPropertyName: 'standard',
    fastPropertyName: 'standard',
    standardPropertyName: 'safeLow',
    lowPropertyName: 'safeLow',
    denominator: 1,
    additionalDataProperty: null,
};
exports.offChainOracles = {
    maticGasStation: maticGasStation,
    tornadoMaticGasStation: tornadoMaticGasStation,
};
exports.onChainOracles = {};
exports.default = {
    offChainOracles: exports.offChainOracles,
    onChainOracles: exports.onChainOracles,
};
//# sourceMappingURL=polygon.js.map