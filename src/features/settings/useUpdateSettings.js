import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting } from "../../services/apiSettings";
import toast from "react-hot-toast";
export const useUpdateSettings = () => {
  const queryClient = useQueryClient();
  const { mutate: updateSettings, isLoading: isUpdating } = useMutation({
    mutationFn: (updatedSettingObject) => updateSetting(updatedSettingObject),
    onSuccess: () => {
      toast.success("Settings Edited Successfully");
      queryClient.invalidateQueries(["settings"]);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { updateSettings, isUpdating };
};
