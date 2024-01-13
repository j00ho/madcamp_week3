// CalendarComponent.jsx
import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
  const events = [
    {
      title: 'Event 1',
      start: new Date(2022, 0, 1),
      end: new Date(2022, 0, 3),
    },
    {
      title: 'Event 2',
      start: new Date(2022, 0, 7),
      end: new Date(2022, 0, 10),
    },
    // Add more events as needed
  ];

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
  );
};

export default MyCalendar;
