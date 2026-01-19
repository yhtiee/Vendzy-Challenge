import { useQuery } from "@tanstack/react-query";
import { getAllOrders, getSingleOrder } from "../../services/api";
import { queryKeys } from "../../../query-keys";

export const useGetAllOrders = () => {
    return useQuery({
        queryKey: [queryKeys.ORDERS],
        queryFn: getAllOrders,
    });
};

export const useGetSingleOrder = (id: string) => {
    return useQuery({
        queryKey: [queryKeys.ORDERS, id],
        queryFn: () => getSingleOrder(id),
    });
};
