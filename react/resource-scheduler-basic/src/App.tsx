import { useCallback, useRef } from 'react';
import { ResourceScheduler, ResourceSchedulerRef, setLicense, SchedulerResource, SchedulerEvent } from '@timelinekit/react';
import '@timelinekit/core/styles';
import './App.css';

setLicense(import.meta.env.VITE_TK_LICENSE_KEY ?? '');

function createResource(id: string, name: string, type: string): SchedulerResource {
  const resource = new SchedulerResource(id, name);
  resource.type = type;
  return resource;
}

export default function App() {
  const ref = useRef<ResourceSchedulerRef>(null);

  const handleReady = useCallback(() => {
    const scheduler = ref.current;
    if (!scheduler) return;

    // Add resources — 5 team members
    scheduler.data.addResource(createResource('r1', 'Alice Chen — Developer', 'person'));
    scheduler.data.addResource(createResource('r2', 'Bob Martinez — Designer', 'person'));
    scheduler.data.addResource(createResource('r3', 'Carol Park — PM', 'person'));
    scheduler.data.addResource(createResource('r4', 'Dave Wilson — QA', 'person'));
    scheduler.data.addResource(createResource('r5', 'Eve Thomas — DevOps', 'person'));

    // Add events — realistic sprint events over 2 weeks (2027-01-05 to 2027-01-16)
    scheduler.data.addEvent(new SchedulerEvent('e1', 'r3', 'Sprint Planning', new Date('2027-01-05'), new Date('2027-01-06')));
    scheduler.data.addEvent(new SchedulerEvent('e2', 'r1', 'Frontend Development', new Date('2027-01-06'), new Date('2027-01-12')));
    scheduler.data.addEvent(new SchedulerEvent('e3', 'r1', 'API Development', new Date('2027-01-12'), new Date('2027-01-16')));
    scheduler.data.addEvent(new SchedulerEvent('e4', 'r2', 'UI/UX Mockups', new Date('2027-01-05'), new Date('2027-01-09')));
    scheduler.data.addEvent(new SchedulerEvent('e5', 'r2', 'Design Review', new Date('2027-01-09'), new Date('2027-01-10')));
    scheduler.data.addEvent(new SchedulerEvent('e6', 'r2', 'Asset Preparation', new Date('2027-01-12'), new Date('2027-01-15')));
    scheduler.data.addEvent(new SchedulerEvent('e7', 'r3', 'Stakeholder Demo', new Date('2027-01-09'), new Date('2027-01-10')));
    scheduler.data.addEvent(new SchedulerEvent('e8', 'r4', 'Test Plan Creation', new Date('2027-01-06'), new Date('2027-01-08')));
    scheduler.data.addEvent(new SchedulerEvent('e9', 'r4', 'QA Testing', new Date('2027-01-12'), new Date('2027-01-16')));
    scheduler.data.addEvent(new SchedulerEvent('e10', 'r5', 'CI/CD Pipeline Setup', new Date('2027-01-05'), new Date('2027-01-08')));
    scheduler.data.addEvent(new SchedulerEvent('e11', 'r5', 'Staging Deployment', new Date('2027-01-13'), new Date('2027-01-15')));

    // Zoom to fit all events
    scheduler.zoomToFit();

    scheduler.events.eventClick$.subscribe((args) => {
      alert(`Clicked: ${args.event.name} (ID: ${args.event.id})`);
    });
  }, []);

  return (
    <div className="app">
      <h1>TimelineKit - Resource Scheduler</h1>
      <div className="toolbar">
        <button onClick={() => ref.current?.zoomIn()}>Zoom In</button>
        <button onClick={() => ref.current?.zoomOut()}>Zoom Out</button>
        <button onClick={() => ref.current?.zoomToFit()}>Zoom to Fit</button>
        <button onClick={() => ref.current?.undo()}>Undo</button>
        <button onClick={() => ref.current?.redo()}>Redo</button>
      </div>
      <div className="scheduler-container">
        <ResourceScheduler ref={ref} onReady={handleReady} />
      </div>
    </div>
  );
}
