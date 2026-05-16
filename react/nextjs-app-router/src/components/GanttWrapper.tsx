'use client';

import { useRef, useEffect } from 'react';
import { GanttChart, GanttChartRef, setLicense } from '@timelinekit/react';
import '@timelinekit/core/styles';
import styles from './GanttWrapper.module.css';

setLicense(process.env.NEXT_PUBLIC_TK_LICENSE_KEY ?? '');

const data = {
  tasks: [
    { id: '1', name: 'Planning & Discovery', startTime: '2027-01-05', endTime: '2027-01-23', type: 'summary', subtasks: ['2', '3', '4', '5'] },
    { id: '2', name: 'Market Research', startTime: '2027-01-05', endTime: '2027-01-09', type: 'task', progress: 100 },
    { id: '3', name: 'Requirements Analysis', startTime: '2027-01-12', endTime: '2027-01-16', type: 'task', progress: 100 },
    { id: '4', name: 'Technical Spike', startTime: '2027-01-12', endTime: '2027-01-14', type: 'task', progress: 100 },
    { id: '5', name: 'Plan Sign-off', startTime: '2027-01-23', type: 'milestone' },

    { id: '6', name: 'Design', startTime: '2027-01-26', endTime: '2027-02-13', type: 'summary', subtasks: ['7', '8', '9', '10'] },
    { id: '7', name: 'Wireframes & Prototyping', startTime: '2027-01-26', endTime: '2027-01-30', type: 'task', progress: 80 },
    { id: '8', name: 'Visual Design', startTime: '2027-02-02', endTime: '2027-02-06', type: 'task', progress: 60 },
    { id: '9', name: 'Design System Setup', startTime: '2027-02-02', endTime: '2027-02-10', type: 'task', progress: 40 },
    { id: '10', name: 'Design Review', startTime: '2027-02-13', type: 'milestone' },

    { id: '11', name: 'Development', startTime: '2027-02-16', endTime: '2027-04-03', type: 'summary', subtasks: ['12', '13', '14', '15', '16', '17'] },
    { id: '12', name: 'Frontend Implementation', startTime: '2027-02-16', endTime: '2027-03-13', type: 'task', progress: 25 },
    { id: '13', name: 'Backend API', startTime: '2027-02-16', endTime: '2027-03-20', type: 'task', progress: 15 },
    { id: '14', name: 'Database & Migrations', startTime: '2027-02-16', endTime: '2027-02-27', type: 'task' },
    { id: '15', name: 'Auth & Security', startTime: '2027-03-02', endTime: '2027-03-13', type: 'task' },
    { id: '16', name: 'API Integration', startTime: '2027-03-16', endTime: '2027-03-27', type: 'task' },
    { id: '17', name: 'Dev Complete', startTime: '2027-04-03', type: 'milestone' },

    { id: '18', name: 'Testing & Launch', startTime: '2027-04-06', endTime: '2027-04-24', type: 'summary', subtasks: ['19', '20', '21', '22'] },
    { id: '19', name: 'Unit & Integration Tests', startTime: '2027-04-06', endTime: '2027-04-10', type: 'task' },
    { id: '20', name: 'E2E Testing', startTime: '2027-04-13', endTime: '2027-04-17', type: 'task' },
    { id: '21', name: 'Staging Deployment', startTime: '2027-04-20', endTime: '2027-04-22', type: 'task' },
    { id: '22', name: 'Production Launch', startTime: '2027-04-24', type: 'milestone' },
  ],
  links: [
    { id: 'l1', from: '2', to: '3', type: 'finishToStart' },
    { id: 'l2', from: '2', to: '4', type: 'finishToStart' },
    { id: 'l3', from: '3', to: '5', type: 'finishToStart' },
    { id: 'l4', from: '4', to: '5', type: 'finishToStart' },
    { id: 'l5', from: '5', to: '7', type: 'finishToStart' },
    { id: 'l6', from: '7', to: '8', type: 'finishToStart' },
    { id: 'l7', from: '7', to: '9', type: 'finishToStart' },
    { id: 'l8', from: '8', to: '10', type: 'finishToStart' },
    { id: 'l9', from: '9', to: '10', type: 'finishToStart' },
    { id: 'l10', from: '10', to: '12', type: 'finishToStart' },
    { id: 'l11', from: '10', to: '13', type: 'finishToStart' },
    { id: 'l12', from: '10', to: '14', type: 'finishToStart' },
    { id: 'l13', from: '14', to: '15', type: 'finishToStart' },
    { id: 'l14', from: '15', to: '16', type: 'finishToStart' },
    { id: 'l15', from: '12', to: '16', type: 'finishToStart' },
    { id: 'l16', from: '13', to: '16', type: 'finishToStart' },
    { id: 'l17', from: '16', to: '17', type: 'finishToStart' },
    { id: 'l18', from: '17', to: '19', type: 'finishToStart' },
    { id: 'l19', from: '19', to: '20', type: 'finishToStart' },
    { id: 'l20', from: '20', to: '21', type: 'finishToStart' },
    { id: 'l21', from: '21', to: '22', type: 'finishToStart' },
  ],
};

export default function GanttWrapper() {
  const ref = useRef<GanttChartRef>(null);

  useEffect(() => {
    if (!ref.current) return;
    ref.current.load(JSON.stringify(data));
    ref.current.zoomToFit();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>TimelineKit GanttChart - Next.js App Router</h1>
      <div className={styles.toolbar}>
        <button onClick={() => ref.current?.zoomIn()} className={styles.button}>Zoom In</button>
        <button onClick={() => ref.current?.zoomOut()} className={styles.button}>Zoom Out</button>
        <button onClick={() => ref.current?.zoomToFit()} className={styles.button}>Zoom to Fit</button>
        <button onClick={() => ref.current?.undo()} className={styles.button}>Undo</button>
        <button onClick={() => ref.current?.redo()} className={styles.button}>Redo</button>
      </div>
      <div className={styles.ganttContainer}>
        <GanttChart ref={ref} />
      </div>
    </div>
  );
}
