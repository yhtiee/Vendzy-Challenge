import { useQuery } from "@tanstack/react-query";
import { getAllInventory, getSingleInventory } from "../../services/api";
import { queryKeys } from "../../../query-keys";

export const useGetInventory = () => {
  return useQuery({
    queryKey: [queryKeys.INVENTORY],
    queryFn: getAllInventory,
    refetchInterval: 3000  // polling every 3 second 
  });
};

export const useGetSingleInventory = (id: string) => {
  return useQuery({
    queryKey: [queryKeys.SINGLE_INVENTORY, id],
    queryFn: () => getSingleInventory(id),
  });
};