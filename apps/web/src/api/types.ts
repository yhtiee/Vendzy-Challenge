export interface InventoryItem {
    id: string;
    name: string;
    stock: number;
    isAvailable: boolean;
}

export interface OrderItem {
    id: string;
    productId: string;
    userId: string;
    quantity: number;
    status: string;
    createdAt: string;
}

export interface GetInventoryResponse {
    data: InventoryItem[];
}

export interface GetSingleInventoryResponse {
    data: InventoryItem;
}

export interface GetOrdersResponse {
    data: OrderItem[];
}

export interface GetSingleOrderResponse {
    data: OrderItem;
}