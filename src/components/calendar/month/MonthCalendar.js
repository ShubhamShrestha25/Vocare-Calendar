"use client";

import React, { useMemo, useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";

import { getAppointmentsByDate } from "@/utils/helper";
import MonthEventCard from "./MonthEventCard";
import MonthSidebar from "./MonthSidebar";

import "moment/locale/de";

const MonthCalendar = ({ appointments, categories, patients }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const calendarRef = useRef(null);

  const filteredAppointments = useMemo(() => {
    return getAppointmentsByDate(appointments, selectedDate || new Date());
  }, [appointments, selectedDate]);

  const handleDateClick = (arg) => {
    setSelectedDate(arg.date);
  };

  return (
    <div className="flex w-full">
      <button
        aria-label="Vorheriger Monat"
        onClick={() => calendarRef.current?.getApi().prev()}
        className="px-3 bg-gray-300"
      >
        <GrLinkPrevious className="text-2xl" />
      </button>

      <div className="w-full">
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          locale="de"
          headerToolbar={false}
          dayHeaderFormat={{ weekday: "long" }}
          firstDay={1}
          events={appointments}
          eventContent={(info) => (
            <MonthEventCard
              info={info}
              categories={categories}
              patients={patients}
            />
          )}
          dateClick={handleDateClick}
        />
      </div>

      <button
        aria-label="Nächster Monat"
        onClick={() => calendarRef.current?.getApi().next()}
        className="px-3 bg-gray-300"
      >
        <GrLinkNext className="text-2xl" />
      </button>

      <MonthSidebar
        appointments={filteredAppointments}
        categories={categories}
        selectedDate={selectedDate}
      />
    </div>
  );
};

export default MonthCalendar;
