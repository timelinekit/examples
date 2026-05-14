# Event Calendar - Basic Example

## What this example demonstrates

This example shows how to use the TimelineKit EventCalendar component to build a calendar application with day, week, and month views. It demonstrates using different calendar item types — Meeting, Appointment, CalendarTask, and Deadline — which are visually distinguished in the calendar. The example includes a toolbar for switching views and navigating between dates, showing how the EventCalendar API handles view mode changes and date navigation programmatically.

**Use this example when:** You need a calendar/scheduler UI with multiple view modes, different event types, and date navigation — e.g., a booking system, team calendar, or personal planner.

## Features

- **Multiple item types** -- Meeting, Appointment, CalendarTask, and Deadline entries
- **View modes** -- Switch between Day, Week, and Month views
- **Navigation** -- Today, Previous, and Next buttons to navigate through dates
- **Undo/Redo** -- Built-in undo and redo support for all calendar operations
- **Drag and drop** -- Move and resize calendar entries interactively

## Run

```bash
npm install
npm run dev
```

## Key Concepts

- **EventCalendarRef** -- The ref provides access to the calendar API (navigation, view mode, undo/redo, data management).
- **CalendarData** -- Items are added to the calendar via `calendar.data.addItem(item)`.
- **Item types** -- Each calendar entry has a specific type (`Meeting`, `Appointment`, `CalendarTask`, `Deadline`) created using static `fromAny()` factory methods.
- **View modes** -- The calendar supports `'day'`, `'week'`, and `'month'` view modes, set via `ref.current.viewMode`.
