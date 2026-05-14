# Gantt Chart - Basic Example

## What this example demonstrates

This is the simplest starting point for using TimelineKit GanttChart in React. It shows how to set up a Gantt chart with the core building blocks: regular tasks, summary tasks (task groups), milestones, task progress tracking, and finish-to-start dependencies between tasks. The example also includes a toolbar demonstrating programmatic control over zoom and undo/redo.

**Use this example when:** You want to understand the basic GanttChart API and see the minimum setup needed to get a working Gantt chart in a React + Vite project.

![Gantt Chart Basic](../../screenshots/react-gantt-basic.png)

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

```tsx
// Create a ref to access the Gantt API
const ref = useRef<GanttChartRef>(null);

// Add tasks programmatically
const task = gantt.list.addTask(new Task({
  id: '1',
  name: 'My Task',
  startTime: '2027-01-05',
  endTime: '2027-01-09',
  progress: 50
}));

// Create dependencies between tasks
gantt.list.addLink(new TaskLink({
  id: 'l1',
  from: taskA,
  to: taskB,
  type: 'finishToStart'
}));

// Use toolbar actions
ref.current?.zoomIn();
ref.current?.undo();
```
