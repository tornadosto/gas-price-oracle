const maticGasStation = {
    name: 'maticGasStation',
    url: 'https://gasstation.polygon.technology/v2',
    instantPropertyName: 'fast.maxFee',
    fastPropertyName: 'fast.maxFee',
    standardPropertyName: 'standard.maxFee',
    lowPropertyName: 'safeLow.maxFee',
    denominator: 1,
    additionalDataProperty: null,
};
const tornadoMaticGasStation = {
    name: 'tornadoMGasStation',
    url: 'https://matic-gas-station.tornado.ws',
    instantPropertyName: 'standard',
    fastPropertyName: 'standard',
    standardPropertyName: 'safeLow',
    lowPropertyName: 'safeLow',
    denominator: 1,
    additionalDataProperty: null,
};
export const offChainOracles = {
    maticGasStation,
    tornadoMaticGasStation,
};
export const onChainOracles = {};
export default {
    offChainOracles,
    onChainOracles,
};
//# sourceMappingURL=polygon.js.map