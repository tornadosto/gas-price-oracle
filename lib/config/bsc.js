"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onChainOracles = exports.offChainOracles = void 0;
var ztake = {
    name: 'ztake',
    url: 'https://blockchains.ztake.org/api/h6WnmwNqw9CAJHzej5W4gD6LZ9n7v8EK/gasprice/bsc/',
    instantPropertyName: 'percentile_60',
    fastPropertyName: 'percentile_50',
    standardPropertyName: 'percentile_40',
    lowPropertyName: 'percentile_30',
    denominator: 1,
    additionalDataProperty: null,
};
exports.offChainOracles = {
    ztake: ztake,
};
exports.onChainOracles = {};
exports.default = {
    offChainOracles: exports.offChainOracles,
    onChainOracles: exports.onChainOracles,
};
//# sourceMappingURL=bsc.js.map