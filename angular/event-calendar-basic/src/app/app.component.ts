import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { EventCalendar, setLicense, Meeting, Appointment, CalendarTask, Deadline } from '@timelinekit/angular';

setLicense('');

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
    // Meetings
    this.calendar.data.addItem(Meeting.fromAny({
      id: 'm1',
      title: 'Team Standup',
      startTime: '2027-01-05T09:00:00',
      endTime: '2027-01-05T09:30:00',
      calendarId: 'work',
    }));

    this.calendar.data.addItem(Meeting.fromAny({
      id: 'm2',
      title: 'Sprint Review',
      startTime: '2027-01-09T14:00:00',
      endTime: '2027-01-09T15:30:00',
      calendarId: 'work',
    }));

    // Appointment
    this.calendar.data.addItem(Appointment.fromAny({
      id: 'a1',
      title: 'Client Call',
      startTime: '2027-01-06T11:00:00',
      endTime: '2027-01-06T12:00:00',
    }));

    // Task
    this.calendar.data.addItem(CalendarTask.fromAny({
      id: 't1',
      title: 'Documentation Update',
      startTime: '2027-01-07T10:00:00',
      endTime: '2027-01-07T12:00:00',
    }));

    // Deadline
    this.calendar.data.addItem(Deadline.fromAny({
      id: 'd1',
      title: 'Release Deadline',
      startTime: '2027-01-09T17:00:00',
      endTime: '2027-01-09T17:00:00',
    }));

    // Navigate to the week of the sample data
    this.calendar.currentDate = new Date(2027, 0, 5);
    this.calendar.viewMode = 'week';
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
