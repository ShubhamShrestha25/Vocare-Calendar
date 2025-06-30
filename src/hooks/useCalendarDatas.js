import { useCallback, useEffect, useState } from "react";
import axios from "axios";

const useCalendarDatas = () => {
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const refetchAppointments = useCallback(async () => {
    try {
      const res = await axios.get("/api/appointments");
      setAppointments(res.data);
    } catch (err) {
      console.error("Fehler beim Laden der Termine:", err);
    }
  }, []);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const [appointRes, patientsRes, categoriesRes] = await Promise.all([
          axios.get("/api/appointments"),
          axios.get("/api/patients"),
          axios.get("/api/categories"),
        ]);

        setAppointments(appointRes.data);
        setPatients(patientsRes.data || []);
        setCategories(categoriesRes.data || []);
      } catch (err) {
        console.error("Fehler beim Laden der Daten:", err);
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, []);

  return {
    appointments,
    setAppointments,
    patients,
    categories,
    loading,
    refetchAppointments,
  };
};

export default useCalendarDatas;
