import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router";
import { useQueryClient } from "@tanstack/react-query";
import { PAGE_SIZE } from "../../utils/constants";
export const useBookings = () => {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  //Pagination
  const currentPage = Number(searchParams.get("page") || 1);
  const filterValue = searchParams.get("status") || "all";
  // Deciding Filter
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue, method: "eq" };

  // Sorting
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
  const PageCount = Math.ceil(count / PAGE_SIZE);
  // Pre-Fetching
  if (currentPage < PageCount) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, currentPage + 1],
      queryFn: () =>
        getBookings({
          filter,
          sortBy,
          currentPage: currentPage + 1,
        }),
    });
  }

  if (currentPage > 1) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, currentPage - 1],
      queryFn: () =>
        getBookings({
          filter,
          sortBy,
          currentPage: currentPage - 1,
        }),
    });
  }

  return { isLoading, bookings, error, count };
};
