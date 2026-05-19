import { Component, viewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { GanttChart, setLicense } from '@timelinekit/angular';
import { Subscription } from 'rxjs';

setLicense('');

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [GanttChart],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit, OnDestroy {

  gantt = viewChild.required(GanttChart);
  clickedTask = '';
  private sub?: Subscription;

  ngAfterViewInit() {
    const gantt = this.gantt();
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
    testing.color = 2;
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

    this.sub = gantt.events.taskClick$.subscribe((args) => {
      this.clickedTask = `Clicked: ${args.task.name} (ID: ${args.task.id})`;
    });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  zoomIn() {
    this.gantt().zoomIn();
  }

  zoomOut() {
    this.gantt().zoomOut();
  }

  zoomToFit() {
    this.gantt().zoomToFit();
  }

  undo() {
    this.gantt().undo();
  }

  redo() {
    this.gantt().redo();
  }
}
