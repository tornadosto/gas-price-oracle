import bscOracles from './bsc';
import xdaiOracles from './xdai';
import avalancheOracles from './avax';
import mainnetOracles from './mainnet';
import polygonOracles from './polygon';
import optimismOracles from './optimism';
import arbitrumOracles from './arbitrum';
export var ChainId;
(function (ChainId) {
    ChainId[ChainId["MAINNET"] = 1] = "MAINNET";
    ChainId[ChainId["BSC"] = 56] = "BSC";
    ChainId[ChainId["XDAI"] = 100] = "XDAI";
    ChainId[ChainId["POLYGON"] = 137] = "POLYGON";
    ChainId[ChainId["OPTIMISM"] = 10] = "OPTIMISM";
    ChainId[ChainId["ARBITRUM"] = 42161] = "ARBITRUM";
    ChainId[ChainId["AVAX"] = 43114] = "AVAX";
})(ChainId || (ChainId = {}));
export const NETWORKS = {
    [ChainId.MAINNET]: {
        oracles: mainnetOracles,
        rpcUrl: 'https://api.mycryptoapi.com/eth',
        defaultGasPrice: 22,
        maxGasPrice: 1500,
        blocksCount: 10,
        percentile: 5,
    },
    [ChainId.BSC]: {
        oracles: bscOracles,
        rpcUrl: 'https://bsc-dataseed1.ninicoin.io',
        defaultGasPrice: 5,
        maxGasPrice: 200,
        blocksCount: 10,
        percentile: 5,
    },
    [ChainId.XDAI]: {
        oracles: xdaiOracles,
        rpcUrl: 'https://rpc.gnosischain.com',
        defaultGasPrice: 5,
        maxGasPrice: 200,
        blocksCount: 200,
        percentile: 5,
    },
    [ChainId.POLYGON]: {
        oracles: polygonOracles,
        rpcUrl: 'https://rpc-mainnet.maticvigil.com',
        defaultGasPrice: 75,
        maxGasPrice: 1000,
        blocksCount: 10,
        percentile: 5,
    },
    [ChainId.OPTIMISM]: {
        oracles: optimismOracles,
        rpcUrl: 'https://mainnet.optimism.io',
        defaultGasPrice: 0.001,
        maxGasPrice: 5,
        blocksCount: 10,
        percentile: 5,
    },
    [ChainId.ARBITRUM]: {
        oracles: arbitrumOracles,
        rpcUrl: 'https://arb1.arbitrum.io/rpc',
        defaultGasPrice: 3,
        maxGasPrice: 15,
        blocksCount: 10,
        percentile: 5,
    },
    [ChainId.AVAX]: {
        oracles: avalancheOracles,
        rpcUrl: 'https://api.avax.network/ext/bc/C/rpc',
        defaultGasPrice: 50,
        maxGasPrice: 1000,
        blocksCount: 10,
        percentile: 5,
    },
};
//# sourceMappingURL=index.js.map