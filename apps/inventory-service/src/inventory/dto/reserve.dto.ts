import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class ReserveDto {
    @ApiProperty({
        example: 'prod_99',
        description: 'The unique identifier of the product to reserve'
    })
    @IsString()
    @IsNotEmpty()
    id: string;

    @ApiProperty({
        example: 2,
        description: 'The quantity of the product to reserve'
    })
    @IsNumber()
    @IsNotEmpty()
    quantity: number;
}