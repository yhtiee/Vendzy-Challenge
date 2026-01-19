import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../../query-keys";
import { seedInventory } from "../../services/api";
import { toast } from "sonner";

export const useSeedInventory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: seedInventory,
    onSuccess: () => {
        toast.success("Inventory has been seeded successfully");
        queryClient.invalidateQueries({ queryKey: [queryKeys.INVENTORY]});
    },
    onError: (error: any) => {
        toast.error(error?.response?.data?.message || "Failed to seed inventory");
    },
  });
};