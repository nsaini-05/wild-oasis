import { useMutation } from "@tanstack/react-query";
import { logout as logoutAPI } from "../../services/apiAuth";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
export const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: logout, isLoading: loading } = useMutation({
    mutationFn: () => logoutAPI(),
    onSuccess: () => {
      navigate("/login", { replace: true });
      queryClient.removeQueries();
    },
    onError: (error) => toast.error(error.message),
  });
  return { logout, loading };
};
