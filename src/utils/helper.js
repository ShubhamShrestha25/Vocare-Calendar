import moment from "moment";
import "moment/locale/de";

export const findCategoryDetails = (categories, categoryId) => {
  const category = categories.find((cat) => cat.id === categoryId);
  return category ? { name: category.label, color: category.color } : null;
};

export const findPatientDetails = (patients, patientId) => {
  const patient = patients.find((pat) => pat.id === patientId);
  return patient
    ? {
        name: patient.firstname + " " + patient.lastname,
        carelevel: patient.care_level,
      }
    : null;
};

export const groupAppointmentsByDate = (appointments) => {
  return appointments.reduce((groups, appoint) => {
    const date = moment(appoint.start).format("dddd, D. MMMM");
    if (!groups[date]) groups[date] = [];
    groups[date].push(appoint);
    return groups;
  }, {});
};

export const getAppointmentsByDate = (appointments, date) => {
  const targetDate = moment(date).format("dddd, D. MMMM");

  return appointments.filter(
    (appoint) => moment(appoint.start).format("dddd, D. MMMM") === targetDate
  );
};

export const isAppointmentEnded = (endTime) => {
  return moment().isAfter(moment(endTime));
};
