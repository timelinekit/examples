import { useRef, useEffect } from 'react';
import { GanttChart, GanttChartRef, setLicense } from '@timelinekit/react';
import '@timelinekit/core/styles';
import './App.css';

setLicense(import.meta.env.VITE_TK_LICENSE_KEY ?? '');

const data = {
  resources: [
    { id: 'r1', name: 'Alice', type: 'unique' },
    { id: 'r2', name: 'Bob', type: 'unique' },
    { id: 'r3', name: 'Carol', type: 'unique' },
    { id: 'r4', name: 'Dave', type: 'unique' },
  ],
  tasks: [
    { id: '1', name: 'Project Planning', startTime: '2027-02-02', endTime: '2027-02-13', type: 'summary', subtasks: ['2', '3'] },
    { id: '2', name: 'Requirements Analysis', startTime: '2027-02-02', endTime: '2027-02-06', type: 'task', progress: 100,
      resources: [{ id: 'tr1', resourceId: 'r3', capacity: 100 }] },
    { id: '3', name: 'Architecture Design', startTime: '2027-02-09', endTime: '2027-02-13', type: 'task', progress: 80,
      resources: [{ id: 'tr2', resourceId: 'r1', capacity: 100 }, { id: 'tr3', resourceId: 'r3', capacity: 50 }] },

    { id: '4', name: 'Development', startTime: '2027-02-16', endTime: '2027-03-20', type: 'summary', subtasks: ['5', '6', '7'] },
    { id: '5', name: 'Frontend Development', startTime: '2027-02-16', endTime: '2027-03-06', type: 'task', progress: 40,
      resources: [{ id: 'tr4', resourceId: 'r2', capacity: 100 }] },
    { id: '6', name: 'Backend API', startTime: '2027-02-16', endTime: '2027-03-13', type: 'task',
      resources: [{ id: 'tr5', resourceId: 'r1', capacity: 100 }] },
    { id: '7', name: 'Database Schema', startTime: '2027-02-16', endTime: '2027-02-27', type: 'task',
      resources: [{ id: 'tr6', resourceId: 'r1', capacity: 50 }, { id: 'tr7', resourceId: 'r2', capacity: 50 }] },

    { id: '8', name: 'Testing & QA', startTime: '2027-03-16', endTime: '2027-03-27', type: 'summary', subtasks: ['9', '10'] },
    { id: '9', name: 'Unit Testing', startTime: '2027-03-16', endTime: '2027-03-20', type: 'task',
      resources: [{ id: 'tr8', resourceId: 'r4', capacity: 100 }, { id: 'tr9', resourceId: 'r1', capacity: 50 }] },
    { id: '10', name: 'Integration Testing', startTime: '2027-03-23', endTime: '2027-03-27', type: 'task',
      resources: [{ id: 'tr10', resourceId: 'r4', capacity: 100 }, { id: 'tr11', resourceId: 'r2', capacity: 50 }] },

    { id: '11', name: 'Production Launch', startTime: '2027-03-30', type: 'milestone' },
  ],
  links: [
    { id: 'l1', from: '2', to: '3', type: 'finishToStart' },
    { id: 'l2', from: '3', to: '5', type: 'finishToStart' },
    { id: 'l3', from: '3', to: '6', type: 'finishToStart' },
    { id: 'l4', from: '3', to: '7', type: 'finishToStart' },
    { id: 'l5', from: '7', to: '6', type: 'finishToStart' },
    { id: 'l6', from: '5', to: '9', type: 'finishToStart' },
    { id: 'l7', from: '6', to: '9', type: 'finishToStart' },
    { id: 'l8', from: '9', to: '10', type: 'finishToStart' },
    { id: 'l9', from: '10', to: '11', type: 'finishToStart' },
  ],
};

export default function App() {
  const ref = useRef<GanttChartRef>(null);

  useEffect(() => {
    if (!ref.current) return;
    ref.current.load(JSON.stringify(data));
    ref.current.showCriticalPath = true;
    ref.current.zoomToFit();
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
        <GanttChart ref={ref} />
      </div>
    </div>
  );
}
