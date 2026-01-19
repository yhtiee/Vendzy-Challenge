import { ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { CreateOrderDto } from "./dto/orders.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Order } from "./orders.entity";
import { Repository } from "typeorm";
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from "rxjs";

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(Order)
        private orderRepo: Repository<Order>,
        private readonly httpService: HttpService
    ){}

    async createOrder(createOrderDto: CreateOrderDto){
        const { productId, quantity, userId } = createOrderDto;
        const id = productId

        // So we need to handle the commuincation with the inventory service here.
        // How was this done? used the HttpService from @nestjs/axios to make HTTP requests.
        // Wrapping the request with firrstValueFrom allows us to handle it like a promise so we can await it.
        const inventoryUrl = process.env.INVENTORY_SERVICE_URL || 'http://localhost:3001/api/inventory/reserve';
        try {
            await firstValueFrom(
                this.httpService.post(inventoryUrl, { id, quantity })
            );
        } catch (error) {
            // For erros we are expecting two partcular types a. if the product is out of stock b. if the inventory service has crashed  or is unreachable
            if (error.response?.status === 409) {
                throw new ConflictException('Out of stock');
            }

            throw new InternalServerErrorException('Inventory service is currently unavailable. Please try again later.');
        }

        const newOrder = this.orderRepo.create({
            productId,
            userId,
            quantity,
            status: 'COMPLETED',
        });

        return await this.orderRepo.save(newOrder);
    }

    async allOrders(){
        const orders = await this.orderRepo.find(
            {
                order: {
                    createdAt: 'DESC'
                }
            }
        );

        return orders;
    }

    async singleOrder(id: string){
        const order = await this.orderRepo.findOne({
            where: {
                id: id
            }
        });

        if(!order){
            throw new Error('Order not found');
        }

        return order;
    }
}