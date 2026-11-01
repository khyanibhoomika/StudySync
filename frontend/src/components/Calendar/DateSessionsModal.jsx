import React from "react";
import moment from "moment";

export default function DateSessionsModal({ selectedDate, events, onClose }) {
  const dayEvents = React.useMemo(
    () =>
      events
        .filter((event) => moment(event.start).isSame(selectedDate, "day"))
        .sort((a, b) => moment(a.start).diff(moment(b.start))),
    [selectedDate, events]
  );

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
      <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-indigo-800">
            Sessions on {moment(selectedDate).format("MMMM D, YYYY")}
          </h2>
          <button
            onClick={onClose}
            className="text-indigo-600 hover:bg-indigo-100 p-2 rounded-full transition"
          >
            ✕
          </button>
        </div>

        {dayEvents.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg">No sessions scheduled for this day.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {dayEvents.map((event, index) => (
              <div
                key={index}
                className="p-4 rounded-xl bg-gradient-to-br from-indigo-50 to-pink-50 border border-indigo-200 hover:shadow-lg transition cursor-pointer"
              >
                <h3 className="font-bold text-lg text-indigo-800 mb-2">{event.title}</h3>
                <p className="text-gray-700 mb-2">{event.description}</p>
                <p className="text-indigo-700 font-semibold mb-1">
                  👥 Group: <span className="font-normal">{event.groupName}</span>
                </p>
                <p className="text-indigo-700 font-semibold mb-1">
                  📚 Course: <span className="font-normal">{event.courseName}</span>
                </p>
                <p className="text-indigo-700 font-semibold mb-1">
                  👤 Organizer: <span className="font-normal">{event.organizer}</span>
                </p>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>
                    🕒 {moment(event.start).format("h:mm A")} -{" "}
                    {moment(event.end).format("h:mm A")}
                  </p>
                  {event.location && <p>📍 {event.location}</p>}
                  {event.link && (
                    <p>
                      🔗{" "}
                      <a
                        href={event.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        Meeting Link
                      </a>
                    </p>
                  )}
                  {event.passkey && <p>🔑 Passkey: {event.passkey}</p>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
