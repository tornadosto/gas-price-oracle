import BigNumber from 'bignumber.js';
import { FeeHistory } from '../../types';
import { RpcFetcher } from '../../services';
export declare type EstimatedGasPrice = {
    maxFeePerGas: number;
    baseFee: number | undefined;
    maxPriorityFeePerGas: number;
};
export declare type EstimateFeesParams = {
    blocksCount: number;
    percentile: number;
};
export declare type CalculateFeesParams = {
    baseFee: BigNumber;
    feeHistory?: FeeHistory;
};
export declare type Options = {
    chainId?: number;
    blocksCount?: number;
    percentile?: number;
    blockTime?: number;
    shouldCache?: boolean;
    fallbackGasPrices: EstimatedGasPrice | undefined;
};
export declare type GasEstimationOptionsPayload = Options & {
    fetcher: RpcFetcher;
};
export declare type Config = Required<Options> & {
    fallbackGasPrices?: EstimatedGasPrice;
    minPriority: number;
};
export declare abstract class EstimateOracle {
    configuration: Config;
    abstract estimateFees(fallbackGasPrices?: EstimatedGasPrice): Promise<EstimatedGasPrice>;
}
