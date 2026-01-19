import axios from "axios";
import { CreateOrderType } from "../../validation";
import { CREATE_ORDER, ORDERS } from "../endpoints";
import { GetOrdersResponse, GetSingleOrderResponse } from "../../../types";

export const createOrder = async (
    payload: CreateOrderType
): Promise<GetSingleOrderResponse> => {
    return axios.post(CREATE_ORDER, payload)
}

export const getAllOrders = async (): Promise<GetOrdersResponse> => {
    return axios.get(ORDERS)
}

export const getSingleOrder = async (id: string): Promise<GetSingleOrderResponse> => {
    return axios.get(`${ORDERS}/${id}`)
}