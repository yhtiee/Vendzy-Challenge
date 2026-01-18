import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Param, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { OrdersService } from "./orders.service";
import { Order } from "./orders.entity";
import { CreateOrderDto } from "./dto/orders.dto";

@Controller("orders")
@ApiTags("orders")
export class OrdersControllers {
    constructor(
        private readonly ordersService: OrdersService
    ){}


    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({
        summary: 'Place a new order',
        description: 'Creates a new order in the system.'
    })
    @ApiResponse({
        status: 201,
        description: 'Order successfully created.',
        type: Order
    })
    @ApiResponse({
        status: 409.,
        description: 'Out of Stock'
    })
    async placeOrder(
        @Body() createOrderDto: CreateOrderDto
    ){
        try{
            return await this.ordersService.createOrder(createOrderDto);
        }catch(error){
            throw new HttpException(
                error.message,
                error.status || HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    @Get()
    @ApiOperation({
        summary: 'Get all orders',
        description: 'Retrieves all orders from the system.'
    })
    @ApiResponse({
        status: 200,
        description: 'Orders successfully retrieved.',
        type: [Order],
        isArray: true
    })
    async getAllOrders(){
        try{
            return await this.ordersService.allOrders();
        }catch(error){
            throw new HttpException(
                error.message,
                error.status || HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    @Get("/:id")
    @ApiOperation({
        summary: 'Get a single order',
        description: 'Retrieves a single order by its ID.'
    })
    @ApiResponse({
        status: 200,
        description: 'Order successfully retrieved.',
        type: Order
    })
    async getSingleOrder(
        @Param("id") id: string
    ){
        try{
            return await this.ordersService.singleOrder(id);
        }catch(error){
            throw new HttpException(
                error.message,
                error.status || HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
}