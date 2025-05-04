import toast from "react-hot-toast";
import { login as loginApi } from "../../services/apiAuth";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
export const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: login, isLoading: loading } = useMutation({
    mutationFn: (userCredentials) => {
      return loginApi(userCredentials);
    },
    onSuccess: ({ user }) => {
      console.log(user);
      queryClient.setQueryData("currentUser", user);
      toast.success("Use Loggedin Successfully");
      navigate("/dashboard");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { loading, login };
};
