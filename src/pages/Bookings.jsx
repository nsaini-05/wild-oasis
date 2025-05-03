import Heading from "../ui/Heading";
import Row from "../ui/Row";
import BookingTable from "../features/bookings/BookingTable";
import Spinner from "../ui/Spinner";
import { useBookings } from "../features/bookings/useBookings";
import BookingTableOperations from "../features/bookings/BookingTableOperations";
function Bookings() {
  const { isLoading, bookings, count } = useBookings();
  if (isLoading) return <Spinner />;
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All bookings</Heading>
        <BookingTableOperations />
      </Row>
      <BookingTable bookings={bookings} count={count} />
    </>
  );
}

export default Bookings;
