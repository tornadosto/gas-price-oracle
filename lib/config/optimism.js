"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onChainOracles = exports.offChainOracles = void 0;
exports.offChainOracles = {};
var optimism = {
    name: 'optimism',
    callData: '0xfe173b97',
    denominator: '1000000000',
    contract: '0x420000000000000000000000000000000000000F',
};
exports.onChainOracles = {
    optimism: optimism,
};
exports.default = {
    offChainOracles: exports.offChainOracles,
    onChainOracles: exports.onChainOracles,
};
//# sourceMappingURL=optimism.js.map