import { Body, Controller, Get, HttpException, HttpStatus, Param, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { InventoryService } from "./inventory.service";
import { InventoryResponseDto, SingleInventoryResponseDto } from "./dto/inventory-response.dto";
import { ReserveDto } from "./dto/reserve.dto";

@Controller('inventory')
@ApiTags('Inventory')
export class InventoryController {
    constructor(
        private readonly inventoryService: InventoryService
    ){}

    @Get()
    @ApiOperation({ summary: 'Get all inventory items' })
    @ApiResponse({
        status: 200,
        description: 'All inventory items retrieved successfully',
        type: InventoryResponseDto
    })
    async getInventory(){
        try{
            return await this.inventoryService.getAllInventory();
        }catch(error){
            throw new HttpException(
                error.message,
                error.status || HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    @Get('/:id')
    @ApiOperation({ summary: 'Get a single inventory item' })
    @ApiResponse({
        status: 200,
        description: 'Single inventory item retrieved successfully',
        type: SingleInventoryResponseDto
    })
    async getSingleInventory(
        @Param('id') id: string
    ){
        try{
            return await this.inventoryService.getSingleInventory(id);
        }catch(error){
            throw new HttpException(
                error.message,
                error.status || HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    @Post('reserve')
    @ApiOperation({ summary: 'Reserve inventory for a product' })
    @ApiResponse({
        status: 200,
        description: 'Inventory reserved successfully',
    })
    @ApiResponse({
        status: 409,
        description: 'Out of stock.',
    })
    async reserve(
        @Body() reserveDto: ReserveDto
    ){
        try{
            return await this.inventoryService.reserveInventory(reserveDto);
        }catch(error){
            throw new HttpException(
                error.message,
                error.status || HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    @Post('seed')
    @ApiOperation({ summary: 'Seed inventory data' })
    @ApiResponse({
        status: 200,
        description: 'Inventory seeded successfully',
    })
    async seed(){
        try{
            return await this.inventoryService.seedInventoryData();
        }catch(error){
            throw new HttpException(
                error.message,
                error.status || HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
}