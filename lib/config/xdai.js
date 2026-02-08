"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onChainOracles = exports.offChainOracles = void 0;
var blockscout = {
    name: 'blockscout',
    url: 'https://gnosis.blockscout.com/api/v1/gas-price-oracle',
    instantPropertyName: 'fast',
    fastPropertyName: 'average',
    standardPropertyName: 'slow',
    lowPropertyName: 'slow',
    denominator: 1,
    additionalDataProperty: null,
};
exports.offChainOracles = {
    blockscout: blockscout,
};
exports.onChainOracles = {};
exports.default = {
    offChainOracles: exports.offChainOracles,
    onChainOracles: exports.onChainOracles,
};
//# sourceMappingURL=xdai.js.map