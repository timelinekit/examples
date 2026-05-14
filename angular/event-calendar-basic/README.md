# Event Calendar - Basic Example (Angular)

## What this example demonstrates

This is the Angular equivalent of the React event-calendar-basic example. It shows how to use the TimelineKit EventCalendar as a standalone Angular component with day, week, and month views. The example populates the calendar with different item types (Meeting, Appointment, CalendarTask, Deadline) and includes a toolbar for switching views and navigating dates — demonstrating how to control the calendar API from Angular template bindings.

**Use this example when:** You need a calendar/scheduler UI in Angular with multiple view modes and event types.

## Features

- **Multiple item types** -- Meeting, Appointment, CalendarTask, and Deadline entries
- **View modes** -- Switch between Day, Week, and Month views
- **Navigation** -- Today, Previous, and Next buttons to navigate through dates
- **Undo/Redo** -- Built-in undo and redo support for all calendar operations
- **Drag and drop** -- Move and resize calendar entries interactively

## Run

```bash
npm install
ng serve
```

Open your browser at `http://localhost:4200`.

## Key Concepts

- **EventCalendar** -- The Angular standalone component from `@timelinekit/angular`, accessed via `@ViewChild`.
- **CalendarData** -- Items are added to the calendar via `calendar.data.addItem(item)`.
- **Item types** -- Each calendar entry has a specific type (`Meeting`, `Appointment`, `CalendarTask`, `Deadline`) created using static `fromAny()` factory methods.
- **View modes** -- The calendar supports `'day'`, `'week'`, and `'month'` view modes, set via `calendar.viewMode`.
