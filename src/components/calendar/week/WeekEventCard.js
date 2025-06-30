import { CiClock2, CiLocationOn } from "react-icons/ci";
import { MdOutlineMessage } from "react-icons/md";
import { FaUserInjured } from "react-icons/fa6";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@radix-ui/react-hover-card";
import {
  findCategoryDetails,
  findPatientDetails,
  isAppointmentEnded,
} from "@/utils/helper";
import moment from "moment";

const WeekEventCard = ({ info, patients, categories }) => {
  const { event } = info;

  const patient = findPatientDetails(patients, event.extendedProps.patient);

  const category = findCategoryDetails(
    categories,
    event.extendedProps.category
  );

  return (
    <div className="flex">
      <div
        style={{
          backgroundColor: category.color,
        }}
        className="w-2 rounded-l-md"
      />
      <div className="relative w-full h-full rounded-r-md overflow-hidden">
        <div className="bg-white absolute inset-0 rounded-r-md -z-10" />
        <div
          className="absolute inset-0 rounded-r-md z-10"
          style={{
            backgroundColor: category.color,
            opacity: 0.2,
          }}
        ></div>
        <div className="relative z-10 p-2 rounded-r-md text-gray-900 space-y-1">
          <HoverCard className="z-50">
            <HoverCardTrigger className="cursor-pointer" asChild>
              <div
                className={`font-semibold text-base line-clamp-1 ${
                  isAppointmentEnded(event.end) ? "line-through" : ""
                }`}
              >
                {category.name}
              </div>
            </HoverCardTrigger>
            <HoverCardContent className="w-60 p-4 bg-white border-2">
              <p className="line-clamp-1">{event.title}</p>
              <div className="flex items-center gap-1 text-sm">
                <CiClock2 />
                <p>
                  {moment(event.start).format("HH:mm")} bis{" "}
                  {moment(event.end).format("HH:mm")} Uhr
                </p>
              </div>
              <div className="flex items-center gap-1 text-sm">
                <FaUserInjured />
                <p>
                  {patient.name}{" "}
                  <span className="text-xs">
                    (care-level: {patient.carelevel})
                  </span>
                </p>
              </div>
              <div className="flex items-center gap-1 text-sm">
                <CiLocationOn />
                <p>{event.extendedProps.location}</p>
              </div>
              <div className="flex items-center gap-1 text-sm line-clamp-3">
                <MdOutlineMessage />
                <p>{event.extendedProps.notes}</p>
              </div>
            </HoverCardContent>
          </HoverCard>
          <div className="flex items-center gap-1">
            <CiClock2 className="shrink-0" />
            <span>
              {moment(event.start).format("HH:mm")} bis{" "}
              {moment(event.end).format("HH:mm")} Uhr
            </span>
          </div>
          {event.extendedProps.location && (
            <div className=" flex items-center gap-1">
              <CiLocationOn className="shrink-0" />
              <span>{event.extendedProps.location}</span>
            </div>
          )}
          {event.extendedProps.notes && (
            <div className=" flex items-start gap-1 line-clamp-3">
              <MdOutlineMessage className="shrink-0 mt-0.5" />
              <span>{event.extendedProps.notes}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WeekEventCard;
