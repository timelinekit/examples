import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { EventCalendar, setLicense } from '@timelinekit/angular';

setLicense('');

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

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [EventCalendar],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {
  @ViewChild(EventCalendar) calendar!: EventCalendar;

  ngAfterViewInit() {
    this.calendar.load(JSON.stringify(data));
  }

  setView(mode: 'day' | 'week' | 'month') {
    this.calendar.viewMode = mode;
  }

  today() {
    this.calendar.today();
  }

  previous() {
    this.calendar.previous();
  }

  next() {
    this.calendar.next();
  }

  undo() {
    this.calendar.undo();
  }

  redo() {
    this.calendar.redo();
  }
}
