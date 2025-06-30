"use client";

import { useState } from "react";
import axios from "axios";
import moment from "moment";

const LoadPrevAppointments = ({ activeMode, setAppointments }) => {
  const [showPastAppointments, setShowPastAppointments] = useState(false);
  const [loading, setLoading] = useState(false);

  const togglePastAppointments = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `/api/appointments?pastData=${!showPastAppointments}`
      );
      setAppointments(response.data);
      setShowPastAppointments((prev) => !prev);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    } finally {
      setLoading(false);
    }
  };

  const todayFormatted = moment().format("DD.MM.YYYY");
  const label = showPastAppointments
    ? `Termine vor dem ${todayFormatted} ausblenden`
    : `Termine vor dem ${todayFormatted} laden`;

  return (
    <div
      className={`flex justify-center py-8 ${
        activeMode === "Liste" ? "bg-gray-300" : ""
      }`}
    >
      <button
        onClick={togglePastAppointments}
        disabled={loading}
        className={`text-center font-semibold cursor-pointer ${
          loading ? "opacity-60 pointer-events-none" : ""
        }`}
      >
        {loading ? "Lädt..." : label}
      </button>
    </div>
  );
};

export default LoadPrevAppointments;
