import { Options } from 'node-cache';
export declare class NodeJSCache<T> {
    private nodeCache;
    constructor(params: Options);
    get(key: string): Promise<T | undefined>;
    set(key: string, value: T): Promise<boolean>;
    has(key: string): Promise<boolean>;
}
