import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/ui/hover-card";
import {
  findCategoryDetails,
  findPatientDetails,
  isAppointmentEnded,
} from "@/utils/helper";
import { CiClock2, CiLocationOn } from "react-icons/ci";
import { MdOutlineMessage } from "react-icons/md";
import { FaUserInjured } from "react-icons/fa6";
import moment from "moment";

const MonthEventCard = ({ info, categories, patients }) => {
  const { event } = info;
  const category = findCategoryDetails(
    categories,
    event.extendedProps.category
  );
  const patient = findPatientDetails(patients, event.extendedProps.patient);

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div className="flex w-full mx-2 cursor-pointer">
          <div
            className="w-2 rounded-l-md"
            style={{ backgroundColor: category.color }}
          />
          <div
            className={`w-full bg-gray-200 p-2 font-semibold text-base rounded-r-md line-clamp-1 ${
              isAppointmentEnded(event.end) ? "line-through" : ""
            }`}
          >
            {category.name}
          </div>
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-60 p-4 bg-white space-y-2">
        <p className="line-clamp-1">{event.title}</p>
        <div className="flex items-center gap-1 text-sm">
          <CiClock2 />
          <span>
            {moment(event.start).format("HH:mm")} bis{" "}
            {moment(event.end).format("HH:mm")} Uhr
          </span>
        </div>
        <div className="flex items-center gap-1 text-sm">
          <FaUserInjured />
          <span>
            {patient.name}{" "}
            <span className="text-xs">(care-level: {patient.carelevel})</span>
          </span>
        </div>
        {event.extendedProps.location && (
          <div className="flex items-center gap-1 text-sm">
            <CiLocationOn />
            <span>{event.extendedProps.location}</span>
          </div>
        )}
        {event.extendedProps.notes && (
          <div className="flex items-start gap-1 text-sm line-clamp-3">
            <MdOutlineMessage className="mt-0.5" />
            <span>{event.extendedProps.notes}</span>
          </div>
        )}
      </HoverCardContent>
    </HoverCard>
  );
};

export default MonthEventCard;
