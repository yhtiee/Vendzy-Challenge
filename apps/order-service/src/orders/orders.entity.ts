import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('orders')
export class Order {
    @ApiProperty({
        description: 'Unique identifier for the order',
        example: 'order_12345',
    })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({
        description: 'ID of the product being ordered',
        example: 'prod_67890',
    })
    @Column()
    productId: string;

    @ApiProperty({
        description: 'ID of the user who placed the order',
        example: 'user_12345',
    })
    @Column({nullable: true})
    userId: string;

    @ApiProperty({
        description: 'Quantity of the product ordered',
        example: 2,
    })
    @Column({ type: 'int' })
    quantity: number;

    @ApiProperty({
        description: 'Status of the order',
        example: 'COMPLETED',
    })
    @Column({ default: 'COMPLETED' })
    status: string;

    @ApiProperty({
        description: 'Timestamp when the order was created',
        example: '2024-06-15T12:34:56.789Z',
    })
    @CreateDateColumn()
    createdAt: Date;
}