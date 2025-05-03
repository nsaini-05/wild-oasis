import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";
export const useUser = () => {
  const { isLoading: loading, data } = useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
  });

  return { loading, data, isAuthenticated: data?.role === "authenticated" };
};
