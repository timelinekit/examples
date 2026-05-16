# Gantt Chart - Basic Example (Angular)

## What this example demonstrates

This is the Angular equivalent of the React gantt-basic example. It shows how to use the TimelineKit GanttChart as a standalone Angular component — importing it directly in the component's `imports` array, accessing the instance via `@ViewChild`, and populating data in `ngAfterViewInit`. The data set includes summary tasks, regular tasks, milestones, and finish-to-start dependencies, covering the same core features as the React version.

**Use this example when:** You want the simplest starting point for using TimelineKit GanttChart in an Angular project with standalone components.

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

```typescript
// Load data as JSON in ngAfterViewInit
const data = {
  tasks: [
    { id: '1', name: 'My Task', startTime: '2027-01-05', endTime: '2027-01-09', type: 'task', progress: 50 },
    { id: '2', name: 'Milestone', startTime: '2027-01-09', type: 'milestone' },
  ],
  links: [
    { id: 'l1', from: '1', to: '2', type: 'finishToStart' },
  ],
};

ngAfterViewInit() {
  this.gantt.load(JSON.stringify(data));
  this.gantt.zoomToFit();
}
```

GanttChart is a standalone Angular component -- import it directly in the component's `imports` array:

```typescript
@Component({
  standalone: true,
  imports: [GanttChart],
  // ...
})
export class AppComponent { }
```
