import { AfterViewInit, Component, Input, OnChanges, OnDestroy, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-dough-nut',
  templateUrl: './dough-nut.component.html',
  styleUrls: ['./dough-nut.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DoughNutComponent implements AfterViewInit, OnChanges, OnDestroy {
  public chartInstance: any = null;

  constructor() {}

  @Input() Data: any;
  @Input() Id: string = "";

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['Data'] && !changes['Data'].firstChange) {
      this.updatePieChart();
    }
  }

  ngAfterViewInit(): void {
    this.setupPieChart();
  }

  ngOnDestroy(): void {
    if (this.chartInstance) {
      this.chartInstance.destroy();
    }
  }

  setupPieChart() {
    const ctx = document.getElementById(this.Id.toString()) as HTMLCanvasElement;
    Chart.register(...registerables);
    this.chartInstance = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: this.Data.map((d: { name: any }) => d.name),
        datasets: [
          {
            data: this.Data.map((d: { value: any }) => d.value),
            backgroundColor: this.Data.map((d: { color: any }) => d.color),
          },
        ],
      },
      options: {},
    });
  }

  updatePieChart() {
    if (this.chartInstance) {
      this.chartInstance.data.labels = this.Data.map((d: { name: any }) => d.name);
      this.chartInstance.data.datasets[0].data = this.Data.map((d: { value: any }) => d.value);
      this.chartInstance.data.datasets[0].backgroundColor = this.Data.map((d: { color: any }) => d.color);
      this.chartInstance.update();
    }
  }
}
