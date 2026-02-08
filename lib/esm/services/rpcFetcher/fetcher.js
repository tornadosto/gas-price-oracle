var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import axios from 'axios';
export class RpcFetcher {
    constructor(rpc, timeout) {
        this.rpc = rpc;
        this.timeout = timeout;
    }
    makeRpcCall({ rpc, timeout, method, params }) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = {
                method,
                id: 1337,
                jsonrpc: '2.0',
                params: params,
            };
            return yield axios.post(rpc || this.rpc, body, { timeout: timeout || this.timeout });
        });
    }
}
//# sourceMappingURL=fetcher.js.map