import { createClient, RedisClientOptions, RedisClientType } from 'redis';

// Redis server connection options
const redisOptions: RedisClientOptions = {
    url: `redis://:foobared@localhost:6379`
};

export default class RedisClient {
    private client: any;

    async connect() {
        return this.client = await createClient(redisOptions)
            .on('error', err => console.log('Redis Client Error', err))
            .connect();
    }

    async set(key: string, value: string) {
        this.client.set(key, value);
    }

    async get(key: string) {
        return this.client.get(key);
    }

    async publish(channel: string, msg: any) {
        return this.client.publish(channel, msg);
    }

    async subscribe(channel: string, listener: any) {
        return this.client.subscribe(channel, listener);
    }

    async enqueue(queue: string, msg: string) {
        return this.client.rPush(queue, [msg]);
    }

    async dequeue(queue: string) {
        return this.client.blPop(queue);
    }
}


