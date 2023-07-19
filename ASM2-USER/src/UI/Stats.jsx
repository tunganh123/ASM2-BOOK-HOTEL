import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import Stat from "./Stat";
function Stats({ users, orders, earning, balance }) {
  return (
    <>
      <Stat
        title="Users"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={users}
      />
      <Stat
        title="Orders"
        color="green"
        icon={<HiOutlineCalendarDays />}
        value={orders}
      />
      <Stat
        title="Earnings"
        color="indigo"
        icon={< HiOutlineBanknotes />}
        value={earning}
      />
      <Stat
        title="Balance"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={balance + "%"}
      />
    </>
  );
}

export default Stats;
