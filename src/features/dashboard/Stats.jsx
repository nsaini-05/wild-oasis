import Stat from "./Stat";
import { HiOutlineBriefcase } from "react-icons/hi";
import { HiOutlineBanknotes } from "react-icons/hi2";
import { HiOutlineCalendarDays } from "react-icons/hi2";
import { HiOutlineChartBar } from "react-icons/hi";
function Stats({ bookings, confirmedStays }) {
  console.log(confirmedStays);
  const numBookings = bookings.length;
  const numConfirmedStays = confirmedStays.length;
  return (
    <>
      <Stat
        title="Bookings"
        value={numBookings}
        icon={<HiOutlineBriefcase></HiOutlineBriefcase>}
        color={"blue"}
      ></Stat>
      <Stat
        title="Sales"
        value={numBookings}
        icon={<HiOutlineBanknotes></HiOutlineBanknotes>}
        color={"green"}
      ></Stat>
      <Stat
        title="Check ins"
        value={numBookings}
        icon={<HiOutlineCalendarDays></HiOutlineCalendarDays>}
        color={"indigo"}
      ></Stat>
      <Stat
        title="Occupancy Rate"
        value={numBookings}
        icon={<HiOutlineChartBar></HiOutlineChartBar>}
        color={"blue"}
      ></Stat>
    </>
  );
}

export default Stats;
