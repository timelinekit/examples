import { useCallback, useRef } from 'react';
import { GanttChart, GanttChartRef } from '@timelinekit/react';
import { setLicense, Task, TaskLink, Resource, WorkingCalendar, WorkingShift, TimeOfDay } from '@timelinekit/core';
import '@timelinekit/core/styles';
import './App.css';

setLicense(import.meta.env.VITE_TK_LICENSE_KEY ?? '');

export function App() {
  const ref = useRef<GanttChartRef>(null);

  const handleReady = useCallback(() => {
    const gantt = ref.current;
    if (!gantt) return;

    // --- Resources ---
    const alice = gantt.resources.addResource(new Resource('r1', 'Alice', 'unique'));
    const bob = gantt.resources.addResource(new Resource('r2', 'Bob', 'unique'));
    const carol = gantt.resources.addResource(new Resource('r3', 'Carol', 'unique'));
    const dave = gantt.resources.addResource(new Resource('r4', 'Dave', 'unique'));

    // --- Working Calendar (9:00-12:00, 13:00-17:00) ---
    const calendar = new WorkingCalendar();
    calendar.shifts = [
      new WorkingShift(new TimeOfDay(9, 0), new TimeOfDay(12, 0)),
      new WorkingShift(new TimeOfDay(13, 0), new TimeOfDay(17, 0)),
    ];
    gantt.workingCalendar = calendar;

    // --- Tasks ---
    const planning = gantt.list.addTask(new Task({ id: '1', name: 'Project Planning', startTime: '2027-02-02', endTime: '2027-02-13', type: 'summary' }));
    const requirements = gantt.list.addTask(new Task({ id: '2', name: 'Requirements Analysis', startTime: '2027-02-02', endTime: '2027-02-06', progress: 100 }));
    const architecture = gantt.list.addTask(new Task({ id: '3', name: 'Architecture Design', startTime: '2027-02-09', endTime: '2027-02-13', progress: 80 }));

    const development = gantt.list.addTask(new Task({ id: '4', name: 'Development', startTime: '2027-02-16', endTime: '2027-03-20', type: 'summary' }));
    const frontend = gantt.list.addTask(new Task({ id: '5', name: 'Frontend Development', startTime: '2027-02-16', endTime: '2027-03-06', progress: 40 }));
    const backend = gantt.list.addTask(new Task({ id: '6', name: 'Backend API', startTime: '2027-02-16', endTime: '2027-03-13' }));
    const database = gantt.list.addTask(new Task({ id: '7', name: 'Database Schema', startTime: '2027-02-16', endTime: '2027-02-27' }));

    const testing = gantt.list.addTask(new Task({ id: '8', name: 'Testing & QA', startTime: '2027-03-16', endTime: '2027-03-27', type: 'summary' }));
    const unitTests = gantt.list.addTask(new Task({ id: '9', name: 'Unit Testing', startTime: '2027-03-16', endTime: '2027-03-20' }));
    const integrationTests = gantt.list.addTask(new Task({ id: '10', name: 'Integration Testing', startTime: '2027-03-23', endTime: '2027-03-27' }));

    const launch = gantt.list.addTask(new Task({ id: '11', name: 'Production Launch', startTime: '2027-03-30', endTime: '2027-03-30', type: 'milestone' }));

    // --- Hierarchy ---
    planning.subtasks = [requirements, architecture];
    development.subtasks = [frontend, backend, database];
    testing.subtasks = [unitTests, integrationTests];

    // --- Assign resources to tasks ---
    // Carol (PM) handles requirements and architecture
    requirements.addResource(null, carol, 100);
    architecture.addResource(null, alice, 100);
    architecture.addResource(null, carol, 50);

    // Alice (Developer) and Bob (Designer) handle development
    frontend.addResource(null, bob, 100);
    backend.addResource(null, alice, 100);
    database.addResource(null, alice, 50);
    database.addResource(null, bob, 50);

    // Dave (QA) handles testing
    unitTests.addResource(null, dave, 100);
    unitTests.addResource(null, alice, 50);
    integrationTests.addResource(null, dave, 100);
    integrationTests.addResource(null, bob, 50);

    // --- Dependencies ---
    gantt.list.addLink(new TaskLink({ id: 'l1', from: requirements, to: architecture, type: 'finishToStart' }));
    gantt.list.addLink(new TaskLink({ id: 'l2', from: architecture, to: frontend, type: 'finishToStart' }));
    gantt.list.addLink(new TaskLink({ id: 'l3', from: architecture, to: backend, type: 'finishToStart' }));
    gantt.list.addLink(new TaskLink({ id: 'l4', from: architecture, to: database, type: 'finishToStart' }));
    gantt.list.addLink(new TaskLink({ id: 'l5', from: database, to: backend, type: 'finishToStart' }));
    gantt.list.addLink(new TaskLink({ id: 'l6', from: frontend, to: unitTests, type: 'finishToStart' }));
    gantt.list.addLink(new TaskLink({ id: 'l7', from: backend, to: unitTests, type: 'finishToStart' }));
    gantt.list.addLink(new TaskLink({ id: 'l8', from: unitTests, to: integrationTests, type: 'finishToStart' }));
    gantt.list.addLink(new TaskLink({ id: 'l9', from: integrationTests, to: launch, type: 'finishToStart' }));

    // --- Critical Path ---
    gantt.showCriticalPath = true;

    // Zoom to fit all tasks
    gantt.zoomToFit();
  }, []);

  return (
    <div className="app">
      <h1>TimelineKit - Gantt Chart Resource Management</h1>
      <div className="toolbar">
        <button onClick={() => ref.current?.zoomIn()}>Zoom In</button>
        <button onClick={() => ref.current?.zoomOut()}>Zoom Out</button>
        <button onClick={() => ref.current?.zoomToFit()}>Zoom to Fit</button>
        <button onClick={() => {
          if (ref.current) {
            ref.current.showCriticalPath = !ref.current.showCriticalPath;
          }
        }}>Toggle Critical Path</button>
        <button onClick={() => ref.current?.undo()}>Undo</button>
        <button onClick={() => ref.current?.redo()}>Redo</button>
      </div>
      <div className="gantt-container">
        <GanttChart ref={ref} onReady={handleReady} />
      </div>
    </div>
  );
}
