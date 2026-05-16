import { useCallback, useRef } from 'react';
import { GanttChart, GanttChartRef, setLicense } from '@timelinekit/react';
import '@timelinekit/core/styles';
import './App.css';

setLicense(import.meta.env.VITE_TK_LICENSE_KEY ?? '');

export function App() {
  const ref = useRef<GanttChartRef>(null);

  const handleReady = useCallback(() => {
    const gantt = ref.current;
    if (!gantt) return;

    const list = gantt.list;
    list.clear();

    // Planning
    const planning = list.createTask('1');
    planning.name = 'Planning';
    planning.startTime = new Date('2027-01-05');
    planning.endTime = new Date('2027-01-09');
    planning.progress = 100;
    list.addTask(planning);

    // Development (summary with subtasks)
    const dev = list.createTask('2');
    dev.name = 'Development';
    dev.type = 'summary';
    list.addTask(dev);

    const frontend = list.createTask('3');
    frontend.name = 'Frontend';
    frontend.startTime = new Date('2027-01-12');
    frontend.endTime = new Date('2027-01-23');
    list.addTask(frontend);
    dev.addSubtask(frontend);

    const backend = list.createTask('4');
    backend.name = 'Backend';
    backend.startTime = new Date('2027-01-12');
    backend.endTime = new Date('2027-01-30');
    list.addTask(backend);
    dev.addSubtask(backend);

    // Code Review (milestone)
    const review = list.createTask('5');
    review.name = 'Code Review';
    review.type = 'milestone';
    review.startTime = new Date('2027-01-30');
    list.addTask(review);

    // Testing
    const testing = list.createTask('6');
    testing.name = 'Testing';
    testing.startTime = new Date('2027-02-02');
    testing.endTime = new Date('2027-02-13');
    list.addTask(testing);

    // Launch (milestone)
    const launch = list.createTask('7');
    launch.name = 'Launch';
    launch.type = 'milestone';
    launch.startTime = new Date('2027-02-16');
    list.addTask(launch);

    // Dependencies
    list.addLink(planning, frontend, 'finishToStart');
    list.addLink(planning, backend, 'finishToStart');
    list.addLink(frontend, review, 'finishToStart');
    list.addLink(backend, review, 'finishToStart');
    list.addLink(review, testing, 'finishToStart');
    list.addLink(testing, launch, 'finishToStart');

    gantt.zoomToFit();
  }, []);

  return (
    <div className="app">
      <h1>TimelineKit - Gantt Chart (Programmatic)</h1>
      <div className="toolbar">
        <button onClick={() => ref.current?.zoomIn()}>Zoom In</button>
        <button onClick={() => ref.current?.zoomOut()}>Zoom Out</button>
        <button onClick={() => ref.current?.zoomToFit()}>Zoom to Fit</button>
        <button onClick={() => ref.current?.undo()}>Undo</button>
        <button onClick={() => ref.current?.redo()}>Redo</button>
      </div>
      <div className="gantt-container">
        <GanttChart ref={ref} onReady={handleReady} />
      </div>
    </div>
  );
}
