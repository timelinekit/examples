# TimelineKit Examples

A collection of ready-to-run examples demonstrating [TimelineKit](https://timelinekit.com) components.

## Components

TimelineKit provides three main components:

- **GanttChart** - Project scheduling with tasks, dependencies, milestones, and resource management
- **ResourceScheduler** - Resource-based scheduling with time-blocked events
- **EventCalendar** - Calendar views (day/week/month) with recurrence support

## Examples

### React

| Example | Description |
|---------|-------------|
| [gantt-basic](./react/gantt-basic) | Basic Gantt chart with tasks, links, and milestones |
| [gantt-resource-management](./react/gantt-resource-management) | Gantt chart with resource assignment and working calendar |
| [resource-scheduler-basic](./react/resource-scheduler-basic) | Basic resource scheduler with drag & drop |
| [event-calendar-basic](./react/event-calendar-basic) | Event calendar with day/week/month views |
| [nextjs-app-router](./react/nextjs-app-router) | Integration with Next.js App Router |

### Angular

| Example | Description |
|---------|-------------|
| [gantt-basic](./angular/gantt-basic) | Basic Gantt chart with tasks, links, and milestones |
| [resource-scheduler-basic](./angular/resource-scheduler-basic) | Basic resource scheduler with drag & drop |
| [event-calendar-basic](./angular/event-calendar-basic) | Event calendar with day/week/month views |

## Getting Started

Each example is a standalone project. To run any example:

```bash
cd react/gantt-basic   # or any other example
npm install
npm run dev
```

## Requirements

- Node.js 18+
- npm 9+

## License Key

All examples work out of the box without a license key. Without a key, TimelineKit runs in evaluation mode — fully functional, with a watermark displayed over the component.

To remove the watermark, get a license key at [timelinekit.com](https://timelinekit.com) and set it as an environment variable:

```bash
# Vite-based examples (react/gantt-basic, react/resource-scheduler-basic, etc.)
echo "VITE_TK_LICENSE_KEY=your-key-here" > .env

# Next.js example (react/nextjs-app-router)
echo "NEXT_PUBLIC_TK_LICENSE_KEY=your-key-here" > .env.local
```

## Links

- [Documentation](https://timelinekit.com/docs)
- **Live Demos**
  - [GanttChart Demo](https://timelinekit.com/gantt-chart/demo)
  - [ResourceScheduler Demo](https://timelinekit.com/resource-scheduler/demo)
- **API Reference**
  - [GanttChart API](https://timelinekit.com/docs/gantt-chart/api-reference)
  - [ResourceScheduler API](https://timelinekit.com/docs/resource-scheduler/api-reference)
