# Resource Scheduler - Basic Example (Angular)

## What this example demonstrates

This is the Angular equivalent of the React resource-scheduler-basic example. It shows how to use the TimelineKit ResourceScheduler as a standalone Angular component to build a resource-based scheduling view. The example creates 5 team members and 11 sprint events over a 2-week period, demonstrating how to add resources and events via `@ViewChild` in `ngAfterViewInit`.

**Use this example when:** You need a resource-based scheduling view in Angular — e.g., team planning, room booking, or equipment allocation.

## Features

- Resource rows representing team members (Developer, Designer, PM, QA, DevOps)
- Multiple events per resource with drag-and-drop support
- Toolbar with Zoom In, Zoom Out, Zoom to Fit, Undo, and Redo
- Automatic zoom-to-fit on initial load

## Run

```bash
npm install
npm start
```

## Key Concepts

### Adding Resources

Resources are created with an ID and name, then added to the scheduler's data store:

```typescript
const resource = new SchedulerResource('r1', 'Alice Chen');
resource.type = 'person';
scheduler.data.addResource(resource);
```

### Adding Events

Events are created with an ID, resource ID, name, start time, and end time:

```typescript
const event = new SchedulerEvent('e1', 'r1', 'Sprint Planning', new Date('2027-01-05'), new Date('2027-01-06'));
scheduler.data.addEvent(event);
```

Resources must be added before their events. Each event references a resource by its ID.
