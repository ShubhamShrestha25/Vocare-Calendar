"use client";

import { useState } from "react";
import useCalendarDatas from "@/hooks/useCalendarDatas";

import MonthCalendar from "@/components/calendar/month/MonthCalendar";
import WeekCalendar from "@/components/calendar/week/WeekCalendar";
import ListView from "@/components/calendar/ListView";
import ShowDate from "@/components/ShowDate";
import Toolbar from "@/components/toolbar/Toolbar";
import ViewModeSelector from "@/components/ViewModeSelector";
import AddEditAppointment from "@/components/modal/AddEditAppointment";
import LoadPrevAppointments from "@/components/LoadPrevAppointments";

const Home = () => {
  const viewModes = ["Liste", "Woche", "Monat"];
  const [activeMode, setActiveMode] = useState("Liste");
  const [filters, setFilters] = useState({});
  const [editData, setEditData] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const {
    appointments,
    setAppointments,
    patients,
    categories,
    loading,
    refetchAppointments,
  } = useCalendarDatas();

  const filteredAppointments = appointments.filter((appointment) => {
    if (filters.category && appointment.category !== filters.category) {
      return false;
    }

    if (filters.patient && appointment.patient !== filters.patient) {
      return false;
    }

    const apptStart = new Date(appointment.start);
    const apptEnd = new Date(appointment.end);

    const filterStart = filters.startDate ? new Date(filters.startDate) : null;
    const filterEnd = filters.endDate ? new Date(filters.endDate) : null;

    if (filterStart && !filterEnd) {
      return apptEnd >= filterStart;
    }

    if (!filterStart && filterEnd) {
      return apptStart <= filterEnd;
    }

    if (filterStart && filterEnd) {
      return apptEnd >= filterStart && apptStart <= filterEnd;
    }

    return true;
  });

  if (loading) {
    return (
      <div className="text-center p-10 text-gray-600">Lade Termine...</div>
    );
  }

  const appointmentsToShow = filters ? filteredAppointments : appointments;

  return (
    <>
      <div className="flex justify-between px-20 py-4">
        <div className="flex gap-4">
          <ShowDate />
          <ViewModeSelector
            viewModes={viewModes}
            activeMode={activeMode}
            setActiveMode={setActiveMode}
          />
        </div>
        <Toolbar
          setFilters={setFilters}
          setOpenModal={setOpenModal}
          patients={patients}
          categories={categories}
        />
      </div>

      <LoadPrevAppointments
        activeMode={activeMode}
        setAppointments={setAppointments}
      />

      {activeMode === "Monat" && (
        <MonthCalendar
          appointments={appointmentsToShow}
          categories={categories}
          patients={patients}
        />
      )}
      {activeMode === "Woche" && (
        <WeekCalendar
          appointments={appointmentsToShow}
          categories={categories}
          patients={patients}
        />
      )}
      {activeMode === "Liste" && (
        <ListView
          appointments={appointmentsToShow}
          categories={categories}
          setOpenModal={setOpenModal}
          setEditData={setEditData}
        />
      )}

      <AddEditAppointment
        openModal={openModal}
        setOpenModal={setOpenModal}
        patients={patients}
        categories={categories}
        editData={editData}
        setEditData={setEditData}
        refetchAppointments={refetchAppointments}
      />
    </>
  );
};

export default Home;
