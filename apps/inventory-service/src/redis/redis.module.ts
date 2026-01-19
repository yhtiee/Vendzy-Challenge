import { Module, Global, OnApplicationShutdown } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import Redis from 'ioredis';

@Global()
@Module({
    providers: [
        {
            provide: 'REDIS_CLIENT',
            useFactory: () => {
                const redisClient = new Redis(process.env.REDIS_URL || 'redis://localhost:6379', {
                    retryStrategy: (times: number) => Math.min(times * 50, 2000),
                });

                redisClient.on('error', (error: Error) => console.error('Redis Client Error', error));

                return redisClient;
            },
        },
    ],
    exports: ['REDIS_CLIENT'],
})

export class RedisModule implements OnApplicationShutdown {
    constructor(private readonly moduleRef: ModuleRef) {}

    // Gracefully close the connection when the app stops
    async onApplicationShutdown() {
        const client = this.moduleRef.get<Redis>('REDIS_CLIENT');
        await client.quit();
    }
}