import { useRef, useLayoutEffect, useState } from 'react';
import { WorkingCalendarEditor, WorkingCalendarEditorRef, setLicense } from '@timelinekit/react';
import { WorkingCalendar, WorkingShift, TimeOfDay, LightWorkingCalendarTheme, DarkWorkingCalendarTheme } from '@timelinekit/core';
import '@timelinekit/core/styles';
import './App.css';

setLicense(import.meta.env.VITE_TK_LICENSE_KEY ?? '');

function buildDemoCalendar(): WorkingCalendar {
  const cal = new WorkingCalendar();
  cal.workingDays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
  cal.shifts = [
    new WorkingShift(new TimeOfDay(8, 0), new TimeOfDay(12, 0)),
    new WorkingShift(new TimeOfDay(13, 0), new TimeOfDay(17, 0)),
  ];
  cal.startOfWeek = 'monday';
  cal.nationalHolidays = [
    new Date(2026, 0, 1),
    new Date(2026, 4, 1),
    new Date(2026, 11, 24),
    new Date(2026, 11, 25),
  ];
  return cal;
}

export default function App() {
  const ref = useRef<WorkingCalendarEditorRef>(null);
  const [canEdit, setCanEdit] = useState(true);
  const [isDark, setIsDark] = useState(false);
  const [status, setStatus] = useState('');

  useLayoutEffect(() => {
    if (!ref.current) return;
    ref.current.calendar = buildDemoCalendar();

    const sub = ref.current.events.calendarChanged$.subscribe(() => {
      setStatus('Calendar changed');
      setTimeout(() => setStatus(''), 2000);
    });
    return () => sub.unsubscribe();
  }, []);

  function toggleEdit() {
    if (!ref.current) return;
    const next = !canEdit;
    ref.current.canEdit = next;
    setCanEdit(next);
  }

  function toggleTheme() {
    if (!ref.current) return;
    const next = !isDark;
    ref.current.theme = next ? new DarkWorkingCalendarTheme() : new LightWorkingCalendarTheme();
    setIsDark(next);
  }

  function validate() {
    if (!ref.current) return;
    const result = ref.current.validateShifts();
    if (result.valid) {
      setStatus('Shifts are valid');
    } else {
      const msgs: string[] = [];
      if (result.overlapping.length > 0) msgs.push(`Overlapping: ${result.overlapping.join(', ')}`);
      if (result.invalidRange.length > 0) msgs.push(`Invalid range: ${result.invalidRange.join(', ')}`);
      setStatus(msgs.join(' | '));
    }
    setTimeout(() => setStatus(''), 3000);
  }

  function reset() {
    if (!ref.current) return;
    ref.current.calendar = buildDemoCalendar();
    setStatus('Reset');
    setTimeout(() => setStatus(''), 2000);
  }

  return (
    <div className="app">
      <h1>TimelineKit - Working Calendar</h1>
      <div className="toolbar">
        <button onClick={toggleEdit}>{canEdit ? 'Lock' : 'Unlock'}</button>
        <button onClick={toggleTheme}>{isDark ? 'Light' : 'Dark'}</button>
        <span style={{ width: 1, background: '#d0d0d0', margin: '0 4px' }} />
        <button onClick={validate}>Validate</button>
        <button onClick={reset}>Reset</button>
        {status && <span className="status">{status}</span>}
      </div>
      <div className="editor-container">
        <WorkingCalendarEditor ref={ref} />
      </div>
    </div>
  );
}
