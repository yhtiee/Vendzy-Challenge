import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { HttpModule } from "@nestjs/axios";
import { Order } from "./orders.entity";
import { OrdersService } from "./orders.service";
import { OrdersControllers } from "./orders.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Order]), HttpModule],
    controllers: [OrdersControllers],
    providers: [OrdersService],
    exports: [],
})
export class OrdersModule {}
