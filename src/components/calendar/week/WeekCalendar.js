import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import moment from "moment";
import { useRef } from "react";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";
import WeekEventCard from "./WeekEventCard";

const WeekCalendar = ({ appointments, categories, patients }) => {
  const calendarRef = useRef(null);

  return (
    <div className="flex">
      <button
        className="px-3 cursor-pointer bg-gray-300 text-black"
        onClick={() => calendarRef.current?.getApi().prev()}
      >
        <GrLinkPrevious className="text-2xl" />
      </button>
      <div className="w-full">
        <FullCalendar
          ref={calendarRef}
          plugins={[timeGridPlugin, interactionPlugin]}
          initialView="timeGridWeek"
          eventClassNames={() => "custom-event"}
          headerToolbar={false}
          allDaySlot={false}
          slotLabelFormat={{
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          }}
          slotLabelContent={(arg) => {
            const hours = arg.date.getHours().toString().padStart(2, "0");
            const minutes = arg.date.getMinutes().toString().padStart(2, "0");
            return `${hours}:${minutes} Uhr`;
          }}
          events={appointments}
          eventContent={(info) => (
            <WeekEventCard
              info={info}
              categories={categories}
              patients={patients}
            />
          )}
          nowIndicator={true}
          scrollTime={moment().format("HH:mm:ss")}
        />
      </div>
      <button
        className="px-3 cursor-pointer bg-gray-300 text-black"
        onClick={() => calendarRef.current?.getApi().next()}
      >
        <GrLinkNext className="text-2xl" />
      </button>
    </div>
  );
};

export default WeekCalendar;
