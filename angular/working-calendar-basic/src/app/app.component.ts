import { Component, viewChild, AfterViewInit } from '@angular/core';
import { WorkingCalendarEditor, setLicense } from '@timelinekit/angular';
import { WorkingCalendar, WorkingShift, TimeOfDay, LightWorkingCalendarTheme, DarkWorkingCalendarTheme } from '@timelinekit/core';

setLicense('');

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

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [WorkingCalendarEditor],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {
  editor = viewChild.required(WorkingCalendarEditor);
  canEdit = true;
  isDark = false;
  status = '';

  ngAfterViewInit() {
    const editor = this.editor();
    editor.calendar = buildDemoCalendar();

    editor.events.calendarChanged$.subscribe(() => {
      this.showStatus('Calendar changed');
    });
  }

  toggleEdit() {
    this.canEdit = !this.canEdit;
    this.editor().canEdit = this.canEdit;
  }

  toggleTheme() {
    this.isDark = !this.isDark;
    this.editor().theme = this.isDark ? new DarkWorkingCalendarTheme() : new LightWorkingCalendarTheme();
  }

  validate() {
    const result = this.editor().validateShifts();
    if (result.valid) {
      this.showStatus('Shifts are valid', 3000);
    } else {
      const msgs: string[] = [];
      if (result.overlapping.length > 0) msgs.push(`Overlapping: ${result.overlapping.join(', ')}`);
      if (result.invalidRange.length > 0) msgs.push(`Invalid range: ${result.invalidRange.join(', ')}`);
      this.showStatus(msgs.join(' | '), 3000);
    }
  }

  reset() {
    this.editor().calendar = buildDemoCalendar();
    this.showStatus('Reset');
  }

  private showStatus(msg: string, duration = 2000) {
    this.status = msg;
    setTimeout(() => { this.status = ''; }, duration);
  }
}
