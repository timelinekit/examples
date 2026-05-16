# Gantt Chart - Basic Example

## What this example demonstrates

This is the simplest starting point for using TimelineKit GanttChart in Vue. It shows how to set up a Gantt chart with the core building blocks: regular tasks, summary tasks (task groups), milestones, task progress tracking, and finish-to-start dependencies between tasks. The example also includes a toolbar demonstrating programmatic control over zoom and undo/redo.

**Use this example when:** You want to understand the basic GanttChart API and see the minimum setup needed to get a working Gantt chart in a Vue + Vite project.

## Features

- Task hierarchy (summary tasks with subtasks)
- Milestones
- Finish-to-start dependencies
- Task progress
- Zoom in/out and zoom to fit
- Undo/redo support
- Interactive editing (drag to move/resize tasks)

## Run

```bash
npm install
npm run dev
```

## Key Concepts

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { GanttChart, type GanttChartRef } from '@timelinekit/vue';

const ganttRef = ref<GanttChartRef>();

const data = {
  tasks: [
    { id: '1', name: 'My Task', startTime: '2027-01-05', endTime: '2027-01-09', type: 'task', progress: 50 },
    { id: '2', name: 'Milestone', startTime: '2027-01-09', type: 'milestone' },
  ],
  links: [
    { id: 'l1', from: '1', to: '2', type: 'finishToStart' },
  ],
};

function handleReady() {
  ganttRef.value!.load(JSON.stringify(data));
  ganttRef.value!.zoomToFit();
}
</script>

<template>
  <GanttChart ref="ganttRef" @ready="handleReady" />
</template>
```
