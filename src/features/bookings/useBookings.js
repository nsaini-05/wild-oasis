import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router";
export const useBookings = () => {
  const [searchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page") || 1);
  const filterValue = searchParams.get("status") || "all";

  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue, method: "eq" };

  const sortByRow = searchParams.get("sortBy") || "startDate-asc";

  const [field, direction] = sortByRow.split("-");
  const sortBy = { field, direction };

  const {
    isLoading,
    data: { data: bookings, count } = {},
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy, currentPage],
    queryFn: () =>
      getBookings({
        filter,
        sortBy,
        currentPage,
      }),
  });

  return { isLoading, bookings, error, count };
};
