import moment from "moment";
import { IoCalendarClearOutline } from "react-icons/io5";
import "moment/locale/de";

const ShowDate = () => {
  return (
    <div className="border w-[200px] flex gap-1 items-center px-2 rounded-lg">
      <IoCalendarClearOutline /> {moment().format("DD MMM YYYY")}
    </div>
  );
};

export default ShowDate;
