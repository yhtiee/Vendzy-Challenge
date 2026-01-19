import { IsString, IsInt, Min, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
    @ApiProperty({ 
        description: 'ID of the product being ordered',
        example: 'prod-flash-1' 
    })
    @IsString()
    @IsNotEmpty()
    productId: string;

    @ApiProperty({ 
        description: 'Quantity of the product ordered',
        example: 1
    })
    @IsInt()
    @Min(1)
    quantity: number;

    @ApiProperty({ 
        description: 'ID of the user who placed the order',
        example: 'user-123' 
    })
    @IsString()
    @IsNotEmpty()
    userId: string;
}