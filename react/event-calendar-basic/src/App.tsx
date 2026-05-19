import { useRef, useLayoutEffect } from 'react';
import { EventCalendar, EventCalendarRef, setLicense } from '@timelinekit/react';
import '@timelinekit/core/styles';
import './App.css';

setLicense(import.meta.env.VITE_TK_LICENSE_KEY ?? '');

const data = {
  calendars: [
    { id: 'c1', name: 'Work', color: 0, isVisible: true, isDefault: true },
    { id: 'c2', name: 'Personal', color: 1, isVisible: true },
  ],
  items: [
    // Meetings
    { id: 'm1', calendarId: 'c1', title: 'Sprint Planning',
      startTime: '2027-01-05T10:00:00', endTime: '2027-01-05T12:00:00',
      type: 'meeting', responseStatus: 'accepted' },
    { id: 'm2', calendarId: 'c1', title: 'Design Review',
      startTime: '2027-01-06T14:00:00', endTime: '2027-01-06T15:30:00',
      type: 'meeting', responseStatus: 'accepted' },
    { id: 'm3', calendarId: 'c1', title: 'Client Call',
      startTime: '2027-01-07T11:00:00', endTime: '2027-01-07T12:00:00',
      type: 'meeting', responseStatus: 'tentative' },
    { id: 'm4', calendarId: 'c1', title: 'Sprint Review',
      startTime: '2027-01-09T14:00:00', endTime: '2027-01-09T15:30:00',
      type: 'meeting', responseStatus: 'accepted' },

    // Recurring standup
    { id: 'r1', calendarId: 'c1', title: 'Daily Standup',
      startTime: '2027-01-05T09:00:00', endTime: '2027-01-05T09:15:00',
      type: 'meeting', responseStatus: 'accepted',
      recurrenceRule: { frequency: 'weekly', byDay: [{ day: 'mo' }, { day: 'tu' }, { day: 'we' }, { day: 'th' }, { day: 'fr' }] } },

    // Task & deadline
    { id: 't1', calendarId: 'c1', title: 'Documentation Update',
      startTime: '2027-01-07T10:00:00', endTime: '2027-01-07T12:00:00', type: 'task' },
    { id: 'd1', calendarId: 'c1', title: 'Release Deadline',
      startTime: '2027-01-09T17:00:00', endTime: '2027-01-09T17:00:00', type: 'deadline' },

    // Personal
    { id: 'p1', calendarId: 'c2', title: 'Dentist',
      startTime: '2027-01-06T08:00:00', endTime: '2027-01-06T09:00:00', type: 'appointment' },
    { id: 'p2', calendarId: 'c2', title: 'Team Offsite',
      startTime: '2027-01-08', endTime: '2027-01-09', isAllDay: true, type: 'holiday' },
  ],
  currentDate: '2027-01-05',
  viewMode: 'week',
};

export default function App() {
  const ref = useRef<EventCalendarRef>(null);

  useLayoutEffect(() => {
    if (!ref.current) return;
    ref.current.load(JSON.stringify(data));

    const sub = ref.current.events.entryClick$.subscribe((args) => {
      alert(`Clicked: ${args.entry.title} (ID: ${args.entry.id})`);
    });
    return () => sub.unsubscribe();
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
        <EventCalendar ref={ref} />
      </div>
    </div>
  );
}
