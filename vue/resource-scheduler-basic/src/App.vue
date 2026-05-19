<script setup lang="ts">
import { ref } from 'vue';
import { ResourceScheduler, type ResourceSchedulerRef, setLicense, SchedulerResource, SchedulerEvent } from '@timelinekit/vue';
import '@timelinekit/core/styles';
import './App.css';

setLicense(import.meta.env.VITE_TK_LICENSE_KEY ?? '');

function createResource(id: string, name: string, type: string): SchedulerResource {
  const resource = new SchedulerResource(id, name);
  resource.type = type;
  return resource;
}

const schedulerRef = ref<ResourceSchedulerRef>();

function handleReady() {
  const scheduler = schedulerRef.value;
  if (!scheduler) return;

  // Add resources — 5 team members
  scheduler.data.addResource(createResource('r1', 'Alice Chen — Developer', 'person'));
  scheduler.data.addResource(createResource('r2', 'Bob Martinez — Designer', 'person'));
  scheduler.data.addResource(createResource('r3', 'Carol Park — PM', 'person'));
  scheduler.data.addResource(createResource('r4', 'Dave Wilson — QA', 'person'));
  scheduler.data.addResource(createResource('r5', 'Eve Thomas — DevOps', 'person'));

  // Add events — realistic sprint events over 2 weeks (2027-01-05 to 2027-01-16)
  scheduler.data.addEvent(new SchedulerEvent('e1', 'r3', 'Sprint Planning', new Date('2027-01-05'), new Date('2027-01-06')));
  scheduler.data.addEvent(new SchedulerEvent('e2', 'r1', 'Frontend Development', new Date('2027-01-06'), new Date('2027-01-12')));
  scheduler.data.addEvent(new SchedulerEvent('e3', 'r1', 'API Development', new Date('2027-01-12'), new Date('2027-01-16')));
  scheduler.data.addEvent(new SchedulerEvent('e4', 'r2', 'UI/UX Mockups', new Date('2027-01-05'), new Date('2027-01-09')));
  scheduler.data.addEvent(new SchedulerEvent('e5', 'r2', 'Design Review', new Date('2027-01-09'), new Date('2027-01-10')));
  scheduler.data.addEvent(new SchedulerEvent('e6', 'r2', 'Asset Preparation', new Date('2027-01-12'), new Date('2027-01-15')));
  scheduler.data.addEvent(new SchedulerEvent('e7', 'r3', 'Stakeholder Demo', new Date('2027-01-09'), new Date('2027-01-10')));
  scheduler.data.addEvent(new SchedulerEvent('e8', 'r4', 'Test Plan Creation', new Date('2027-01-06'), new Date('2027-01-08')));
  scheduler.data.addEvent(new SchedulerEvent('e9', 'r4', 'QA Testing', new Date('2027-01-12'), new Date('2027-01-16')));
  scheduler.data.addEvent(new SchedulerEvent('e10', 'r5', 'CI/CD Pipeline Setup', new Date('2027-01-05'), new Date('2027-01-08')));
  scheduler.data.addEvent(new SchedulerEvent('e11', 'r5', 'Staging Deployment', new Date('2027-01-13'), new Date('2027-01-15')));

  // Zoom to fit all events
  scheduler.zoomToFit();

  scheduler.events.eventClick$.subscribe((args) => {
    alert(`Clicked: ${args.event.title} (ID: ${args.event.id})`);
  });
}
</script>

<template>
  <div class="app">
    <h1>TimelineKit - Resource Scheduler</h1>
    <div class="toolbar">
      <button @click="schedulerRef?.zoomIn()">Zoom In</button>
      <button @click="schedulerRef?.zoomOut()">Zoom Out</button>
      <button @click="schedulerRef?.zoomToFit()">Zoom to Fit</button>
      <button @click="schedulerRef?.undo()">Undo</button>
      <button @click="schedulerRef?.redo()">Redo</button>
    </div>
    <div class="scheduler-container">
      <ResourceScheduler ref="schedulerRef" @ready="handleReady" />
    </div>
  </div>
</template>
