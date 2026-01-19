import { z } from "zod";

export const createOrderSchema = z.object({
    productId: z.string().min(1),
    quantity: z.number().min(1),
    userId: z.string(),
});

export type CreateOrderType = z.infer<typeof createOrderSchema>;