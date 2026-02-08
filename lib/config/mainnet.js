"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onChainOracles = exports.offChainOracles = void 0;
var etherchain = {
    name: 'etherchain',
    url: 'https://etherchain.org/api/gasnow',
    instantPropertyName: 'rapid',
    fastPropertyName: 'fast',
    standardPropertyName: 'standard',
    lowPropertyName: 'slow',
    denominator: 1e9,
    additionalDataProperty: 'data',
};
var chainlink = {
    name: 'chainlink',
    callData: '0x50d25bcd',
    contract: '0x169E633A2D1E6c10dD91238Ba11c4A708dfEF37C',
    denominator: '1000000000',
};
exports.offChainOracles = {
    etherchain: etherchain,
};
exports.onChainOracles = {
    chainlink: chainlink,
};
exports.default = {
    offChainOracles: exports.offChainOracles,
    onChainOracles: exports.onChainOracles,
};
//# sourceMappingURL=mainnet.js.map