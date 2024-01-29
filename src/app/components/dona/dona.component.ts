import { Component, Input } from '@angular/core';
import { ChartData, ChartEvent, ChartType } from 'chart.js';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})
export class DonaComponent {

  @Input('tittle') titulo: string = 'sin Titulo';

  // Doughnut
  @Input('labels') doughnutChartLabels: string[] = [
    'label1',
    'label2',
    'label3',
  ];
  @Input('data') data: any = [
    [350, 450, 100]
  ];
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      { data: [350, 450, 100] },
    ],
  };

  ngOnInit() {
    console.log(this.titulo);
    console.log(this.doughnutChartLabels);
    console.log(this.data);
    console.log(this.doughnutChartData);
    this.doughnutChartData.labels = this.doughnutChartLabels;
    this.doughnutChartData.datasets = [{data: this.data[0]}];
    
    
  }

  // public doughnutChartType: ChartType = 'doughnut';

}
