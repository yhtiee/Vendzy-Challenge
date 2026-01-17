import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsBoolean,
} from 'class-validator';

export class SingleInventoryResponseDto {
    @ApiProperty({ 
        example: 'prod_99', 
        description: 'The unique identifier of the product' 
    })
    @IsString()
    @IsNotEmpty()
    id: string;

    @ApiProperty({ 
        example: 'Flash Sale Gaming Mouse', 
        description: 'Display name of the product' 
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ 
        example: 15, 
        description: 'Current available stock in the warehouse' 
    })
    @IsNumber()
    @IsNotEmpty()
    stock: number;

    @ApiProperty({ 
        example: true, 
        description: 'Helper flag to let the UI know if it can be purchased' 
    })
    @IsBoolean()
    @IsNotEmpty()
    isAvailable: boolean;
}

export class InventoryResponseDto {
    @ApiProperty({ 
        type: [SingleInventoryResponseDto], 
        description: 'List of inventory items' 
    })
    @IsNotEmpty()
    items: SingleInventoryResponseDto[];
}