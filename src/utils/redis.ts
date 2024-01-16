import { createClient, RedisClientType, RedisClientOptions } from 'redis';

// Redis server connection options
const redisOptions: RedisClientOptions = {
    url: `redis://:foobared@localhost:6379`
};

class RedisClient {
    private client: any;

    constructor() {
        this.initialize();
    }

    async initialize() {
        this.client = await createClient(redisOptions)
            .on('error', err => console.log('Redis Client Error', err))
            .connect();
    }

    async set(key: string, value: string) {
        this.client.set(key, value);
    }

    async get(key: string) {
        return this.client.get(key);
    }
}

export const redisClient = new RedisClient();

