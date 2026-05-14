# Gantt Chart - Resource Management

## What this example demonstrates

This example extends the basic Gantt chart with resource management capabilities. It shows how to create named resources (team members), assign them to tasks with configurable allocation percentages, set up a custom working calendar with defined work shifts (9:00-12:00, 13:00-17:00 with a lunch break), and visualize the critical path through the project. This is the example to study when building a project management tool where you need to track who works on what and identify schedule bottlenecks.

**Use this example when:** You need resource assignment, custom working hours, or critical path analysis in your Gantt chart.

## Features

- **Resource Assignment** - Create resources (people, equipment) and assign them to tasks with configurable capacity percentages (50%, 100%)
- **Working Calendar** - Configure custom working hours (9:00-17:00 with lunch break) that affect scheduling calculations
- **Critical Path** - Visualize the critical path through the project to identify schedule-driving tasks
- **Task Dependencies** - Define finish-to-start relationships between tasks
- **Undo / Redo** - Full undo/redo support for all changes

## Run

```bash
npm install
npm run dev
```

## Key Concepts

### Resources

Resources are created via `gantt.resources.addResource()` and assigned to individual tasks using `task.addResource(id, resource, capacity)`. The capacity parameter represents allocation percentage (100 = full-time).

### Working Calendar

The `WorkingCalendar` class defines working days and shifts. Custom shifts are set using `WorkingShift` and `TimeOfDay` to control when work can be scheduled.

### Critical Path

Enable critical path highlighting with `gantt.showCriticalPath = true`. The critical path identifies the longest sequence of dependent tasks that determines the project's minimum duration.
