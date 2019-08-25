import * as redis from 'redis';

const client = redis.createClient();
client.on("error", function (err) {
    console.log("Error FROM REDIS " + err);
});

export class Redis {
    private host: string;
    private port: number;
    private client: redis.RedisClient;

    constructor(host: string, port: number, errorHandler: (err: Error) => void) {
        this.host = host;
        this.port = port;
        this.client = redis.createClient({
            host,
            port,
        });

        this.client.on('error', errorHandler);
    }

    public setExpValue(key: string, value: string | object | number, expTimeInSec: number): Promise<string> {
        let stringifiedValue = '';

        if (typeof value === 'number' || typeof value === 'undefined') {
            stringifiedValue = String(value);
        } else if  (typeof value === 'object') {
            stringifiedValue = JSON.stringify(value);
        } else {
            stringifiedValue = value;
        }
        
        return new Promise((resolve: Function, reject: Function) => {
            client.set(key, stringifiedValue, 'EX', expTimeInSec, (err: Error, data: string) => {
                err ? reject(err) : resolve(data);
            });
        });
    }

    public getValueByKey(key: string): Promise<string>  {
        return new Promise((resolve: Function, reject: Function) => {
            client.get(key, (err: Error, data: string) => {
                err ? reject(err) : resolve(data);
            });
        })
    }

    public getConnectionString(): string {
        return `${this.host}:${this.port}`;
    }
}
