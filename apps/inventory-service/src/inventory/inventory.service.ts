import { ConflictException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { ReserveDto } from "./dto/reserve.dto";
import Redis from "ioredis";

@Injectable()
export class InventoryService {
    constructor(
        @Inject('REDIS_CLIENT') private readonly redisClient: Redis
    ) {}

    async getAllInventory() {
        const keys = await this.redisClient.keys('stock:*');
        if (keys.length === 0) return [];

        const values = await this.redisClient.mget(keys);

        const inventory =  keys.map(async (key, index) => ({
            id: key.split(':')[1],
            name: await this.redisClient.get(`name:${key.split(':')[1]}`),
            stock: parseInt(values[index] || '0', 10),
            isAvailable: parseInt(values[index] || '0', 10) > 0,
        }));

        return await Promise.all(inventory);
    }

    async getSingleInventory(inventoryId: string) {
        const stock = await this.redisClient.get(`stock:${inventoryId}`);
        const name = await this.redisClient.get(`name:${inventoryId}`);

        if (stock === null) {
            throw new NotFoundException(`Product with ID ${inventoryId} not found`);
        }

        // Build inventory data object
        const inventoryData = {
            id: inventoryId,
            name: name,
            stock: parseInt(stock, 10),
            isAvailable: parseInt(stock, 10) > 0,
        };

        return inventoryData;
    }

    async reserveInventory(reserveDto: ReserveDto) {
        const { id, quantity } = reserveDto;
        const key = `stock:${id}`;

        // How do we handle the race condition?
        // With redis we can use a luaScrpt because redis will execute the request atomically (one at a time)
        const luaScript = `
            local currentStock = tonumber(redis.call('get', KEYS[1]) or "0")
            local requested = tonumber(ARGV[1])
            
            if currentStock >= requested then
                redis.call('decrby', KEYS[1], requested)
                return 1
            else
                return 0
            end
        `;

        const result = await this.redisClient.eval(luaScript, 1, key, quantity);

        // A zero result means we couldn't reserve the stock i.e the product is out of stock
        if (result === 0) {
            throw new ConflictException('Out of stock.');
        }

        return {
            success: true,
            message: `${quantity} unit(s) reserved successfully`,
        };
    }

    async seedInventoryData() {

        // Mock data of products to seed
        const products = [
            { id: 'prod-flash-1', name: 'Ultra Gaming Mouse', stock: 10 },
            { id: 'prod-flash-2', name: 'Mechanical Keyboard', stock: 5 },
        ];

        for (const p of products) {
            // Overwrite existing data for a fresh start
            await this.redisClient.set(`stock:${p.id}`, p.stock);
            await this.redisClient.set(`name:${p.id}`, p.name);
        }

        return { message: 'Seeded successfully', products };
    }

    async onModuleInit() {
        console.log('Auto-seeding inventory data on module init...');
        await this.seedInventoryData();
    }
}