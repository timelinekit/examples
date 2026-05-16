# Event Calendar - Basic Example

## What this example demonstrates

A basic Event Calendar setup in Vue with day, week, and month views. It includes multiple calendars (Work and Personal), various event types (meetings, tasks, deadlines, appointments), recurring events (daily standup), and all-day events.

**Use this example when:** You want to understand the EventCalendar API and see the minimum setup needed in a Vue + Vite project.

## Features

- Day, week, and month views
- Multiple calendars with different colors
- Recurring events (weekly standup)
- All-day events
- Event types (meeting, task, deadline, appointment, holiday)
- Navigation (today, previous, next)
- Undo/redo support
- Drag-and-drop event editing

## Run

```bash
npm install
npm run dev
```

## Key Concepts

```vue
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { EventCalendar, type EventCalendarRef } from '@timelinekit/vue';

const calendarRef = ref<EventCalendarRef>();

onMounted(() => {
  calendarRef.value?.load(JSON.stringify({
    calendars: [{ id: 'c1', name: 'Work', color: 0, isVisible: true, isDefault: true }],
    items: [{ id: '1', calendarId: 'c1', title: 'Meeting',
      startTime: '2027-01-05T09:00:00', endTime: '2027-01-05T10:00:00', type: 'meeting' }],
    viewMode: 'week',
  }));
});
</script>

<template>
  <EventCalendar ref="calendarRef" />
</template>
```
