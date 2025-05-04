import { useMutation } from "@tanstack/react-query";
import { signUp as signUpAPI } from "../../services/apiAuth";
import toast from "react-hot-toast";
export const useSignUp = () => {
  const { mutate: signUp, isLoading: loading } = useMutation({
    mutationFn: (userData) => signUpAPI(userData),
    onSuccess: () => toast.success("User Created Successfully"),
  });

  return { signUp, loading };
};
