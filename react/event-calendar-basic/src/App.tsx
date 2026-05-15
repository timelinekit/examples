import { useCallback, useRef } from 'react';
import { EventCalendar, EventCalendarRef, setLicense, Meeting, Appointment, CalendarTask, Deadline } from '@timelinekit/react';
import '@timelinekit/core/styles';
import './App.css';

setLicense(import.meta.env.VITE_TK_LICENSE_KEY ?? '');

export function App() {
  const ref = useRef<EventCalendarRef>(null);

  const handleReady = useCallback(() => {
    const calendar = ref.current;
    if (!calendar) return;

    // Meetings
    calendar.data.addItem(Meeting.fromAny({
      id: 'm1',
      title: 'Team Standup',
      startTime: '2027-01-05T09:00:00',
      endTime: '2027-01-05T09:30:00',
      calendarId: 'work',
    }));

    calendar.data.addItem(Meeting.fromAny({
      id: 'm2',
      title: 'Sprint Review',
      startTime: '2027-01-09T14:00:00',
      endTime: '2027-01-09T15:30:00',
      calendarId: 'work',
    }));

    // Appointment
    calendar.data.addItem(Appointment.fromAny({
      id: 'a1',
      title: 'Client Call',
      startTime: '2027-01-06T11:00:00',
      endTime: '2027-01-06T12:00:00',
    }));

    // Task
    calendar.data.addItem(CalendarTask.fromAny({
      id: 't1',
      title: 'Documentation Update',
      startTime: '2027-01-07T10:00:00',
      endTime: '2027-01-07T12:00:00',
    }));

    // Deadline
    calendar.data.addItem(Deadline.fromAny({
      id: 'd1',
      title: 'Release Deadline',
      startTime: '2027-01-09T17:00:00',
      endTime: '2027-01-09T17:00:00',
    }));

    // Navigate to the week of the sample data
    calendar.currentDate = new Date(2027, 0, 5);
    calendar.viewMode = 'week';
  }, []);

  return (
    <div className="app">
      <h1>TimelineKit - Event Calendar</h1>
      <div className="toolbar">
        <button onClick={() => { if (ref.current) ref.current.viewMode = 'day'; }}>Day</button>
        <button onClick={() => { if (ref.current) ref.current.viewMode = 'week'; }}>Week</button>
        <button onClick={() => { if (ref.current) ref.current.viewMode = 'month'; }}>Month</button>
        <span style={{ width: 1, background: '#d0d0d0', margin: '0 4px' }} />
        <button onClick={() => ref.current?.today()}>Today</button>
        <button onClick={() => ref.current?.previous()}>Previous</button>
        <button onClick={() => ref.current?.next()}>Next</button>
        <span style={{ width: 1, background: '#d0d0d0', margin: '0 4px' }} />
        <button onClick={() => ref.current?.undo()}>Undo</button>
        <button onClick={() => ref.current?.redo()}>Redo</button>
      </div>
      <div className="calendar-container">
        <EventCalendar ref={ref} onReady={handleReady} />
      </div>
    </div>
  );
}
