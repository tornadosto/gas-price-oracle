import { Config, EstimateOracle, EstimatedGasPrice, GasEstimationOptionsPayload } from './types';
export declare class Eip1559GasPriceOracle implements EstimateOracle {
    configuration: Config;
    private fetcher;
    private cache;
    private FEES_KEY;
    constructor({ fetcher, ...options }: GasEstimationOptionsPayload);
    estimateFees(fallbackGasPrices?: EstimatedGasPrice): Promise<EstimatedGasPrice>;
    private calculatePriorityFeeEstimate;
    private getPriorityFromChain;
    private calculateFees;
    private checkIsGreaterThanMax;
}
