"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onChainOracles = exports.offChainOracles = void 0;
var avalancheGasStation = {
    name: 'avalancheGasStation',
    url: 'https://gavax.blockscan.com/gasapi.ashx?apikey=key&method=gasoracle',
    instantPropertyName: 'FastGasPrice',
    fastPropertyName: 'FastGasPrice',
    standardPropertyName: 'ProposeGasPrice',
    lowPropertyName: 'SafeGasPrice',
    denominator: 1,
    additionalDataProperty: 'result',
};
exports.offChainOracles = {
    avalancheGasStation: avalancheGasStation,
};
exports.onChainOracles = {};
exports.default = {
    offChainOracles: exports.offChainOracles,
    onChainOracles: exports.onChainOracles,
};
//# sourceMappingURL=avax.js.map