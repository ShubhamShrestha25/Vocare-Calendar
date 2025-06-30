import moment from "moment";
import { CiClock2, CiLocationOn } from "react-icons/ci";
import { MdOutlineMessage } from "react-icons/md";
import { findCategoryDetails, isAppointmentEnded } from "@/utils/helper";

const MonthSidebar = ({ appointments, categories, selectedDate }) => {
  const dayLabel = selectedDate
    ? moment(selectedDate).format("dddd, DD. MMM")
    : moment().format("dddd, DD. MMM");

  return (
    <div className="w-[20%] border-l border-gray-200">
      <h1 className="text-xl px-5 pt-2 font-bold">{dayLabel}</h1>
      <div className="m-4 p-4 space-y-3 border-t">
        {appointments.length === 0 ? (
          <p className="text-gray-500">Keine Termine für diesen Tag.</p>
        ) : (
          appointments.map((appoint) => {
            const category = findCategoryDetails(categories, appoint.category);
            return (
              <div className="flex" key={appoint.id}>
                <div
                  className="w-2 rounded-l-md"
                  style={{ backgroundColor: category?.color || "transparent" }}
                />
                <div className="w-full bg-gray-300 rounded-r-md p-2 space-y-1 text-sm">
                  <div
                    className={`font-semibold text-base ${
                      isAppointmentEnded(appoint.end) ? "line-through" : ""
                    }`}
                  >
                    {category.name}
                  </div>
                  <div className="flex items-center gap-1">
                    <CiClock2 />
                    <span>
                      {moment(appoint.start).format("HH:mm")} -{" "}
                      {moment(appoint.end).format("HH:mm")} Uhr
                    </span>
                  </div>
                  {appoint.location && (
                    <div className="flex items-center gap-1">
                      <CiLocationOn />
                      <span>{appoint.location}</span>
                    </div>
                  )}
                  {appoint.notes && (
                    <div className="flex items-start gap-1 line-clamp-3">
                      <MdOutlineMessage className="mt-0.5" />
                      <span>{appoint.notes}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default MonthSidebar;
