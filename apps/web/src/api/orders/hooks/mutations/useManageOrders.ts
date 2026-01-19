import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { queryKeys } from "../../../query-keys";
import { createOrder } from "../../services/api";
import { CreateOrderType } from "../../validation";

export const useCreateOrder = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: CreateOrderType) => createOrder(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [queryKeys.ORDERS] });
            queryClient.invalidateQueries({ queryKey: [queryKeys.INVENTORY] });
            toast.success("Order created successfully");
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || "Failed to create order");
        },
    });
};
