"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const redis = __importStar(require("redis"));
const client = redis.createClient();
client.on("error", function (err) {
    console.log("Error FROM REDIS " + err);
});
class Redis {
    constructor(host, port, errorHandler) {
        this.host = host;
        this.port = port;
        this.client = redis.createClient({
            host,
            port,
        });
        this.client.on('error', errorHandler);
    }
    setExpValue(key, value, expTimeInSec) {
        let stringifiedValue = '';
        if (typeof value === 'number' || typeof value === 'undefined') {
            stringifiedValue = String(value);
        }
        else if (typeof value === 'object') {
            stringifiedValue = JSON.stringify(value);
        }
        else {
            stringifiedValue = value;
        }
        return new Promise((resolve, reject) => {
            client.set(key, stringifiedValue, 'EX', expTimeInSec, (err, data) => {
                err ? reject(err) : resolve(data);
            });
        });
    }
    getValueByKey(key) {
        return new Promise((resolve, reject) => {
            client.get(key, (err, data) => {
                err ? reject(err) : resolve(data);
            });
        });
    }
    getConnectionString() {
        return `${this.host}:${this.port}`;
    }
}
exports.Redis = Redis;
//# sourceMappingURL=redis.service.js.map