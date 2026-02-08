"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NETWORKS = exports.ChainId = void 0;
var bsc_1 = __importDefault(require("./bsc"));
var xdai_1 = __importDefault(require("./xdai"));
var avax_1 = __importDefault(require("./avax"));
var mainnet_1 = __importDefault(require("./mainnet"));
var polygon_1 = __importDefault(require("./polygon"));
var optimism_1 = __importDefault(require("./optimism"));
var arbitrum_1 = __importDefault(require("./arbitrum"));
var ChainId;
(function (ChainId) {
    ChainId[ChainId["MAINNET"] = 1] = "MAINNET";
    ChainId[ChainId["BSC"] = 56] = "BSC";
    ChainId[ChainId["XDAI"] = 100] = "XDAI";
    ChainId[ChainId["POLYGON"] = 137] = "POLYGON";
    ChainId[ChainId["OPTIMISM"] = 10] = "OPTIMISM";
    ChainId[ChainId["ARBITRUM"] = 42161] = "ARBITRUM";
    ChainId[ChainId["AVAX"] = 43114] = "AVAX";
})(ChainId = exports.ChainId || (exports.ChainId = {}));
exports.NETWORKS = (_a = {},
    _a[ChainId.MAINNET] = {
        oracles: mainnet_1.default,
        rpcUrl: 'https://api.mycryptoapi.com/eth',
        defaultGasPrice: 22,
        maxGasPrice: 1500,
        blocksCount: 10,
        percentile: 5,
    },
    _a[ChainId.BSC] = {
        oracles: bsc_1.default,
        rpcUrl: 'https://bsc-dataseed1.ninicoin.io',
        defaultGasPrice: 5,
        maxGasPrice: 200,
        blocksCount: 10,
        percentile: 5,
    },
    _a[ChainId.XDAI] = {
        oracles: xdai_1.default,
        rpcUrl: 'https://rpc.gnosischain.com',
        defaultGasPrice: 5,
        maxGasPrice: 200,
        blocksCount: 200,
        percentile: 5,
    },
    _a[ChainId.POLYGON] = {
        oracles: polygon_1.default,
        rpcUrl: 'https://rpc-mainnet.maticvigil.com',
        defaultGasPrice: 75,
        maxGasPrice: 1000,
        blocksCount: 10,
        percentile: 5,
    },
    _a[ChainId.OPTIMISM] = {
        oracles: optimism_1.default,
        rpcUrl: 'https://mainnet.optimism.io',
        defaultGasPrice: 0.001,
        maxGasPrice: 5,
        blocksCount: 10,
        percentile: 5,
    },
    _a[ChainId.ARBITRUM] = {
        oracles: arbitrum_1.default,
        rpcUrl: 'https://arb1.arbitrum.io/rpc',
        defaultGasPrice: 3,
        maxGasPrice: 15,
        blocksCount: 10,
        percentile: 5,
    },
    _a[ChainId.AVAX] = {
        oracles: avax_1.default,
        rpcUrl: 'https://api.avax.network/ext/bc/C/rpc',
        defaultGasPrice: 50,
        maxGasPrice: 1000,
        blocksCount: 10,
        percentile: 5,
    },
    _a);
//# sourceMappingURL=index.js.map