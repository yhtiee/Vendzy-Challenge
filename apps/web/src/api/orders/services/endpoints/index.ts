export const ORDERS = `${process.env.NEXT_PUBLIC_ORDER_SERVICE_URL}/orders`;
export const CREATE_ORDER = `${process.env.NEXT_PUBLIC_ORDER_SERVICE_URL}/orders`;

export const GET_SINGLE_ORDER = (id: string) => {
    return `${process.env.ORDER_SERVICE_URL}/orders/${id}`;
}