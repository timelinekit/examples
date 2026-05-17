import { Component, viewChild, AfterViewInit } from '@angular/core';
import { GanttChart, setLicense } from '@timelinekit/angular';

setLicense('');

const data = {
  tasks: [
    { id: '1', name: 'Project Planning', startTime: '2027-01-05', endTime: '2027-01-16', type: 'summary', subtasks: ['2', '3'] },
    { id: '2', name: 'Research & Discovery', startTime: '2027-01-05', endTime: '2027-01-09', type: 'task', progress: 100, parent: '1' },
    { id: '3', name: 'Requirements Gathering', startTime: '2027-01-12', endTime: '2027-01-16', type: 'task', progress: 75, parent: '1' },

    { id: '4', name: 'Design Phase', startTime: '2027-01-19', endTime: '2027-02-06', type: 'summary', subtasks: ['5', '6', '7'] },
    { id: '5', name: 'Wireframes', startTime: '2027-01-19', endTime: '2027-01-23', type: 'task', progress: 50, parent: '4' },
    { id: '6', name: 'UI Design', startTime: '2027-01-26', endTime: '2027-02-03', type: 'task', parent: '4' },
    { id: '7', name: 'Design Approval', startTime: '2027-02-06', endTime: '2027-02-06', type: 'milestone', parent: '4' },

    { id: '8', name: 'Development', startTime: '2027-02-09', endTime: '2027-03-20', type: 'summary', subtasks: ['9', '10', '11'] },
    { id: '9', name: 'Frontend Development', startTime: '2027-02-09', endTime: '2027-03-06', type: 'task', parent: '8' },
    { id: '10', name: 'Backend Development', startTime: '2027-02-09', endTime: '2027-03-13', type: 'task', parent: '8' },
    { id: '11', name: 'Integration & Testing', startTime: '2027-03-16', endTime: '2027-03-20', type: 'task', parent: '8' },

    { id: '12', name: 'Launch', startTime: '2027-03-23', type: 'milestone' },
  ],
  links: [
    { id: 'l1', from: '2', to: '3', type: 'finishToStart' },
    { id: 'l2', from: '3', to: '5', type: 'finishToStart' },
    { id: 'l3', from: '5', to: '6', type: 'finishToStart' },
    { id: 'l4', from: '6', to: '7', type: 'finishToStart' },
    { id: 'l5', from: '7', to: '9', type: 'finishToStart' },
    { id: 'l6', from: '7', to: '10', type: 'finishToStart' },
    { id: 'l7', from: '9', to: '11', type: 'finishToStart' },
    { id: 'l8', from: '10', to: '11', type: 'finishToStart' },
    { id: 'l9', from: '11', to: '12', type: 'finishToStart' },
  ],
};

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [GanttChart],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {

  gantt = viewChild.required(GanttChart);

  ngAfterViewInit() {
    const gantt = this.gantt();
    gantt.load(JSON.stringify(data));
    gantt.zoomToFit();
  }

  onZoomIn() {
    this.gantt().zoomIn();
  }

  onZoomOut() {
    this.gantt().zoomOut();
  }

  onZoomToFit() {
    this.gantt().zoomToFit();
  }

  onUndo() {
    this.gantt().undo();
  }

  onRedo() {
    this.gantt().redo();
  }
}
