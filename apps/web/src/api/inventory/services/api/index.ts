import { GetInventoryResponse, GetSingleInventoryResponse } from "../../../types";
import { INVENTORY } from "../endpoints";
import axios from 'axios';

export const getAllInventory = async (): Promise<GetInventoryResponse> => {
    return axios.get(INVENTORY);
};

export const seedInventory = async () => {
    return axios.post(`${INVENTORY}/seed`);
};

export const getSingleInventory = async (id: string): Promise<GetSingleInventoryResponse> => {
    return axios.get(`${INVENTORY}/${id}`);
};