# Resource Scheduler - Basic Example

## What this example demonstrates

A basic Resource Scheduler setup in Vue showing how to create resources (team members), schedule events across them, and control the component with a toolbar. Events span a two-week sprint with realistic team allocations.

**Use this example when:** You want to understand the ResourceScheduler API and see the minimum setup needed in a Vue + Vite project.

## Features

- Resource-based scheduling (5 team members)
- Multi-day events across a 2-week sprint
- Drag-and-drop event editing
- Zoom in/out and zoom to fit
- Undo/redo support

## Run

```bash
npm install
npm run dev
```

## Key Concepts

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { ResourceScheduler, type ResourceSchedulerRef, SchedulerResource, SchedulerEvent } from '@timelinekit/vue';

const schedulerRef = ref<ResourceSchedulerRef>();

function handleReady() {
  const scheduler = schedulerRef.value!;
  scheduler.data.addResource(new SchedulerResource('r1', 'Alice'));
  scheduler.data.addEvent(new SchedulerEvent('e1', 'r1', 'Task', new Date('2027-01-05'), new Date('2027-01-09')));
  scheduler.zoomToFit();
}
</script>

<template>
  <ResourceScheduler ref="schedulerRef" @ready="handleReady" />
</template>
```
