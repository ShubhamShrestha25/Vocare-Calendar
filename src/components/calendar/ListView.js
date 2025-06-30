import moment from "moment";
import { CiClock2, CiLocationOn } from "react-icons/ci";
import { RiCheckboxBlankFill } from "react-icons/ri";
import { MdOutlineMessage } from "react-icons/md";
import {
  findCategoryDetails,
  groupAppointmentsByDate,
  isAppointmentEnded,
} from "@/utils/helper";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import { PiWarningCircleLight } from "react-icons/pi";
import "moment/locale/de";

const ListView = ({ appointments, categories, setOpenModal, setEditData }) => {
  const groupedAppointments = groupAppointmentsByDate(appointments);

  const handleClicked = (appoint) => {
    setOpenModal(true);
    setEditData(appoint);
  };

  return (
    <div className="bg-gray-300">
      {appointments.length === 0 ? (
        <h1 className="text-center py-8 text-gray-700">Keine Termine</h1>
      ) : (
        <>
          <div className="flex flex-col items-center gap-5 h-full">
            {Object.entries(groupedAppointments).map(([date, apps]) => (
              <div key={date} className="w-[720px]">
                <div className="flex justify-between items-center">
                  <h2 className="font-bold text-lg mb-3 capitalize">{date}</h2>

                  <div>
                    {date === moment().format("dddd, D. MMMM") ? (
                      <div className="flex gap-0.5 items-center bg-green-100 p-1 text-sm rounded">
                        <PiWarningCircleLight />
                        Heute
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                {apps.map((appoint) => (
                  <div
                    className="bg-white py-3 px-5 rounded-lg cursor-default mb-3"
                    onClick={() => handleClicked(appoint)}
                    key={appoint.id}
                  >
                    <div className="flex justify-between">
                      <div className="flex items-center gap-1 mb-1 font-semibold">
                        <RiCheckboxBlankFill
                          style={{
                            color:
                              findCategoryDetails(categories, appoint?.category)
                                ?.color || "transparent",
                          }}
                        />
                        <h1
                          className={
                            isAppointmentEnded(appoint.end)
                              ? "line-through"
                              : ""
                          }
                        >
                          {findCategoryDetails(categories, appoint?.category)
                            ?.name || ""}
                          - {appoint.title}
                        </h1>
                      </div>
                      {isAppointmentEnded(appoint.end) ? (
                        <MdCheckBox />
                      ) : (
                        <MdCheckBoxOutlineBlank />
                      )}
                    </div>
                    <div className="text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <CiClock2 />
                        <p>
                          {moment(appoint.start).format("HH:mm")} bis{" "}
                          {moment(appoint.end).format("HH:mm")} Uhr
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        <CiLocationOn />
                        <p>{appoint.location}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <MdOutlineMessage />
                        <p>{appoint.notes}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <h1 className="text-center py-8 text-gray-700">
            keine weiteren Termine gefunden
          </h1>
        </>
      )}
    </div>
  );
};

export default ListView;
