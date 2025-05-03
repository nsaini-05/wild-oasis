import { useParams } from "react-router";
import { getBooking } from "../../services/apiBookings";
import { useQuery } from "@tanstack/react-query";

export const useBooking = () => {
  const { bookingId } = useParams();
  console.log(bookingId);
  const {
    isLoading,
    data: booking,
    error,
  } = useQuery({
    queryKey: ["booking"],
    queryFn: () => getBooking(bookingId),
    retry: false,
  });

  return { error, booking, isLoading };
};
