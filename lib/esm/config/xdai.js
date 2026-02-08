const blockscout = {
    name: 'blockscout',
    url: 'https://gnosis.blockscout.com/api/v1/gas-price-oracle',
    instantPropertyName: 'fast',
    fastPropertyName: 'average',
    standardPropertyName: 'slow',
    lowPropertyName: 'slow',
    denominator: 1,
    additionalDataProperty: null,
};
export const offChainOracles = {
    blockscout,
};
export const onChainOracles = {};
export default {
    offChainOracles,
    onChainOracles,
};
//# sourceMappingURL=xdai.js.map