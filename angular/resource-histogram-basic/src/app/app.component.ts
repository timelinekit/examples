import { Component, viewChild, AfterViewInit } from '@angular/core';
import { ResourceHistogram, setLicense } from '@timelinekit/angular';
import { HistogramResource, HistogramAllocation, DateRange } from '@timelinekit/core';

setLicense('');

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ResourceHistogram],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {

  histogram = viewChild.required(ResourceHistogram);

  ngAfterViewInit() {
    const histogram = this.histogram();

    // Add resources — 5 team members with default 100% capacity
    const r1 = new HistogramResource('r1', 'Alice Chen');
    const r2 = new HistogramResource('r2', 'Bob Martinez');
    const r3 = new HistogramResource('r3', 'Carol Park');
    const r4 = new HistogramResource('r4', 'Dave Wilson');
    r4.maxCapacity = 50; // Part-time — 50% capacity
    const r5 = new HistogramResource('r5', 'Eve Thomas');

    histogram.data.assignResources([r1, r2, r3, r4, r5]);

    // Add allocations — overlapping work to show over-allocation
    histogram.data.assignAllocations([
      new HistogramAllocation('a1', 'r1', 'Backend API', new Date('2027-01-05'), new Date('2027-01-15'), 100),
      new HistogramAllocation('a2', 'r1', 'Code Review', new Date('2027-01-10'), new Date('2027-01-17'), 50),
      new HistogramAllocation('a3', 'r1', 'Mentoring', new Date('2027-01-08'), new Date('2027-01-12'), 30),
      new HistogramAllocation('a4', 'r2', 'UI Design', new Date('2027-01-06'), new Date('2027-01-11'), 80),
      new HistogramAllocation('a5', 'r2', 'Frontend Dev', new Date('2027-01-09'), new Date('2027-01-19'), 100),
      new HistogramAllocation('a6', 'r2', 'Client Meeting', new Date('2027-01-13'), new Date('2027-01-15'), 40),
      new HistogramAllocation('a7', 'r3', 'Database Schema', new Date('2027-01-05'), new Date('2027-01-10'), 100),
      new HistogramAllocation('a8', 'r3', 'Testing', new Date('2027-01-08'), new Date('2027-01-14'), 60),
      new HistogramAllocation('a9', 'r3', 'Documentation', new Date('2027-01-13'), new Date('2027-01-19'), 50),
      new HistogramAllocation('a10', 'r4', 'UX Research', new Date('2027-01-07'), new Date('2027-01-13'), 50),
      new HistogramAllocation('a11', 'r4', 'Usability Testing', new Date('2027-01-11'), new Date('2027-01-17'), 30),
      new HistogramAllocation('a12', 'r5', 'Infrastructure', new Date('2027-01-05'), new Date('2027-01-12'), 100),
      new HistogramAllocation('a13', 'r5', 'Security Audit', new Date('2027-01-10'), new Date('2027-01-16'), 80),
      new HistogramAllocation('a14', 'r5', 'Deployment', new Date('2027-01-15'), new Date('2027-01-19'), 60),
    ]);

    histogram.projectTimeline = new DateRange(new Date('2027-01-04'), new Date('2027-01-20'));
    histogram.markers = [
      { date: new Date('2027-01-15'), label: 'Sprint Review', color: '#e74c3c', lineStyle: 'dashed' as const },
    ];
    histogram.zoomToFit();

    histogram.events.barClick$.subscribe((args) => {
      alert(`Clicked: ${args.resource.name} (${args.utilization}% utilization)`);
    });
  }

  zoomIn() {
    this.histogram().zoomIn();
  }

  zoomOut() {
    this.histogram().zoomOut();
  }

  zoomToFit() {
    this.histogram().zoomToFit();
  }
}
