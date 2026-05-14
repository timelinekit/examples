# Resource Scheduler - Basic Example

## What this example demonstrates

This example shows how to use the TimelineKit ResourceScheduler component to build a resource-based scheduling view. Unlike the Gantt chart (which focuses on tasks and dependencies), the Resource Scheduler organizes events by resource rows — each row represents a person, room, or piece of equipment. The example creates a realistic 2-week sprint scenario with 5 team members and 11 events (sprint planning, development tasks, design reviews, QA testing, and DevOps activities) to demonstrate how events are distributed across resources on a timeline.

**Use this example when:** You need a scheduling view organized by resources (team members, rooms, vehicles) rather than by task hierarchy — e.g., shift planning, room booking, or team capacity visualization.

## Features

- Resource rows representing team members (Developer, Designer, PM, QA, DevOps)
- Multiple events per resource with drag-and-drop support
- Toolbar with Zoom In, Zoom Out, Zoom to Fit, Undo, and Redo
- Automatic zoom-to-fit on initial load

## Run

```bash
npm install
npm run dev
```

## Key Concepts

### Adding Resources

Resources are created with an ID and name, then added to the scheduler's data store:

```tsx
const resource = new SchedulerResource('r1', 'Alice Chen');
resource.type = 'person';
scheduler.data.addResource(resource);
```

### Adding Events

Events are created with an ID, resource ID, name, start time, and end time:

```tsx
const event = new SchedulerEvent('e1', 'r1', 'Sprint Planning', new Date('2027-01-05'), new Date('2027-01-06'));
scheduler.data.addEvent(event);
```

Resources must be added before their events. Each event references a resource by its ID.
