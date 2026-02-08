const avalancheGasStation = {
    name: 'avalancheGasStation',
    url: 'https://gavax.blockscan.com/gasapi.ashx?apikey=key&method=gasoracle',
    instantPropertyName: 'FastGasPrice',
    fastPropertyName: 'FastGasPrice',
    standardPropertyName: 'ProposeGasPrice',
    lowPropertyName: 'SafeGasPrice',
    denominator: 1,
    additionalDataProperty: 'result',
};
export const offChainOracles = {
    avalancheGasStation,
};
export const onChainOracles = {};
export default {
    offChainOracles,
    onChainOracles,
};
//# sourceMappingURL=avax.js.map