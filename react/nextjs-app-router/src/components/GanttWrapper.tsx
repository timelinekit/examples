'use client';

import { useRef, useCallback } from 'react';
import { GanttChart, GanttChartRef } from '@timelinekit/react';
import { setLicense, Task, TaskLink } from '@timelinekit/core';
import '@timelinekit/core/styles';
import styles from './GanttWrapper.module.css';

setLicense(process.env.NEXT_PUBLIC_TK_LICENSE_KEY ?? '');

export default function GanttWrapper() {
  const ref = useRef<GanttChartRef>(null);

  const onReady = useCallback(() => {
    const gantt = ref.current;
    if (!gantt) return;

    // Phase 1: Planning
    const planning = gantt.list.addTask(new Task({ id: '1', name: 'Planning & Discovery', startTime: '2027-01-05', endTime: '2027-01-23', type: 'summary' }));
    const research = gantt.list.addTask(new Task({ id: '2', name: 'Market Research', startTime: '2027-01-05', endTime: '2027-01-09', progress: 100 }));
    const requirements = gantt.list.addTask(new Task({ id: '3', name: 'Requirements Analysis', startTime: '2027-01-12', endTime: '2027-01-16', progress: 100 }));
    const techSpike = gantt.list.addTask(new Task({ id: '4', name: 'Technical Spike', startTime: '2027-01-12', endTime: '2027-01-14', progress: 100 }));
    const planApproval = gantt.list.addTask(new Task({ id: '5', name: 'Plan Sign-off', startTime: '2027-01-23', endTime: '2027-01-23', type: 'milestone' }));

    // Phase 2: Design
    const design = gantt.list.addTask(new Task({ id: '6', name: 'Design', startTime: '2027-01-26', endTime: '2027-02-13', type: 'summary' }));
    const wireframes = gantt.list.addTask(new Task({ id: '7', name: 'Wireframes & Prototyping', startTime: '2027-01-26', endTime: '2027-01-30', progress: 80 }));
    const uiDesign = gantt.list.addTask(new Task({ id: '8', name: 'Visual Design', startTime: '2027-02-02', endTime: '2027-02-06', progress: 60 }));
    const designSystem = gantt.list.addTask(new Task({ id: '9', name: 'Design System Setup', startTime: '2027-02-02', endTime: '2027-02-10', progress: 40 }));
    const designReview = gantt.list.addTask(new Task({ id: '10', name: 'Design Review', startTime: '2027-02-13', endTime: '2027-02-13', type: 'milestone' }));

    // Phase 3: Development
    const development = gantt.list.addTask(new Task({ id: '11', name: 'Development', startTime: '2027-02-16', endTime: '2027-04-03', type: 'summary' }));
    const frontend = gantt.list.addTask(new Task({ id: '12', name: 'Frontend Implementation', startTime: '2027-02-16', endTime: '2027-03-13', progress: 25 }));
    const backend = gantt.list.addTask(new Task({ id: '13', name: 'Backend API', startTime: '2027-02-16', endTime: '2027-03-20', progress: 15 }));
    const database = gantt.list.addTask(new Task({ id: '14', name: 'Database & Migrations', startTime: '2027-02-16', endTime: '2027-02-27' }));
    const auth = gantt.list.addTask(new Task({ id: '15', name: 'Auth & Security', startTime: '2027-03-02', endTime: '2027-03-13' }));
    const integration = gantt.list.addTask(new Task({ id: '16', name: 'API Integration', startTime: '2027-03-16', endTime: '2027-03-27' }));
    const devComplete = gantt.list.addTask(new Task({ id: '17', name: 'Dev Complete', startTime: '2027-04-03', endTime: '2027-04-03', type: 'milestone' }));

    // Phase 4: Testing & Launch
    const testing = gantt.list.addTask(new Task({ id: '18', name: 'Testing & Launch', startTime: '2027-04-06', endTime: '2027-04-24', type: 'summary' }));
    const unitTests = gantt.list.addTask(new Task({ id: '19', name: 'Unit & Integration Tests', startTime: '2027-04-06', endTime: '2027-04-10' }));
    const e2eTests = gantt.list.addTask(new Task({ id: '20', name: 'E2E Testing', startTime: '2027-04-13', endTime: '2027-04-17' }));
    const staging = gantt.list.addTask(new Task({ id: '21', name: 'Staging Deployment', startTime: '2027-04-20', endTime: '2027-04-22' }));
    const launch = gantt.list.addTask(new Task({ id: '22', name: 'Production Launch', startTime: '2027-04-24', endTime: '2027-04-24', type: 'milestone' }));

    // Hierarchy
    planning.subtasks = [research, requirements, techSpike, planApproval];
    design.subtasks = [wireframes, uiDesign, designSystem, designReview];
    development.subtasks = [frontend, backend, database, auth, integration, devComplete];
    testing.subtasks = [unitTests, e2eTests, staging, launch];

    // Dependencies
    gantt.list.addLink(new TaskLink({ id: 'l1', from: research, to: requirements, type: 'finishToStart' }));
    gantt.list.addLink(new TaskLink({ id: 'l2', from: research, to: techSpike, type: 'finishToStart' }));
    gantt.list.addLink(new TaskLink({ id: 'l3', from: requirements, to: planApproval, type: 'finishToStart' }));
    gantt.list.addLink(new TaskLink({ id: 'l4', from: techSpike, to: planApproval, type: 'finishToStart' }));
    gantt.list.addLink(new TaskLink({ id: 'l5', from: planApproval, to: wireframes, type: 'finishToStart' }));
    gantt.list.addLink(new TaskLink({ id: 'l6', from: wireframes, to: uiDesign, type: 'finishToStart' }));
    gantt.list.addLink(new TaskLink({ id: 'l7', from: wireframes, to: designSystem, type: 'finishToStart' }));
    gantt.list.addLink(new TaskLink({ id: 'l8', from: uiDesign, to: designReview, type: 'finishToStart' }));
    gantt.list.addLink(new TaskLink({ id: 'l9', from: designSystem, to: designReview, type: 'finishToStart' }));
    gantt.list.addLink(new TaskLink({ id: 'l10', from: designReview, to: frontend, type: 'finishToStart' }));
    gantt.list.addLink(new TaskLink({ id: 'l11', from: designReview, to: backend, type: 'finishToStart' }));
    gantt.list.addLink(new TaskLink({ id: 'l12', from: designReview, to: database, type: 'finishToStart' }));
    gantt.list.addLink(new TaskLink({ id: 'l13', from: database, to: auth, type: 'finishToStart' }));
    gantt.list.addLink(new TaskLink({ id: 'l14', from: auth, to: integration, type: 'finishToStart' }));
    gantt.list.addLink(new TaskLink({ id: 'l15', from: frontend, to: integration, type: 'finishToStart' }));
    gantt.list.addLink(new TaskLink({ id: 'l16', from: backend, to: integration, type: 'finishToStart' }));
    gantt.list.addLink(new TaskLink({ id: 'l17', from: integration, to: devComplete, type: 'finishToStart' }));
    gantt.list.addLink(new TaskLink({ id: 'l18', from: devComplete, to: unitTests, type: 'finishToStart' }));
    gantt.list.addLink(new TaskLink({ id: 'l19', from: unitTests, to: e2eTests, type: 'finishToStart' }));
    gantt.list.addLink(new TaskLink({ id: 'l20', from: e2eTests, to: staging, type: 'finishToStart' }));
    gantt.list.addLink(new TaskLink({ id: 'l21', from: staging, to: launch, type: 'finishToStart' }));

    gantt.zoomToFit();
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
        <GanttChart ref={ref} onReady={onReady} />
      </div>
    </div>
  );
}
