<script setup lang="ts">
import { ref } from 'vue';
import { GanttChart, type GanttChartRef, setLicense, Task, TaskLink } from '@timelinekit/vue';
import '@timelinekit/core/styles';
import './App.css';

setLicense(import.meta.env.VITE_TK_LICENSE_KEY ?? '');

const ganttRef = ref<GanttChartRef>();

function handleReady() {
  const gantt = ganttRef.value;
  if (!gantt) return;

  // Add tasks
  const planning = gantt.list.addTask(new Task({ id: '1', name: 'Project Planning', startTime: '2027-01-05', endTime: '2027-01-16', type: 'summary' }));
  const research = gantt.list.addTask(new Task({ id: '2', name: 'Research & Discovery', startTime: '2027-01-05', endTime: '2027-01-09', progress: 100 }));
  const requirements = gantt.list.addTask(new Task({ id: '3', name: 'Requirements Gathering', startTime: '2027-01-12', endTime: '2027-01-16', progress: 75 }));

  const design = gantt.list.addTask(new Task({ id: '4', name: 'Design Phase', startTime: '2027-01-19', endTime: '2027-02-06', type: 'summary' }));
  const wireframes = gantt.list.addTask(new Task({ id: '5', name: 'Wireframes', startTime: '2027-01-19', endTime: '2027-01-23', progress: 50 }));
  const uiDesign = gantt.list.addTask(new Task({ id: '6', name: 'UI Design', startTime: '2027-01-26', endTime: '2027-02-03' }));
  const designApproval = gantt.list.addTask(new Task({ id: '7', name: 'Design Approval', startTime: '2027-02-06', endTime: '2027-02-06', type: 'milestone' }));

  const development = gantt.list.addTask(new Task({ id: '8', name: 'Development', startTime: '2027-02-09', endTime: '2027-03-20', type: 'summary' }));
  const frontend = gantt.list.addTask(new Task({ id: '9', name: 'Frontend Development', startTime: '2027-02-09', endTime: '2027-03-06' }));
  const backend = gantt.list.addTask(new Task({ id: '10', name: 'Backend Development', startTime: '2027-02-09', endTime: '2027-03-13' }));
  const integration = gantt.list.addTask(new Task({ id: '11', name: 'Integration & Testing', startTime: '2027-03-16', endTime: '2027-03-20' }));

  const launch = gantt.list.addTask(new Task({ id: '12', name: 'Launch', startTime: '2027-03-23', endTime: '2027-03-23', type: 'milestone' }));

  // Set up hierarchy
  planning.subtasks = [research, requirements];
  design.subtasks = [wireframes, uiDesign, designApproval];
  development.subtasks = [frontend, backend, integration];

  // Add dependencies (finish-to-start links)
  gantt.list.addLink(new TaskLink({ id: 'l1', from: research, to: requirements, type: 'finishToStart' }));
  gantt.list.addLink(new TaskLink({ id: 'l2', from: requirements, to: wireframes, type: 'finishToStart' }));
  gantt.list.addLink(new TaskLink({ id: 'l3', from: wireframes, to: uiDesign, type: 'finishToStart' }));
  gantt.list.addLink(new TaskLink({ id: 'l4', from: uiDesign, to: designApproval, type: 'finishToStart' }));
  gantt.list.addLink(new TaskLink({ id: 'l5', from: designApproval, to: frontend, type: 'finishToStart' }));
  gantt.list.addLink(new TaskLink({ id: 'l6', from: designApproval, to: backend, type: 'finishToStart' }));
  gantt.list.addLink(new TaskLink({ id: 'l7', from: frontend, to: integration, type: 'finishToStart' }));
  gantt.list.addLink(new TaskLink({ id: 'l8', from: backend, to: integration, type: 'finishToStart' }));
  gantt.list.addLink(new TaskLink({ id: 'l9', from: integration, to: launch, type: 'finishToStart' }));

  // Zoom to fit all tasks
  gantt.zoomToFit();
}
</script>

<template>
  <div class="app">
    <h1>TimelineKit - Gantt Chart</h1>
    <div class="toolbar">
      <button @click="ganttRef?.zoomIn()">Zoom In</button>
      <button @click="ganttRef?.zoomOut()">Zoom Out</button>
      <button @click="ganttRef?.zoomToFit()">Zoom to Fit</button>
      <button @click="ganttRef?.undo()">Undo</button>
      <button @click="ganttRef?.redo()">Redo</button>
    </div>
    <div class="gantt-container">
      <GanttChart ref="ganttRef" @ready="handleReady" />
    </div>
  </div>
</template>
