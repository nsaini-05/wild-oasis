import { useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { updateUser as updateuserAPI } from "../../services/apiAuth";
import toast from "react-hot-toast";
export const useUpdateuser = () => {
  const queryClient = useQueryClient();

  const { mutate: updateUser, isLoading: isUpdating } = useMutation({
    mutationFn: (updatedData) => updateuserAPI(updatedData),
    onSuccess: (data) => {
      toast.success("User Updated Successfully");
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      //   queryClient.setQueriesData("currentUser", data.user);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { updateUser, isUpdating };
};
