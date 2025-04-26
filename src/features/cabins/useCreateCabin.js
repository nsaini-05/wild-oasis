import { createCabin as createCabinAPI } from "../../services/apiCabins";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useCreateCabin = () => {
  const queryClient = useQueryClient();
  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationFn: createCabinAPI,
    onSuccess: () => {
      toast.success("New Cabin Successfully Created");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      //   reset();
    },
    onError: (err) => toast.error(err.message),
  });

  return { createCabin, isCreating };
};
